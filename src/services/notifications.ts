import { config, type Service, type NotificationPlatform } from '../config/services';

interface NotificationState {
  lastNotified: Map<string, number>;
}

const state: NotificationState = {
  lastNotified: new Map(),
};

interface NotificationPayload {
  teams: any;
  slack: any;
}

function createNotificationPayload(service: Service, error: string): NotificationPayload {
  const timestamp = new Date().toLocaleString();
  
  return {
    teams: {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      "themeColor": "FF0000",
      "summary": `Service Alert: ${service.name} is down`,
      "sections": [{
        "activityTitle": "🚨 Service Alert: Downtime Detected",
        "activitySubtitle": timestamp,
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
    },
    slack: {
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "🚨 Service Alert: Downtime Detected",
            "emoji": true
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": `*Service:*\n${service.name}`
            },
            {
              "type": "mrkdwn",
              "text": `*Category:*\n${service.category || 'Uncategorized'}`
            }
          ]
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": `*Error:*\n${error}`
            },
            {
              "type": "mrkdwn",
              "text": `*Endpoint:*\n${service.endpoint}`
            }
          ]
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `Detected at: ${timestamp}`
            }
          ]
        }
      ]
    }
  };
}

export async function sendNotification(service: Service, error: string) {
  if (!config.notifications.enabled || !config.notifications.webhookUrl) {
    return;
  }

  const now = Date.now();
  const lastNotified = state.lastNotified.get(service.id) || 0;

  // Check if we're still in cooldown period
  if (now - lastNotified < config.notifications.cooldown) {
    return;
  }

  const payload = createNotificationPayload(service, error);
  const platform = config.notifications.platform;
  
  try {
    const response = await fetch(config.notifications.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload[platform])
    });

    if (response.ok) {
      state.lastNotified.set(service.id, now);
    } else {
      console.error(`Failed to send ${platform} notification:`, await response.text());
      // Schedule retry
      setTimeout(() => sendNotification(service, error), 
        config.notifications.retryInterval);
    }
  } catch (error) {
    console.error(`Error sending ${platform} notification:`, error);
    // Schedule retry
    setTimeout(() => sendNotification(service, error.message), 
      config.notifications.retryInterval);
  }
}