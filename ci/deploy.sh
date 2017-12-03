#!/bin/bash
set -v

# Requires environment variable GIT_TOKEN to be set.
if [ "$TRAVIS_BRANCH" != "master" ] || \
   [ "$TRAVIS_PULL_REQUEST" = "true" ] || \
   [ "$GIT_TOKEN" = "" ];
then
    exit 0
fi

# Create commit message
REPO=$(git config remote.origin.url)
HASH=$(git log --oneline | grep "\[TRAVIS\]" | awk '{print $1}' | head -n1)
DESC=$(git describe --tags --always --dirty)
LOG=$(git log --pretty="- "%s --first-parent $HASH..HEAD)
MSG=$(echo -ne "[TRAVIS] Auto deployment of ${HASH}:\n\n${LOG}\n")

# Clone the repo
git clone $REPO _out/
cd _out/
git checkout gh-pages || git checkout --orphan gh-pages

# Replace contents with the build contents
rm -rf *
cp -rf ../public/* .

# Remove temporary files
find . -name "_*.*" | xargs rm -rf
find . -name ".*.*" | xargs rm -rf

# Setup credentials
git config user.name "Travis CI"
git config user.email "github@arvid.io"
echo "https://${GIT_TOKEN}:x-oauth-basic@github.com\n" > ~/.git-credentials
git config remote.origin.url "https://${GIT_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"

# Push to repo
git add -A
git commit -am "${MSG}"
git push origin HEAD

# Remove artifacts again
cd ..
rm -rf _out/

