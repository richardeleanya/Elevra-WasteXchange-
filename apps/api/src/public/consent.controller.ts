import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('public/consent')
export class ConsentController {
  @Get('openbanking')
  redirect(@Query('redirect_uri') redirect_uri: string, @Res() res: Response) {
    // Simulate redirect to TrueLayer sandbox
    res.redirect('https://console.truelayer.com/sandbox/authorize?redirect_uri=' + encodeURIComponent(redirect_uri));
  }
}