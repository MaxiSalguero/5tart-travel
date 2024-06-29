import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from 'nodemailer';



@Injectable()
export class mailsServices {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(mailsServices.name);

  
    constructor(private configService: ConfigService,
    ){
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
    async registerUserMail(userEmail: string, username: string, password: string) {
      const subject = 'Bienvenido a 5tart Travel';
      const textBody = `Hola ${username},
      
      ¡Bienvenido/a a 5tart Travel!
  
      Nos alegra mucho que te hayas unido a la página de viajes más grande del país. En 5tart Travel, trabajamos para que puedas ubicar los viajes a distintos puntos del país con las mejores agencias de viajes. Ahora puedes explorar y planificar tus próximos viajes con nosotros.
  
      Tus credenciales son:
      Usuario: ${userEmail}
      Contraseña: ${password}
  
      Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
  
      Saludos cordiales,
      El equipo de 5tart Travel`;
  
      const htmlBody = `
      <div style="border: 2px solid #003366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto; width: 100%;">
    <p><strong>¡Hola, ${username}!</strong></p>
    <p><strong>¡Bienvenido/a a 5tart Travel!</strong></p>
    <p>Nos alegra mucho que te hayas unido a la página de viajes más grande del país. En 5tart Travel, trabajamos para que puedas ubicar los viajes a distintos puntos del país y del mundo con las mejores agencias de viajes. Ahora puedes explorar y planificar tus próximos viajes con nosotros.</p>
    <p>Tus credenciales son:</p>
    <div style="border: 2px solid #003366; padding: 10px; border-radius: 10px; margin-bottom: 10px; background: white; text-align: center; display: inline-block; width: auto; max-width: 90%;">
        <p style="margin: 0;"><strong>Usuario:</strong> ${userEmail}</p>
        <p style="margin: 0;"><strong>Contraseña:</strong> ${password}</p>
    </div>
    <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
    <p>¡Saludos!</p>
    <p>El Equipo de 5tart Travel</p>
</div>
<style>
    @media only screen and (max-width: 600px) {
        div[style*="border: 2px solid #003366; padding: 20px;"] {
            padding: 10px;
        }
        div[style*="border: 2px solid #003366; padding: 10px;"] {
            padding: 5px;
        }
    }
</style>`;
      this.logger.log(
        `Enviando correo a ${userEmail} con asunto "${subject}" y texto "${textBody}"`,
      );
      await this.sendMail(userEmail, subject, textBody, htmlBody);
  }
  async registerAgencyMail(userEmail: string, username: string, password: string) {
    const subject = 'Bienvenido a 5tart Travel';
    const textBody = `Hola ${username},
    
    ¡Bienvenido/a a 5tart Travel!

    Nos alegra mucho que te hayas unido a la página de viajes más grande del país. En 5tart Travel, puedes cargar tus paquetes de viaje y crear información sobre tu agencia. Ahora puedes explorar todas las herramientas que ofrecemos para que puedas ofrecer tus mejores servicios de viaje a nuestros usuarios.

    Tus credenciales son:
    Usuario: ${userEmail}
    Contraseña: ${password}

    Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.

    Saludos cordiales,
    El equipo de 5tart Travel`;

    const htmlBody = `
    <div style="border: 2px solid #003366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto; width: 100%;">
    <div class="animated-border" style="display: flex; align-items: center; justify-content: center;">
        <img src="../helpers/logo.jpeg" alt="Logo" style="height: 70px; border: 2px solid #003366; border-radius: 10%; margin-top: 40px;margin-right: 100px; animation: borderAnimation 3s infinite;">
        <p style="margin-top: 0;"><strong>¡Hola, ${username}!</strong></p>
        <img src="../helpers/logo.jpeg" alt="Logo" style="height: 70px; border: 2px solid #003366; border-radius: 10%; margin-top: 40px;margin-left: 100px; animation: borderAnimation 3s infinite;">
    </div>
    <p style="margin-top:0;"><strong>¡Bienvenido/a a 5tart Travel!</strong></p>
    <p>Nos alegra mucho que te hayas unido a la página de viajes más grande del país. En 5tart Travel, puedes cargar tus paquetes de viaje y la información sobre tu agencia. Ahora puedes explorar todas las herramientas que ofrecemos para que puedas promocionar tus servicios de viaje a nuestros usuarios.</p>
    <p>Tus credenciales son:</p>
    <div class="animated-border" style="border: 2px solid #003366; padding: 10px; border-radius: 10px; margin-bottom: 10px; background: white; text-align: center; display: inline-block; width: auto; max-width: 90%; animation: borderAnimation 3s infinite;">
        <p style="margin: 0;"><strong>Usuario:</strong> ${userEmail}</p>
        <p style="margin: 0;"><strong>Contraseña:</strong> ${password}</p>
    </div>
    <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
    <p>¡Saludos!</p>
    <p>El Equipo de 5tart Travel</p>
</div>

<style>
    @keyframes borderAnimation {
        0% {
            border-color: #003366;
        }
        25% {
            border-color: #0055b3;
        }
        50% {
            border-color: #0077ff;
        }
        75% {
            border-color: #3399ff;
        }
        100% {
            border-color: #003366;
        }
    }

    .animated-border {
        animation: borderAnimation 3s infinite;
    }

    @media only screen and (max-width: 600px) {
        div[style*="border: 2px solid #003366; padding: 20px;"] {
            padding: 10px;
        }
        div[style*="border: 2px solid #003366; padding: 10px;"] {
            padding: 5px;
        }
        img {
            height: 30px;
            margin-right: 5px;
            margin-left: 5px;
        }
    }
</style>
`;
    
    this.logger.log(
      `Enviando correo a ${userEmail} con asunto "${subject}" y texto "${textBody}"`,
    );
    await this.sendMail(userEmail, subject, textBody, htmlBody);
}
 
 }