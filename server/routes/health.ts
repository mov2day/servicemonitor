import { Router } from 'express';
import { checkServiceHealth } from '../services/healthCheck';
import { notificationService } from '../services/notifications';
import type { Service } from '../types';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

router.post('/check-service', async (req, res) => {
  const service = req.body.service as Service;
  
  try {
    const healthStatus = await checkServiceHealth(service);
    
    if (healthStatus.status === 'unhealthy' && healthStatus.error) {
      await notificationService.sendNotification(service, healthStatus.error);
    }

    res.json(healthStatus);
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: 'Internal server error',
      lastChecked: new Date(),
      latency: 0
    });
  }
});

export const healthRoutes = router;