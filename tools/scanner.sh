#!/bin/bash

cd ../dist

dbIndexName="__sw_foff"
projectDbFolderName="projectDb"

mkdir -p $projectDbFolderName

# Generate a uuid for our buffer file
uuid=$(uuidgen)

# Create a buffer file
touch $uuid

toInjectProjects=""
for project in *; do
    # Check if directory and if not some of the root directories
    if [[ -d "$project" && ! -L "$project" ]]; then
        if [[ ! "$project" = "ascii" && ! "$project" = "assets" && ! "$project" = "images" && ! "$project" = "$projectDbFolderName" ]]; then
            # Scan for an image in the folder
            toInjectImage=""
            if [[ -f "$project/foff.jpg" ]]; then
                toInjectImage="XX$project/foff.jpg"
            fi

            # Add the scanned projects to the variable
            toInjectProjects+=$(echo "$project$toInjectImage::")
        fi
    fi
done

toInjectProjects=${toInjectProjects::-2}

# After we are done, write to the buffer file
# TODO: Check for diffs and update the diffs only
echo "$toInjectProjects" >> $uuid

# Move the buffer into the db folder
mv $uuid $projectDbFolderName

# Go into that folder
cd $projectDbFolderName

# Check if we have an existing index
# If so remove it and recreate the
# file with the new uuid
if [[ -f "$dbIndexName" ]]; then
    rm $dbIndexName 
fi

touch $dbIndexName 
echo "$uuid" >> $dbIndexName
