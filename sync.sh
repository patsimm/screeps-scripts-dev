#!/bin/sh

screeps_path=~/Library/Application\ Support/Screeps/scripts/screeps.com

echo "copy files to $screeps_path/dev"
mkdir -p "$screeps_path/dev" \
	&& cp -f dist/* "$screeps_path/dev"