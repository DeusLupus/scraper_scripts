#!/bin/bash

# Author : Deo Bissessar
# FusionZONE Automotive LLC

# Download and unzip .gz files from DealerFire Websites
# jaguaroflivermore.com

# assign URLs to variables
URL1='https://www.jaguaroflivermore.com/sitemap-static.xml.gz'
URL2='https://www.jaguaroflivermore.com/sitemap-vehicle.xml.gz'
URL3='https://www.jaguaroflivermore.com/sitemap-vehicleimages.xml.gz'

# download .gz file
wget $URL1 
wget $URL2
wget $URL3

# unzip files
gunzip sitemap*.gz

# change folder
cd sitemap-scraper

# extract URLs
node scrapeXML.js ../sitemap-static.xml 
node scrapeXML.js ../sitemap-vehicle.xml 
node scrapeXML.js ../sitemap-vehicleimages.xml