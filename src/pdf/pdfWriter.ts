import * as os from 'os';

const puppeteer = require('puppeteer-core');

export function createPDF(html: string, file: string): Promise<string> {
  
  console.time("save pdf");
  console.time("download");
  
  console.log("Creating pdf...", file);

  const fetcher = puppeteer.createBrowserFetcher({path: os.tmpdir()});

  return fetcher.download('782078')//TODO need to store and inject this
    .then(revisionInfo => {
      console.log("Downloaded...", fetcher);
      console.timeEnd("download");
      console.log("Launching...");
      console.time("launch");
      return puppeteer.launch({executablePath: revisionInfo.executablePath})
        .then(browser => {
          console.log("launched!");
          console.timeEnd("launch");
          console.log("Creating new page...");
          console.time("newpage");
          return browser.newPage()
            .then(page => {
              console.timeEnd("newpage");
              console.log("Setting content...");
              console.time("set content");
              return page.setContent(html)
                .then(() => {
                  console.timeEnd("set content");
                  console.log("Saving as pdf...");
                  console.timeEnd("save pdf");
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
