import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as yaml from 'js-yaml';

@Injectable()
export class EligibilityService implements OnModuleInit {
  private rules: any[] = [];

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
  }

  evaluate(payload: any) {
    // Sample rule eval: match required fields, return [{benefitCode, probability}]
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
}