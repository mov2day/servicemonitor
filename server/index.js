import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// In-memory store for notification cooldowns
const notificationStore = new Map();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Service health check endpoint
app.post('/api/check-service', async (req, res) => {
  const { service } = req.body;
  const startTime = Date.now();

  try {
    const response = await axios.get(service.endpoint, {
      timeout: service.timeout || 5000
    });

    const latency = Date.now() - startTime;
    const isHealthy = response.status === (service.expectedStatus || 200);

    const healthStatus = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      latency,
      lastChecked: new Date(),
      error: isHealthy ? undefined : `Unexpected status: ${response.status}`
    };

    if (!isHealthy) {
      await sendNotification(service, healthStatus.error);
    }

    res.json(healthStatus);
  } catch (error) {
    const latency = Date.now() - startTime;
    const errorMessage = error.response 
      ? `HTTP ${error.response.status}: ${error.response.statusText}`
      : error.message;

    const healthStatus = {
      status: 'unhealthy',
      latency,
      lastChecked: new Date(),
      error: errorMessage
    };

    await sendNotification(service, errorMessage);
    res.json(healthStatus);
  }
});

async function sendNotification(service, error) {
  const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
  if (!webhookUrl) return;

  const now = Date.now();
  const lastNotified = notificationStore.get(service.id) || 0;
  const cooldownPeriod = 30 * 60 * 1000; // 30 minutes

  if (now - lastNotified < cooldownPeriod) {
    return;
  }

  const payload = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "FF0000",
    "summary": `Service Alert: ${service.name} is down`,
    "sections": [{
      "activityTitle": "🚨 Service Alert: Downtime Detected",
      "activitySubtitle": new Date().toLocaleString(),
      "facts": [
        {
          "name": "Service",
          "value": service.name
        },
        {
          "name": "Category",
          "value": service.category || 'Uncategorized'
        },
        {
          "name": "Error",
          "value": error
        },
        {
          "name": "Endpoint",
          "value": service.endpoint
        }
      ],
      "markdown": true
    }]
  };

  try {
    await axios.post(webhookUrl, payload);
    notificationStore.set(service.id, now);
  } catch (error) {
    console.error('Failed to send Teams notification:', error.message);
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});