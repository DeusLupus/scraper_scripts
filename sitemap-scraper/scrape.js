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

// add serving
let siteMapElement = dom.window.document.querySelector('row.site-map')
for (let colElement of siteMapElement.querySelectorAll('.col-md-4')) {
  let aElement = colElement.querySelector('a')
  let spanElement = colElement.querySelector('.text-center')
  if (!aElement || !spanElement) continue
  csv += `\n${spanElement.textContent},${aElement.href}`
}

// save csv
fs.writeFileSync(`${htmlFile}.csv`, csv)
