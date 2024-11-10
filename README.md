# Service Monitor Dashboard

A modern, real-time dashboard for monitoring service health status across your infrastructure. Built with React, TypeScript, and Tailwind CSS.

![Service Monitor Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80)

## Features

- 🔄 Real-time health status monitoring
- 📊 Latency metrics and performance tracking
- 🎯 Service categorization and organization
- 🚨 Error handling and status reporting
- ⚡ Auto-refresh every 30 seconds
- 📱 Responsive design for all devices
- 🎨 Clean, modern UI with Tailwind CSS
- 🔧 Easily extensible through configuration

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration

Services are configured in `src/config/services.ts`. Add new services by extending the services array:

```typescript
export const services: Service[] = [
  {
    id: 'my-service',
    name: 'My Service',
    description: 'Description of my service',
    endpoint: 'https://my-service.com/health',
    category: 'Category',
    timeout: 5000, // Optional: timeout in ms (default: 5000)
    expectedStatus: 200 // Optional: expected HTTP status (default: 200)
  }
];
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ServiceCard.tsx  # Individual service status card
│   └── ServiceGrid.tsx  # Grid layout for services
├── config/
│   └── services.ts     # Service configuration
├── hooks/
│   └── useServiceHealth.ts  # Health checking logic
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide React Icons
- Vite

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)