import { defineConfig, devices } from '@playwright/test';

// Toggle slowMo for local debug use
const useSlowMo = false; // <- Set to true when debugging

export default defineConfig({
  retries: 1,
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1280, height: 720 },
        launchOptions: {
          slowMo: useSlowMo ? 500 : 0,
        },
        trace: 'off', // Enable Playwright tracing (network + console logs)
        video: 'off', // Enable video recording
        screenshot: 'on', // Capture screenshots on every failed test run
      },
    },
  ],
});