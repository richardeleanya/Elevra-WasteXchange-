import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { extractFeatures } from 'libs/common/ml/features';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { IntegrationProviderType, IntegrationRequestEvent } from 'libs-common';

@Injectable()
export class EligibilityService implements OnModuleInit {
  private rules: any[] = [];
  private mlModel: any = null; // stub for TensorFlow.js

  constructor(
    @InjectQueue('integrations') private readonly integrationsQueue: Queue
  ) {}

  async onModuleInit() {
    const rulesDir = path.join(__dirname, '../../rules');
    const files = await fs.readdir(rulesDir);
    const ruleObjects: any[] = [];
    for (const file of files) {
      if (file.endsWith('.yaml')) {
        const content = await fs.readFile(path.join(rulesDir, file), 'utf8');
        ruleObjects.push(yaml.load(content));
      }
    }
    this.rules = ruleObjects;
    // Placeholder for ML model load
    try {
      this.mlModel = null;
    } catch (e) {
      this.mlModel = null;
    }
  }

  evaluate(payload: any) {
    // Publish integration requests for demo
    if (payload.userId && payload.nino) {
      const reqs: IntegrationRequestEvent[] = [
        {
          userId: payload.userId,
          provider: IntegrationProviderType.HMRC,
          payload: { nino: payload.nino },
          requestId: `req-hmrc-${payload.userId}`,
        },
        {
          userId: payload.userId,
          provider: IntegrationProviderType.DWP,
          payload: { nino: payload.nino },
          requestId: `req-dwp-${payload.userId}`,
        },
        {
          userId: payload.userId,
          provider: IntegrationProviderType.OPEN_BANKING,
          payload: { userId: payload.userId },
          requestId: `req-ob-${payload.userId}`,
        },
        {
          userId: payload.userId,
          provider: IntegrationProviderType.EXPERIAN,
          payload: { userId: payload.userId },
          requestId: `req-exp-${payload.userId}`,
        },
      ];
      reqs.forEach((event) => this.integrationsQueue.add('integrationRequest', event));
    }

    // Rule-based fallback
    return this.rules.map((rule) => {
      let score = 0;
      let total = 0;
      for (const param of rule.parameters) {
        total += 1;
        if (
          payload[param.name] !== undefined &&
          payload[param.name]?.toString() === param.value.toString()
        ) {
          score += 1;
        }
      }
      return {
        benefitCode: rule.code,
        probability: Math.round(100 * (score / total)),
      };
    });
  }

  async scoreML(payload: any) {
    // Try ML model, fallback to rule-based
    if (this.mlModel) {
      const features = extractFeatures(payload);
      // const prediction = this.mlModel.predict(tf.tensor([features])).arraySync();
      // return { probability: prediction[0] };
      return { probability: 0.8 }; // stub
    } else {
      const rule = this.evaluate(payload)[0];
      return { probability: rule.probability / 100 };
    }
  }
}