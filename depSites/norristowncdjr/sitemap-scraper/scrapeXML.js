//scrape DEP sitemaps

const fs = require('fs')
const { JSDOM } = require('jsdom')

// evaluate arguments
let htmlFile = process.argv[2]
if (!htmlFile) return console.log('Must specify a file')

// parse dom into objects
let html = fs.readFileSync(htmlFile, 'utf-8')
let dom = new JSDOM(html)

// start generating csv
let csv = 'Title,URI'

// find sitemap content
let siteMapElement = dom.window.document.querySelector('urlset')

// add service and repairs
for (let colElement of siteMapElement.querySelectorAll('url')) {
  let aElement = colElement.querySelector('loc')
  if (!aElement) continue
  csv += `\n${aElement.textContent}`
}

// save csv
fs.writeFileSync(`${htmlFile}.csv`, csv)