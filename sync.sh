#!/bin/sh

screeps_path=~/Library/Application\ Support/Screeps/scripts/screeps.com

echo "copy files to $screeps_path/$1"
mkdir -p "$screeps_path/$1" \
	&& cp -f dist/* "$screeps_path/$1"