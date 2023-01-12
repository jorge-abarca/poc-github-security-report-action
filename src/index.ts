import ReportGenerator from './ReportGenerator';

import * as core from '@actions/core';
import { Octokit } from '@octokit/rest';

// Test, remove:
import { createPDF } from './pdf/pdfWriter';

async function run(): Promise<void> {
  try {
    const token = getRequiredInputValue('token');

    const generator = new ReportGenerator({
      repository: getRequiredInputValue('repository'),
      octokit: new Octokit({auth: token}),

      sarifReportDirectory: getRequiredInputValue('sarifReportDir'),
      outputDirectory: getRequiredInputValue('outputDir'),

      templating: {
        name: getRequiredInputValue('template')
      }
    });
    
    console.log("Running gnerator v0.8...");
    
    // Test PDF:
    console.log("creating test pdf...");
    await createPDF('<html><body><h1>Hello World</h1></body>', 'test.pdf');
    console.log("done...");

    const file = await generator.run();
    console.log("generated report: ", file);
  } catch (err) {
    console.error(err);
    core.setFailed(err.message);
  }
}

run();

function getRequiredInputValue(key: string): string {
  return core.getInput(key, {required: true});
}
