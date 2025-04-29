#!/bin/bash

# Script to serve sitemap files locally
# Created on April 29, 2025

PORT=8000
SITEMAP_DIR="/Users/joehuang/Documents/GitHub/cloudflareAstro/dist"

echo "Starting a simple HTTP server to serve sitemap files..."
echo "Sitemap will be available at: http://localhost:$PORT/sitemap-index.xml"
echo "                         and: http://localhost:$PORT/sitemap-0.xml"
echo ""
echo "Press Ctrl+C to stop the server"

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    cd "$SITEMAP_DIR" && python3 -m http.server $PORT
# Fall back to Python 2 if Python 3 is not available
elif command -v python &> /dev/null; then
    cd "$SITEMAP_DIR" && python -m SimpleHTTPServer $PORT
else
    echo "Error: Python is not installed. Please install Python to run this server."
    exit 1
fi