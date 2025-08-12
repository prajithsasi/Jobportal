import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://24d28aa4445886cd183e60b00f7484e9@o4509828845142016.ingest.us.sentry.io/4509828858511360",
  integrations: [
    Sentry.mongooseIntegration()
  ],
  sendDefaultPii: true,
});

export default Sentry;
