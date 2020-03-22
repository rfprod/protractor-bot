#!/bin/bash

##
# Colors
##
source colors.sh

##
# Builds docker image
##
function buildDockerImage() {
  local TITLE="<< BUILDING DOCKER CONTAINER >>"
  printf "\n${GREEN}%s${DEFAULT}\n" "$TITLE"
  sudo docker build -t rfprod/protractorbot -f ci/dock-protractorbot.Dockerfile .
}

##
# Starts docker container
##
function runDockerContainer() {
  local TITLE="<< STARTING DOCKER CONTAINER >>"
  printf "\n${GREEN}%s${DEFAULT}\n" "$TITLE"
  sudo docker run --rm -it -p 127.0.0.1:8080:8080 rfprod/protractorbot:latest
}

##
# Start if no arguments are provided.
##
if [ 1 -gt $# ]; then
  buildDockerImage
  runDockerContainer
fi

if [ $# -gt 0 ]; then
  # build
  if [ "$1" = "build" ]; then
    buildDockerImage
  fi
  # start
  if [ "$1" = "start" ]; then
    runDockerContainer
  fi
fi
