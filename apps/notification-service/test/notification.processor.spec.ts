import { NotificationProcessor } from '../src/notification.processor';
import nodemailer from 'nodemailer';
import { EmailType } from 'libs-common';

jest.mock('nodemailer');

describe('NotificationProcessor', () => {
  it('should send an email', async () => {
    const sendMail = jest.fn().mockResolvedValue({ messageId: '123' });
    (nodemailer.createTransport as any) = jest.fn().mockReturnValue({ sendMail });

    const processor = new NotificationProcessor();
    await processor.handleNotification({
      data: { userId: 'u1', type: EmailType.PAYMENT_SUCCEEDED, params: { email: 'foo@bar.com' } }
    } as any);

    expect(sendMail).toHaveBeenCalled();
    expect(sendMail.mock.calls[0][0].to).toBe('foo@bar.com');
  });
});