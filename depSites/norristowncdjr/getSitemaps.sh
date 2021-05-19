#!/bin/bash

#Author : Deo Bissessar
#FusionZONE Automotive LLC

##Get sitemap files from Dealer eProcess sites
#norristownchryslerdodge.com

# assign sitemaps to variables
baseURL='https://www.norristownchryslerdodge.com/resrc/xmlsitemap'

# sitemaps
sm1='/sitemap-menus'
sm2='/sitemap-inventory-search'

# get menu and inventory sitemaps
menu=${baseURL}${sm1}
inv=${baseURL}${sm2}

#download sitemaps
wget $menu
wget $inv

# get article sitemaps
baseURL+='/sitemap-aricles/'

sm3='auto-parts/173'
sm4='auto-repair/176'
sm5='bad-credit-loan/161'
sm6='car-lease/79'
sm7='car-loan/191'
sm8='dealer-near/52'
sm9='fleet-vehicles/87'
sm10='lease-returns/146'
sm11='oil-change/185'
sm12='one-owner-cars/200'
sm13='tires/179'
sm14='used-car-dealer/85'
sm15='used-trucks/203'

#download sitemaps
wget ${baseURL}${sm3}
wget ${baseURL}${sm4}
wget ${baseURL}${sm5}
wget ${baseURL}${sm6}
wget ${baseURL}${sm7}
wget ${baseURL}${sm8}
wget ${baseURL}${sm9}
wget ${baseURL}${sm10}
wget ${baseURL}${sm11}
wget ${baseURL}${sm12}
wget ${baseURL}${sm13}
wget ${baseURL}${sm14}
wget ${baseURL}${sm15}

#change folder
cd sitemap-scraper

#extract URLs to csv
node scrapeXML.js ../sitemap-menus
node scrapeXML.js ../sitemap-inventory-search
node scrapeSitemap.js ../173
node scrapeSitemap.js ../176
node scrapeSitemap.js ../161
node scrapeSitemap.js ../79
node scrapeSitemap.js ../191
node scrapeSitemap.js ../52
node scrapeSitemap.js ../87
node scrapeSitemap.js ../146
node scrapeSitemap.js ../185
node scrapeSitemap.js ../200
node scrapeSitemap.js ../179
node scrapeSitemap.js ../85
node scrapeSitemap.js ../203