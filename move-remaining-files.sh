#!/bin/bash

# Script to move remaining blog files to the appropriate language folders
# Created on April 29, 2025

SRC_DIR="/Users/joehuang/Documents/GitHub/cloudflareAstro/src/content/blog"
EN_DIR="$SRC_DIR/en"

# Ensure the target directories exist
mkdir -p "$EN_DIR"

# List of files to move to the 'en' directory
if [ -f "$SRC_DIR/first-post.md" ]; then
  echo "Moving first-post.md to en folder..."
  mv "$SRC_DIR/first-post.md" "$EN_DIR/first-post.md"
fi

if [ -f "$SRC_DIR/pdf-security-features.md" ]; then
  echo "Moving pdf-security-features.md to en folder..."
  mv "$SRC_DIR/pdf-security-features.md" "$EN_DIR/pdf-security-features.md"
fi

if [ -f "$SRC_DIR/pdf-share-online.md" ]; then
  echo "Moving pdf-share-online.md to en folder..."
  mv "$SRC_DIR/pdf-share-online.md" "$EN_DIR/pdf-share-online.md"
fi

echo "Finished moving remaining files to match GitHub repository structure."