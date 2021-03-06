#!/bin/bash

# Author : Deo Bissessar
# FusionZONE Automotive LLC

# Download and unzip .gz files from DealerFire Websites
# jlrventura.com

# assign URLs to variables
URL1='https://www.jlrventura.com/sitemap-static.xml.gz'
URL2='https://www.jlrventura.com/sitemap-image.xml.gz'
URL3='https://www.jlrventura.com/sitemap-vehicle.xml.gz'

# download .gz file
wget $URL1 
wget $URL2
wget $URL3

# unzip files
gunzip sitemap*.gz

# change directory
cd sitemap-scraper

# use node to extract urls from xml and place in csv
node scrapeXML.js ../sitemap-static.xml
node scrapeXML.js ../sitemap-image.xml
node scrapeXML.js ../sitemap-vehicle.xml