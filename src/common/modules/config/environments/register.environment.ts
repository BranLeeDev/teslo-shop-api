import { registerAs } from '@nestjs/config';
import { ENV } from './variables.environment';

export default registerAs('registers', () => {
  if (ENV === 'production') {
    return {
      db: {
        postgres: {
          url: process.env.DATABASE_URL as string,
        },
      },
      redis: {
        host: process.env.REDIS_HOST as string,
        port: Number(process.env.REDIS_PORT) as number,
        password: process.env.REDIS_PASSWORD as string,
      },
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
        apiKey: process.env.CLOUDINARY_API_KEY as string,
        apiSecret: process.env.CLOUDINARY_API_SECRET as string,
      },
    };
  }

  return {
    db: {
      postgres: {
        user: process.env.POSTGRES_USER as string,
        password: process.env.POSTGRES_PASSWORD as string,
        host: process.env.POSTGRES_HOST as string,
        port: process.env.POSTGRES_PORT as string,
        name: process.env.POSTGRES_DB as string,
      },
    },
    redis: {
      host: process.env.REDIS_HOST as string,
      port: Number(process.env.REDIS_PORT) as number,
      password: process.env.REDIS_PASSWORD as string,
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
      apiKey: process.env.CLOUDINARY_API_KEY as string,
      apiSecret: process.env.CLOUDINARY_API_SECRET as string,
    },
  };
});
