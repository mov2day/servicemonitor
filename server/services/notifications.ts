import axios from 'axios';
import type { Service, TeamsNotification } from '../types';
import { config } from '../config';

class NotificationService {
  private cooldowns = new Map<string, number>();

  private createTeamsPayload(notification: TeamsNotification) {
    return {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      "themeColor": "FF0000",
      "summary": `Service Alert: ${notification.service.name} is down`,
      "sections": [{
        "activityTitle": "🚨 Service Alert: Downtime Detected",
        "activitySubtitle": notification.timestamp.toLocaleString(),
        "facts": [
          {
            "name": "Service",
            "value": notification.service.name
          },
          {
            "name": "Category",
            "value": notification.service.category || 'Uncategorized'
          },
          {
            "name": "Error",
            "value": notification.error
          },
          {
            "name": "Endpoint",
            "value": notification.service.endpoint
          }
        ],
        "markdown": true
      }]
    };
  }

  private isInCooldown(serviceId: string): boolean {
    const lastNotified = this.cooldowns.get(serviceId);
    if (!lastNotified) return false;
    
    return Date.now() - lastNotified < config.notificationCooldown;
  }

  async sendNotification(service: Service, error: string): Promise<void> {
    if (!config.teamsWebhookUrl || this.isInCooldown(service.id)) {
      return;
    }

    const notification: TeamsNotification = {
      service,
      error,
      timestamp: new Date()
    };

    try {
      await axios.post(
        config.teamsWebhookUrl,
        this.createTeamsPayload(notification)
      );
      this.cooldowns.set(service.id, Date.now());
    } catch (error) {
      console.error('Failed to send Teams notification:', 
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
}

export const notificationService = new NotificationService();