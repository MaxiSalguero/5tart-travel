import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleService {
  constructor(private configService: ConfigService) {}

  getGoogleAuthURL(): string {
    const clientID = this.configService.get<string>('AUTH0_CLIENT_ID');
    const domain = this.configService.get<string>('AUTH0_DOMAIN');
    const redirectURI = `${this.configService.get<string>('AUTH0_BASE_URL')}/google/callback`;

    return `https://${domain}/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&scope=openid profile email&connection=google-oauth2`;
  }

  async handleGoogleCallback(code: string): Promise<any> {
    const domain = this.configService.get<string>('AUTH0_DOMAIN');
    const clientID = this.configService.get<string>('AUTH0_CLIENT_ID');
    const clientSecret = this.configService.get<string>('AUTH0_CLIENT_SECRET');
    const redirectURI = `${this.configService.get<string>('AUTH0_BASE_URL')}/google/callback`;

    const response = await fetch(`https://${domain}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: clientID,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectURI,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    const tokens = await response.json();
    return tokens;
  }
}
