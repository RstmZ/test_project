import { config } from 'dotenv';

config();

const MAX_REQUESTS: number = parseInt(String(process.env.MAX_REQUESTS), 10);
const INTERVAL: number = parseFloat(String(process.env.INTERVAL));

export class RateLimit {
  count: number;
  constructor() {
    this.count = 0;
  }

  async check() {
    if (this.count >= MAX_REQUESTS) {
      return false;
    }
    this.count++;
    return true;
  }

  async startTime() {
    setTimeout(() => {
      this.count = 0;
    }, INTERVAL * 1000);
  }
}
