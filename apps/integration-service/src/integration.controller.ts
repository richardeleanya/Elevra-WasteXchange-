import { Controller, Post, Body } from '@nestjs/common';
import { HMRCConnector } from './providers/hmrc.connector';
import { DWPConnector } from './providers/dwp.connector';
import { OpenBankingConnector } from './providers/openbanking.connector';
import { ExperianConnector } from './providers/experian.connector';
import { IntegrationProviderType } from 'libs-common';

@Controller('integration')
export class IntegrationController {
  constructor(
    private hmrc: HMRCConnector,
    private dwp: DWPConnector,
    private openBanking: OpenBankingConnector,
    private experian: ExperianConnector,
  ) {}

  @Post('hmrc/income')
  async hmrcIncome(@Body() dto: { nino: string }) {
    return this.hmrc.getIncomeHistory(dto.nino);
  }

  @Post('dwp/status')
  async dwpStatus(@Body() dto: { nino: string }) {
    return this.dwp.getUniversalCreditStatus(dto.nino);
  }

  @Post('openbanking/income')
  async openBankingIncome(@Body() dto: { userId: string }) {
    return this.openBanking.getIncomeVerification(dto.userId);
  }

  @Post('experian/credit')
  async experianCredit(@Body() dto: { userId: string }) {
    return this.experian.getCreditCheck(dto.userId);
  }
}