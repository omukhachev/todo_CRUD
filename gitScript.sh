#!/bin/bash
cd ../my-private-repo
ra=$((RANDOM%100))
echo $ra >> README.md
git add .
git commit -m "added $ra number to README"
git push origin main 