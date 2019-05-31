#!/usr/bin/env bash

# This script requires that the following environment variables are defined (for example by your build server):
# - RELEASE_NAME (the name of your release)
# - GITHUB_USERNAME
# - GITHUB_PASSWORD
# - NPMJS_USERNAME
# - NPMJS_PASSWORD
# - NPMJS_EMAIL
# - AWS_ACCESS_KEY_ID
# - AWS_SECRET_ACCESS_KEY
# - AWS_REGION
# - AWS_BUCKET
#
# Furthermore, it requires that the following command line interface tools are installed:
# - aws
# - npm
# - curl
# - expect


### Helper functions

function checkEnvironment {
  variable=$1
  if [ "${!variable}" = "" ];
  then
    echo "Error: Necessary environment variable undefined! Please define '$variable'!";
    exit 1
  fi
}

function putS3 {
  path=$1
  file=$2
  aws_path=$3
  aws s3 cp "${path}/${file}" "s3://${AWS_BUCKET}${aws_path}" || exit 1
}

### Configuration
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
GITHUB_REPO_URL=https://api.github.com/repos/as-ideas/oil
AWS_BUCKET_PATH=/rawOil/${PACKAGE_VERSION}


### Main

echo "\n### Checking environment"
checkEnvironment "RELEASE_NAME"


echo "### Installing dependencies"
npm i || exit 1


echo "### Building release" $PACKAGE_VERSION$SNAPSHOT
export SNAPSHOT="-RELEASE";npm run build:release || exit 1


echo "### Copying release to release directory"
mkdir release/$PACKAGE_VERSION
cp dist/*.$PACKAGE_VERSION-RELEASE.*.js release/$PACKAGE_VERSION/
cp -r dist/docs release/$PACKAGE_VERSION/


echo "### Copying stats.json to release directory"
cp dist/stats.json release/$PACKAGE_VERSION/


echo "### Copying hub.html to release directory and versioning it"
cp src/hub.html release/$PACKAGE_VERSION/
HUB_HTML=$(cat release/$PACKAGE_VERSION/hub.html)
HUB_JS=$(cat release/$PACKAGE_VERSION/hub.$PACKAGE_VERSION-RELEASE.min.js)
echo "${HUB_HTML/<!--REPLACEME-->/$HUB_JS}" > release/$PACKAGE_VERSION/hub.html
cp release/$PACKAGE_VERSION/hub.html dist/latest/hub.html


echo "### Copying and versioning poi-list to release directory"
cp -r dist/poi-lists release/$PACKAGE_VERSION/
mkdir dist/latest/poi-lists
cp dist/poi-lists/default.json dist/latest/poi-lists/default.json


echo "### Creating release for npmjs.com"
if [ -d "release/current" ];
then
  rm -rf release/current
fi
cp -r release/$PACKAGE_VERSION release/current
rm -rf release/current/docs release/current/poi-lists release/current/stats.json


echo "### Increasing patch version"
git add .
git commit -a -m "Adding new release $PACKAGE_VERSION$SNAPSHOT" --no-edit

