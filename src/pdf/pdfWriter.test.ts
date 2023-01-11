import { expect } from 'chai';
import { mkdirP } from '@actions/io';
import { createPDF } from './pdfWriter';
import { getTestDirectoryFilePath } from '../testUtils';

describe('pdfWriter', function () {
  console.log("waiting...");
  this.timeout(30 * 1000);
  console.log("done waiting!");

  it('should generate a simple pdf', async () => {
    console.log("testing generating a simple file");
    const html = '<html><body><h1>Hello World</h1></body>'
      , file = getTestDirectoryFilePath('test.pdf')
    ;

    console.log("Making directory...");
    // Ensure the directory exists
    await mkdirP(getTestDirectoryFilePath());

    console.log("Generating PDF...");
    console.time("test.generatePdf");
    const generatePdf = await createPDF(html, file)
    console.timeEnd("test.generatePdf");
    expect(generatePdf).to.equal(file);
    //TODO check size
  });
});
