import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class Auth0Service {
  private auth0Token: string = null;
  private tokenExpiryTime: number = null;

  private async fetchToken(): Promise<void> {
    const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_MGMT_API_AUDIENCE,
      grant_type: 'client_credentials'
    });

    const currentTime = Math.floor(Date.now() / 1000);
    this.auth0Token = response.data.access_token;
    this.tokenExpiryTime = currentTime + response.data.expires_in;
  }

  public async getToken(): Promise<string> {
    const currentTime = Math.floor(Date.now() / 1000);

    if (!this.auth0Token || !this.tokenExpiryTime || currentTime >= this.tokenExpiryTime) {
      await this.fetchToken();
    }

    return this.auth0Token;
  }
}
