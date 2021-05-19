//SOKAL Cleveland Ford sitemap scraper

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
let siteMapElement = dom.window.document.querySelector('row.site-map')

// add serving
for (let colElement of siteMapElement.querySelectorAll('.col-md-4')) {
  let aElement = colElement.querySelector('a')
  let spanElement = colElement.querySelector('.text-center')
  if (!aElement || !spanElement) continue
  csv += `\n${spanElement.textContent},${aElement.href}`
}

//add Site Directory
for (let colElement of siteMapElement.querySelectorAll('li')) {
  let aElement = colElement.querySelector('a')
  if (!aElement) continue
  csv += `\n${aElement.textContent},${aElement.href}`
}

//add site pages
for (let colElement of siteMapElement.querySelectorAll('.col-xs-6')) {
  let aElement = colElement.querySelector('a')
  if (!aElement) continue
  csv += `\n${aElement.textContent},${aElement.href}`
}

// save csv
fs.writeFileSync(`${htmlFile}.csv`, csv)
