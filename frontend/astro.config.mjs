import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  // Integrate React for interactive dashboard components
  integrations: [react()],
});
