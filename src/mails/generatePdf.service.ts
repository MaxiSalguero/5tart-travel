import { Injectable } from '@nestjs/common';
import * as bwipjs from 'bwip-js';
import * as PDFDocument from 'pdfkit';
import * as qrcode from 'qrcode';
import { createCanvas, Image } from 'canvas';
import { promisify } from 'util';
import axios from 'axios';


@Injectable()
export class PdfService {
  private async generateBarcode(text: string): Promise<Buffer> {
    const barcodeBuffer = await promisify(bwipjs.toBuffer)({
      bcid: 'code39',
      text,
      scale: 4,
      height: 15,
      includetext: true,
      textxalign: 'center'
    }) as Buffer;


    const canvas = createCanvas(300, 80);
    const ctx = canvas.getContext('2d');
    const image = new Image();

    return new Promise((resolve, reject) => {
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
        resolve(canvas.toBuffer());
      };
      image.onerror = reject;
      image.src = barcodeBuffer as unknown as string;
    });
  }

  private generateRandomBarcodeNumber(): string {
    return Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
  }

  private addSectionTitle(doc: PDFDocument, title: string) {
    doc.fontSize(16).font('Helvetica-Bold').fillColor('#000000').text(title, {
      underline: true,
    });
    doc.moveDown(0.5);
  }

  private addSeparator(doc: PDFDocument) {
    const y = doc.y;
    doc.moveTo(doc.options.margins.left, y + 5)
      .lineTo(doc.page.width - doc.options.margins.right, y + 5)
      .stroke();
    doc.moveDown(1);
  }
  private async generatePDF(data: any, title: string, sectionTitle: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      doc.fontSize(20).font('Helvetica-Bold').fillColor('#005BBB').text(title, {
        align: 'center',
        width: doc.page.width - 2 * doc.options.margins.left,
      });
      doc.moveDown(2);

      this.addSectionTitle(doc, sectionTitle);

      for (const [key, value] of Object.entries(data)) {
        doc.moveDown().fontSize(14).font('Helvetica').text(`${key}: ${value}`);
      }

      doc.end();
    });
  }

  async generatePackagePDF(data: any): Promise<Buffer> {
    const qrUrl = 'https://5tart-travel-frontend.vercel.app/';
    const barcodeText = this.generateRandomBarcodeNumber();

    return new Promise(async (resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      try {
        const cloudinaryImageUrl = 'https://res.cloudinary.com/dia2gautk/image/upload/v1723700618/ha0lhgo1vosy47euo3bo.jpg';
        const response = await axios.get(cloudinaryImageUrl, { responseType: 'arraybuffer' });
        const cloudinaryImageBuffer = Buffer.from(response.data);

        const imageWidth = 100;
        const imageHeight = 100;
        const topMarginAdjustment = -30;
        const leftMarginAdjustment = 20;
        const rightMarginAdjustment = 20;

        doc.image(cloudinaryImageBuffer, doc.options.margins.left + leftMarginAdjustment, doc.options.margins.top + topMarginAdjustment, { width: imageWidth, height: imageHeight });
        doc.image(cloudinaryImageBuffer, doc.page.width - imageWidth - doc.options.margins.right - rightMarginAdjustment, doc.options.margins.top + topMarginAdjustment, { width: imageWidth, height: imageHeight });
      } catch (err) {
        return reject(new Error(`Failed to load Cloudinary image: ${err.message}`));
      }

      doc.fontSize(20).font('Helvetica-Bold').fillColor('#005BBB').text('Voucher de Paquete', {
        align: 'center',
        width: doc.page.width - 2 * doc.options.margins.left,
      });
      doc.moveDown(2);

      const lineY = doc.y + 10;
      doc.moveTo(doc.options.margins.left, lineY).lineTo(doc.page.width - doc.options.margins.right, lineY).stroke();

      doc.moveDown(2);

      doc.fontSize(16).font('Helvetica-Bold').fillColor('#000000').text('Detalles del Paquete', {
        underline: true,
      });


      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'object') {
          doc.moveDown().fontSize(14).font('Helvetica-Bold').text(key, { underline: true });
          for (const [subKey, subValue] of Object.entries(value)) {
            doc.moveDown().fontSize(14).font('Helvetica').text(`${subKey}: ${subValue}`);
          }
        } else {
          doc.moveDown().fontSize(14).font('Helvetica').text(`${key}: ${value}`);
        }
      }

      doc.moveDown(10).moveTo(doc.options.margins.left, doc.y).lineTo(doc.page.width - doc.options.margins.right, doc.y).stroke();


      doc.moveDown(-5).fontSize(12).font('Helvetica').text(
        'La cancelación se debe hacer 2 días antes de la fecha de ingreso; de lo contrario, se aplicará una multa.',
        {
          width: doc.page.width - 2 * doc.options.margins.left,
          align: 'center'
        }
      );

      try {
        const barcodeBuffer = await this.generateBarcode(barcodeText);
        const barcodeHeight = 50;
        const barcodeY = doc.page.height - 100;

        doc.image(barcodeBuffer, doc.options.margins.left, barcodeY, { width: 200, height: barcodeHeight });

        qrcode.toBuffer(qrUrl, { errorCorrectionLevel: 'H', type: 'png' }, (err, qrBuffer) => {
          if (err) return reject(err);
          const qrX = doc.page.width - 150 - 30;
          const qrY = barcodeY - 30;
          doc.image(qrBuffer, qrX, qrY, { width: 100, height: 100 });
          doc.end();
        });
      } catch (err) {
        return reject(err);
      }
    });
  }
  async generateCombinedPDF(flightData: any, hotelData: any): Promise<Buffer> {
    const qrUrl = 'https://5tart-travel-frontend.vercel.app/';
    const barcodeText = this.generateRandomBarcodeNumber();
  
    return new Promise(async (resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 30, bottom: 50, left: 30, right: 30 },
      });
      const buffers: Buffer[] = [];
  
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);
  
      try {
        const cloudinaryImageUrl = 'https://res.cloudinary.com/dia2gautk/image/upload/v1723700618/ha0lhgo1vosy47euo3bo.jpg';
        const response = await axios.get(cloudinaryImageUrl, { responseType: 'arraybuffer' });
        const cloudinaryImageBuffer = Buffer.from(response.data);
  
        const imageWidth = 80;
        const imageHeight = 80;
        const topMarginAdjustment = -20;
        const leftMarginAdjustment = 10;
  
        doc.image(cloudinaryImageBuffer, doc.options.margins.left + leftMarginAdjustment, doc.options.margins.top + topMarginAdjustment, { width: imageWidth, height: imageHeight });
  
        const rightMarginAdjustment = 10;
        doc.image(cloudinaryImageBuffer, doc.page.width - imageWidth - doc.options.margins.right - rightMarginAdjustment, doc.options.margins.top + topMarginAdjustment, { width: imageWidth, height: imageHeight });
      } catch (err) {
        return reject(new Error(`Failed to load Cloudinary image: ${err.message}`));
      }
  
      const origen = flightData['Origen'] || {};
      const transportType = origen['Tipo de Transporte']?.trim() || 'unknown'; // Acceso desde Origen
  
      console.log(`Tipo de Transporte: '${transportType}'`); // Imprime el valor para depuración
  
      const isPlane = transportType.toLowerCase() === 'plane';
      const voucherTitle = isPlane ? 'Voucher de Vuelo' : 'Voucher de Bus';
      const detailTitle = isPlane ? 'Detalle del Vuelo' : 'Detalle del Bus';
  
      doc.fontSize(20).font('Helvetica-Bold').fillColor('#005BBB').text(voucherTitle, {
        align: 'center',
        width: doc.page.width - 2 * doc.options.margins.left,
      });
      doc.moveDown(1);
      doc.fontSize(18).font('Helvetica-Bold').fillColor('#005BBB').text(detailTitle, {
        align: 'center',
        width: doc.page.width - 2 * doc.options.margins.left,
      });
      doc.moveDown(1);
  
      if (!origen.Salida || !origen['Fecha de Ingreso'] || !origen['Tipo de Transporte'] || !origen['Nombre de la Empresa']) {
        return reject(new Error(`Missing required data for Origen section. Data received: ${JSON.stringify(origen)}`));
      }
  
      if (!flightData['Destino']?.Llegada || !flightData['Destino']?.['Fecha de Egreso']) {
        return reject(new Error(`Missing required data for Destino section. Data received: ${JSON.stringify(flightData['Destino'])}`));
      }
  
      this.addSectionTitle(doc, 'Origen');
      this.addSeparator(doc);
  
      for (const [key, value] of Object.entries(origen)) {
        doc.moveDown().fontSize(12).font('Helvetica').text(`${key}: ${value}`);
      }
  
      doc.moveDown(1);
      this.addSectionTitle(doc, 'Destino');
      this.addSeparator(doc);
  
      for (const [key, value] of Object.entries(flightData['Destino'])) {
        doc.moveDown().fontSize(12).font('Helvetica').text(`${key}: ${value}`);
      }
  
      doc.moveDown(2);
      doc.moveTo(doc.options.margins.left, doc.y);
      doc.lineTo(doc.page.width - doc.options.margins.right, doc.y);
      doc.strokeColor('#000000').stroke();
      doc.moveDown(2);
  
      doc.fontSize(18).font('Helvetica-Bold').fillColor('#005BBB').text('Detalle del Hotel', {
        align: 'center',
        width: doc.page.width - 2 * doc.options.margins.left,
      });
      doc.moveDown(1);
  
      doc.fontSize(14).font('Helvetica-Bold').fillColor('#000000').text('Información del Hotel', {
        underline: true,
      });
  
      if (hotelData['Hotel']) {
        doc.moveDown().fontSize(12).font('Helvetica').text(`Hotel: ${hotelData['Hotel']}`);
      }
  
      if (hotelData['Dirección']) {
        doc.moveDown().fontSize(12).font('Helvetica').text(`Dirección: ${hotelData['Dirección']}`);
      }
  
      try {
        const barcodeBuffer = await this.generateBarcode(barcodeText);
        const barcodeHeight = 50;
        const barcodeY = doc.page.height - barcodeHeight - doc.options.margins.bottom;
  
        doc.image(barcodeBuffer, doc.options.margins.left, barcodeY, { width: 200, height: barcodeHeight });
  
        qrcode.toBuffer(qrUrl, { errorCorrectionLevel: 'H', type: 'png' }, (err, qrBuffer) => {
          if (err) return reject(err);
          const qrX = doc.page.width - 110 - doc.options.margins.right;
          const qrY = barcodeY - 10;
          doc.image(qrBuffer, qrX, qrY, { width: 100, height: 100 });
          doc.end();
        });
      } catch (err) {
        return reject(err);
      }
    });
  }
  
  
  







}
