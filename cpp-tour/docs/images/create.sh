#!/bin/bash

convert touch-icon.png -resize 180x180 apple-icon-180x180.png
convert touch-icon.png -resize 120x120 apple-icon-120x120.png
convert touch-icon.png -resize 167x167 apple-icon-167x167.png
convert touch-icon.png -resize 152x152 apple-icon-152x152.png

convert touch-icon.png -resize 48x48 android-icon-48x48.png
convert touch-icon.png -resize 72x72 android-icon-72x72.png
convert touch-icon.png -resize 96x96 android-icon-96x96.png
convert touch-icon.png -resize 144x144 android-icon-144x144.png
convert touch-icon.png -resize 192x192 android-icon-192x192.png
convert touch-icon.png -resize 512x512 android-icon-512x512.png

