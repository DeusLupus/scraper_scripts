//TEST SCRIPT TO ELIMINATE DUPLICATES DURING THE SCRAPE
//SOKAL sitemap scraper

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
  let servingItems = [aElement.href]
  servingItems = servingItems.filter((servingItem, index) => servingItems.indexOf(servingItem) == index)
  if (!aElement || !spanElement) continue
  csv += `\n${spanElement.textContent},${aElement.href}`
}

// add Site Directory
for (let colElement of siteMapElement.querySelectorAll('li')) {
  let aElement = colElement.querySelector('a')
  let siteItems = [aElement.href]
  siteItems = siteItems.filter((siteItem, index) => siteItems.indexOf(siteItem) == index)
  if (!aElement) continue
  csv += `\n${aElement.textContent},${aElement.href}`
}

// add site pages
for (let colElement of siteMapElement.querySelectorAll('.col-xs-6')) {
  let aElement = colElement.querySelector('a')
  let pageItems = [aElement.href]
  pageItems = pageItems.filter((pageItem, index) => pageItems.indexOf(pageItem) == index)
  if (!aElement) continue
  csv += `\n${aElement.textContent},${aElement.href}`
}

// add service and repairs
for (let colElement of siteMapElement.querySelectorAll('.col-xs-4')) {
  let aElement = colElement.querySelector('a')
  let serviceItems = [aElement.href]
  serviceItems = serviceItems.filter((serviceItem, index) => serviceItems.indexOf(serviceItem) == index)
  if (!aElement) continue
  csv += `\n${aElement.textContent},${aElement.href}`
}

// save csv
fs.writeFileSync(`${htmlFile}.csv`, csv)
