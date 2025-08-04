import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import nodemailer from 'nodemailer';
import { EmailType, NotificationRequestedEvent } from 'libs-common';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const templates = {
  [EmailType.APPLICATION_SUBMITTED]: (params: any) =>
    `Dear user, your application has been submitted.`,
  [EmailType.APPLICATION_APPROVED]: (params: any) =>
    `Good news! Your application was approved.`,
  [EmailType.INVOICE_CREATED]: (params: any) =>
    `A new invoice has been generated for you.`,
  [EmailType.PAYMENT_SUCCEEDED]: (params: any) =>
    `Your payment was received. Thank you!`,
};

@Processor('notifications')
export class NotificationProcessor {
  @Process()
  async handleNotification(job: Job<NotificationRequestedEvent>) {
    const { userId, type, params } = job.data;
    const transporter = nodemailer.createTransport({
      url: process.env.SMTP_URL || 'smtp://maildev:1025',
    });
    const mailOptions = {
      from: 'noreply@autofundplus.com',
      to: params.email || 'test@user.local',
      subject: `AutoFund+ Notification`,
      text: templates[type] ? templates[type](params) : 'Notification',
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      logger.info(`Email sent to ${mailOptions.to}: ${info.messageId}`);
    } catch (err) {
      logger.error(`Failed to send email: ${err.message}`);
    }
  }
}