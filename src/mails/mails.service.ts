import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PdfService } from './generatePdf.service';

@Injectable()
export class MailsServices {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailsServices.name);
  pdfService: any;

  constructor(
    private configService: ConfigService,
    private generatepdf: PdfService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }
  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('es-ES', options);
  }

  async sendMail(to: string, subject: string, text: string, html?: string, attachments?: { filename: string; content: Buffer; }[]) {
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
      attachments, // Aquí agregamos los archivos adjuntos
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent: ' + info.response);
    } catch (error) {
      this.logger.error('Error sending email: ' + error.message);
      throw new Error('Error sending email');
    }
  }

  async registerUserMail(
    userEmail: string,
    username: string,
    password: string,
  ) {
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
  async registerAgencyMail(
    userEmail: string,
    username: string,
    password: string,
  ) {
    const subject = 'Bienvenido a 5tart Travel';
    const textBody = `Hola ${username},
    
    ¡Bienvenido/a a 5tart Travel!
  
    Nos alegra mucho que te hayas unido a la página de viajes más grande del país. En 5tart Travel, puedes cargar tus paquetes de viaje y crear información sobre tu agencia. Ahora puedes explorar todas las herramientas que ofrecemos para que puedas ofrecer tus mejores servicios de viaje a nuestros usuarios.
  
    Tus credenciales son:
    Usuario: ${userEmail}
    Contraseña: ${password}
  
    Por favor ten en cuenta que no podrás completar tu registro hasta que recibas la confirmación de que tu agencia ha sido aceptada en nuestra plataforma.
  
    Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
  
    Saludos cordiales,
    El equipo de 5tart Travel`;

    const htmlBody = `
      <div style="border: 2px solid #003366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto; width: 100%;">
          <p><strong>¡Hola, ${username}!</strong></p>
          <p><strong>¡Bienvenido/a a 5tart Travel!</strong></p>
          <p>Nos alegra mucho que te hayas unido a la página de viajes más grande del país. En 5tart Travel, puedes cargar tus paquetes de viaje y la información sobre tu agencia. Ahora puedes explorar todas las herramientas que ofrecemos para que puedas promocionar tus servicios de viaje a nuestros usuarios.</p>
          <p>Tus credenciales son:</p>
          <div style="border: 2px solid #003366; padding: 10px; border-radius: 10px; margin-bottom: 10px; background: white; text-align: center; display: inline-block; width: auto; max-width: 90%;">
              <p style="margin: 0;"><strong>Usuario:</strong> ${userEmail}</p>
              <p style="margin: 0;"><strong>Contraseña:</strong> ${password}</p>
          </div>
          <p>Por favor ten en cuenta que no podrás completar tu registro hasta que recibas la confirmación de que tu agencia ha sido aceptada en nuestra plataforma.</p>
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
      </style>
    `;

    this.logger.log(
      `Enviando correo a ${userEmail} con asunto "${subject}" y texto "${textBody}"`,
    );
    await this.sendMail(userEmail, subject, textBody, htmlBody);
  }
  async agencyAcceptedMail(userEmail: string, username: string) {
    const subject = 'Tu agencia ha sido aceptada en 5tart Travel';
    const textBody = `Hola ${username},
    
    ¡Felicidades!
  
    Nos complace informarte que tu agencia ha sido aceptada en 5tart Travel. Ahora puedes ingresar a nuestra plataforma y comenzar a ampliar la información de tu agencia y publicar tus paquetes turísticos para que nuestros usuarios puedan descubrir tus servicios.
  
    Si tienes alguna pregunta o necesitas ayuda para comenzar, no dudes en contactarnos.
  
    ¡Bienvenido/a y mucho éxito en 5tart Travel!
  
    Saludos cordiales,
    El equipo de 5tart Travel`;

    const htmlBody = `
      <div style="border: 2px solid #003366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto; width: 100%;">
          <p><strong>¡Hola, ${username}!</strong></p>
          <p><strong>¡Felicidades!</strong></p>
          <p>Nos complace informarte que tu agencia ha sido aceptada en 5tart Travel. Ahora puedes ingresar a nuestra plataforma y comenzar a ampliar la información de tu agencia y publicar tus paquetes turísticos para que nuestros usuarios puedan descubrir tus servicios.</p>
          <p>Si tienes alguna pregunta o necesitas ayuda para comenzar, no dudes en contactarnos.</p>
          <p>¡Bienvenido/a y mucho éxito en 5tart Travel!</p>
          <p>Saludos cordiales,</p>
          <p>El equipo de 5tart Travel</p>
          <div style="margin-top: 20px;">
            <a href="https://5tart-travel-frontend.vercel.app/AUTH/login" style="display: inline-block; padding: 10px 20px; background: linear-gradient(to bottom, #003366, #ffffff); color: white; text-decoration: none; border-radius: 5px; box-shadow: 0 5px 15px rgba(0, 51, 102, 0.3); transition: all 0.3s ease;">
              Iniciar Sesión
            </a>
          </div>
      </div>
      <style>
          @media only screen and (max-width: 600px) {
              div[style*="border: 2px solid #003366; padding: 20px;"] {
                  padding: 10px;
              }
          }
      </style>
    `;

    this.logger.log(
      `Enviando correo a ${userEmail} con asunto "${subject}" y texto "${textBody}"`,
    );
    await this.sendMail(userEmail, subject, textBody, htmlBody);
  }
  async cambioPasswordMail(userEmail: string, username: string) {
    const subject = 'Solicitud de Cambio de Contraseña - 5tart Travel';
    const textBody = `Hola ${username},
  
    Hemos recibido una solicitud para cambiar la contraseña de tu cuenta en 5tart Travel. Si no solicitaste este cambio, por favor ignora este correo.
  
    Para cambiar tu contraseña, sigue el enlace a continuación:
  
    [ENLACE PARA CAMBIAR CONTRASEÑA]
  
    Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
  
    Saludos cordiales,
    El equipo de 5tart Travel`;

    const htmlBody = `
    <div style="border: 2px solid #003366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto; width: 100%;">
      <p><strong>¡Hola, ${username}!</strong></p>
      <p>Hemos recibido una solicitud para cambiar la contraseña de tu cuenta en 5tart Travel. Si no solicitaste este cambio, por favor ignora este correo.</p>
      <p>Para cambiar tu contraseña, sigue el enlace a continuación:</p>
      <p>
        <a href="https://5tart-travel-frontend.vercel.app/AUTH/new_password" style="display: inline-block; padding: 10px 20px; background: linear-gradient(to bottom, #003366, #ffffff); color: white; text-decoration: none; border-radius: 5px; box-shadow: 0 5px 15px rgba(0, 51, 102, 0.3); transition: all 0.3s ease;">
          Cambiar Contraseña
        </a>
      </p>
      <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
      <p>¡Saludos!</p>
      <p>El Equipo de 5tart Travel</p>
    </div>
    <style>
      @media only screen and (max-width: 600px) {
          div[style*="border: 2px solid #003366; padding: 20px;"] {
              padding: 10px;
          }
      }
    </style>`;

    this.logger.log(
      `Enviando correo a ${userEmail} con asunto "${subject}" y texto "${textBody}"`,
    );
    await this.sendMail(userEmail, subject, textBody, htmlBody);
  }

  async ConfirmCambiodePassword(
    userEmail: string,
    username: string,
    newPassword: string,
  ) {
    const subject = 'Confirmación de Cambio de Contraseña - 5tart Travel';
    const textBody = `Hola ${username},
  
    Hemos confirmado el cambio de la contraseña de tu cuenta en 5tart Travel. Tu nueva contraseña es: ${newPassword}
    
    Para iniciar sesión con tu nueva contraseña, sigue el enlace a continuación:
    
    [ENLACE PARA INICIAR SESIÓN]
  
    Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
    
    Saludos cordiales,
    El equipo de 5tart Travel`;

    const htmlBody = `
    <div style="border: 2px solid #003366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto;">
      <p>¡Hola, <strong>${username}</strong>!</p>
      <p>Hemos confirmado el cambio de la contraseña de tu cuenta en 5tart Travel. Tu nueva contraseña es: <strong>${newPassword}</strong></p>
      <p>Para iniciar sesión con tu nueva contraseña, sigue el enlace a continuación:</p>
      <p>
        <a href="https://5tart-travel-frontend.vercel.app/AUTH/login" style="display: inline-block; padding: 10px 20px; background: linear-gradient(to bottom, #003366, #ffffff); color: white; text-decoration: none; border-radius: 5px; box-shadow: 0 5px 15px rgba(0, 51, 102, 0.3); transition: all 0.3s ease;">
          Iniciar Sesión
        </a>
      </p>
      <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
      <p>¡Saludos!</p>
      <p>El Equipo de 5tart Travel</p>
    </div>
    <style>
      @media only screen and (max-width: 600px) {
          div[style*="border: 2px solid #003366; padding: 20px;"] {
              padding: 10px;
          }
      }
    </style>`;

    this.logger.log(
      `Enviando correo a ${userEmail} con asunto "${subject}" y texto "${textBody}"`,
    );
    await this.sendMail(userEmail, subject, textBody, htmlBody);
  }
  async sendThankYouMail(userEmail: string, username: string) {
    const subject = 'Gracias por contactarnos - 5tart Travel';
    const textBody = `Hola ${username},
    
      ¡Gracias por contactarnos!
    
      Hemos recibido tu mensaje y nuestro equipo de 5tart Travel se estará comunicando contigo en breve para asistirte en tu consulta.
    
      Si tienes alguna pregunta adicional mientras tanto, no dudes en responder a este correo.
    
      Saludos cordiales,
      El equipo de 5tart Travel`;

    const htmlBody = `
      <div style="border: 2px solid #003366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto; width: 100%;">
        <p><strong>¡Hola, ${username}!</strong></p>
        <p>¡Gracias por contactarnos!</p>
        <p>Hemos recibido tu mensaje y nuestro equipo de 5tart Travel se estará comunicando contigo en breve para asistirte en tu consulta.</p>
        <p>Si tienes alguna pregunta adicional mientras tanto, no dudes en responder a este correo.</p>
        <p>¡Saludos!</p>
        <p>El Equipo de 5tart Travel</p>
      </div>
      <style>
        @media only screen and (max-width: 600px) {
          div[style*="border: 2px solid #003366; padding: 20px;"] {
            padding: 10px;
          }
        }
      </style>`;

    this.logger.log(
      `Enviando correo a ${userEmail} con asunto "${subject}" y texto "${textBody}"`,
    );
    await this.sendMail(userEmail, subject, textBody, htmlBody);
  }
  async sendConfirmCompra(
    userEmail: string,
    username: string,
    agencyName: string,
    tourName: string,
    totalPrice: number,
    fecha_egreso: Date,
    fecha_ingreso: Date,
    hotel: string,
    destino: string,
    salida: string,
    address: string,
    empresa: string,
    transportType: string,
    addressAgency: string,
    agencymail: string,
    description: string,
  ) {
    const subject = 'Confirmación de Compra - 5tart Travel';
    const textBody = `Hola ${username},
  
    ¡Gracias por tu compra con 5tart Travel!
  
    Adjunto a este correo encontrarás las facturas correspondientes a tu compra:
  
    - Factura del Paquete
    - Factura del Vuelo
    - Factura del Hotel
  
    Si tienes alguna pregunta adicional, no dudes en responder a este correo.
  
    Saludos cordiales,
    El equipo de 5tart Travel`;

    const htmlBody = `
      <div style="border: 2px solid #005BBB; padding: 20px; background: #f5f5f5; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto; width: 100%; color: black;">
        <p style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">¡Hola, ${username}!</p>
        <p style="font-size: 18px;">¡Gracias por tu compra con 5tart Travel!</p>
        <p style="font-size: 18px; margin-top: 20px;">Adjunto a este correo encontrarás las facturas correspondientes a tu compra:</p>
        <ul style="text-align: center; margin: 20px auto; padding: 0; list-style-type: none;">
          <li><strong>Voucher del Paquete</strong></li>
          <li><strong>Voucher de Vuelo y hotel</strong></li>
        </ul>
        <p style="margin-top: 20px;">Si tienes alguna pregunta adicional, no dudes en responder a este correo.</p>
        <p style="margin-top: 20px;">¡Saludos!</p>
        <p>El Equipo de 5tart Travel</p>
      </div>
    `;

    const ticketPDF = await this.generatepdf.generatePackagePDF(
      {
        'Tipo de Voucher': 'Paquete de Tour',
        'Comprador': {
          'Nombre del Usuario': username,
          'Nombre de la Agencia': agencyName,
          'Dirección de la Agencia': addressAgency,
          'Email Agencia': agencymail,
        },
        'Detalles del Tour': {
          'Nombre del Tour': tourName,
          'Descripción del Tour': description,
          'Total Paquete': `$${totalPrice.toFixed(2)}`,
        }
      }
    );


    const combinedPDF = await this.generatepdf.generateCombinedPDF(
      {
        'Tipo de Voucher': 'Voucher Aéreo',
        'Origen': {
          'Salida': salida,
          'Fecha de Ingreso': this.formatDate(fecha_ingreso),
          'Tipo de Transporte': transportType,
          'Nombre de la Empresa': empresa,
        },
        'Destino': {
          'Llegada': destino,
          'Fecha de Egreso': this.formatDate(fecha_egreso),
          'Tipo de Transporte': transportType,
          'Nombre de la Empresa': empresa,
        },
      },
      {
        'Hotel': hotel,
        'Dirección': address,
      }
    );


    const attachments = [
      { filename: 'Voucher_Paquete.pdf', content: ticketPDF },
      { filename: 'Voucher_VueloyHotel.pdf', content: combinedPDF },

    ];

    this.logger.log(`Enviando correo a ${userEmail} con asunto "${subject}" y texto "${textBody}"`);

    await this.sendMail(userEmail, subject, textBody, htmlBody, attachments);
  }
  async sendDeleteTourMail(agencyEmail: string, tourName: string, agencyName: string) {
    const subject = 'Notificación de Eliminación de Tour - 5tart Travel';
    const textBody = `Estimado equipo de ${agencyName},
    
      Nos dirigimos a ustedes para informarles que, lamentablemente, hemos tenido que eliminar el tour titulado "${tourName}" debido a que incumplía con nuestros términos y condiciones.
  
      Esta decisión se ha tomado siguiendo nuestras políticas de empresa, las cuales requieren el cumplimiento de ciertos estándares para asegurar la calidad y la satisfacción de nuestros clientes. Lamentamos cualquier inconveniente que esto pueda causar y agradecemos su comprensión en esta materia.
  
      Si tienen alguna pregunta o necesitan más información, no duden en ponerse en contacto con nosotros. Estamos aquí para ayudarles.
  
      Atentamente,
      El equipo de 5tart Travel`;
  
    const htmlBody = `
      <div style="border: 2px solid #003366; padding: 20px; background: white; border-radius: 15px; text-align: center; max-width: 600px; margin: 0 auto; width: 100%;">
        <p><strong>Estimado equipo de ${agencyName},</strong></p>
        <p>Nos dirigimos a ustedes para informarles que, lamentablemente, hemos tenido que eliminar el tour titulado "<strong>${tourName}</strong>" debido a que incumplía con nuestros términos y condiciones.</p>
        <p>Esta decisión se ha tomado siguiendo nuestras políticas de empresa, las cuales requieren el cumplimiento de ciertos estándares para asegurar la calidad y la satisfacción de nuestros clientes. Lamentamos cualquier inconveniente que esto pueda causar y agradecemos su comprensión en esta materia.</p>
        <p>Si tienen alguna pregunta o necesitan más información, no duden en ponerse en contacto con nosotros. Estamos aquí para ayudarles.</p>
        <p>Atentamente,</p>
        <p>El equipo de 5tart Travel</p>
      </div>
      <style>
        @media only screen and (max-width: 600px) {
          div[style*="border: 2px solid #003366; padding: 20px;"] {
            padding: 10px;
          }
        }
      </style>`;
  
    this.logger.log(
      `Enviando correo a ${agencyEmail} con asunto "${subject}" y texto "${textBody}"`,
    );
    await this.sendMail(agencyEmail, subject, textBody, htmlBody);
  }
  

}
