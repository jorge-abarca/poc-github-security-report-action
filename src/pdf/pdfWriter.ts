import * as os from 'os';

const puppeteer = require('puppeteer-core');

export function createPDF(html: string, file: string): Promise<string> {
  
  console.log("Creating pdf...", file);

  const fetcher = puppeteer.createBrowserFetcher({path: os.tmpdir()});

  return fetcher.download('782078')//TODO need to store and inject this
    .then(revisionInfo => {
      console.log("Downloaded...", fetcher);
      return puppeteer.launch({executablePath: revisionInfo.executablePath})
        .then(browser => {
          console.log("Creating new page...");
          return browser.newPage()
            .then(page => {
              console.log("Setting content...");
              return page.setContent(html)
                .then(() => {
                  console.log("Saving as pdf...");
                  return page.pdf({path: file, format: 'A4'})
                });
            })
            .then(() => {
              console.log("Closing browser...");
              return browser.close();
            });
        })
        .then(() => {
          console.log("Returning file..");
          return file;
        });
    });
};
