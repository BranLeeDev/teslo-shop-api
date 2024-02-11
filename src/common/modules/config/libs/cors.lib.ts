import { UnauthorizedException } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const whiteList: string[] = [
  'https://teslo-shop-api-ixjb.onrender.com',
  'http://localhost:3000',
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new UnauthorizedException('Not allowed by CORS'));
    }
  },
};
