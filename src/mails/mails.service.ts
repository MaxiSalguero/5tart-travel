import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from 'nodemailer';

@Injectable()
export class mailsServices {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(mailsServices.name);
  
    constructor(private configService: ConfigService,){
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.configService.get<string>('EMAIL_USER'),
          pass: this.configService.get<string>('EMAIL_PASS'),
        },
      });
    }
  
  
    async sendMail(to: string, subject: string, text: string, html?: string) {
      if (!to) {
        this.logger.error('No recipients defined');
        throw new Error('No recipients defined');
      }
  
      const mailOptions = {
        from: this.configService.get<string>('EMAIL_USER'),
        to,
        subject,
        text,
        html,
      };
  
      try {
        const info = await this.transporter.sendMail(mailOptions);
        this.logger.log('Email sent: ' + info.response);
      } catch (error) {
        this.logger.error('Error sending email: ' + error.message);
        throw new Error('Error sending email');
      }
    }
 }