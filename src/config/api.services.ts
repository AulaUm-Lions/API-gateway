export const services = {
    auth: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
    email: process.env.EMAIL_SERVICE_URL || "http://localhost:3002",
  };
  