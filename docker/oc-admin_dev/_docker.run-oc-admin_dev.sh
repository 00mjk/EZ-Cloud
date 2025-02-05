#!/usr/bin/env bash

# =============================================
# Author:      Tony Massé
# Create date: 2022-07-11
# Modified on: 2022-07-13 - To increase user watches, instances and queued events limits on the Docker host
# Modified on: 2022-12-02 - To start container in auto-restart, and tail logs instead of running in interactive mode
# Modified on: 2023-01-04 - To start container in build mode using specific entrypoint instead of environment variable
# Modified on: 2023-01-11 - Add Docker to container, as a fundation to build and publish Docker images from container itself
# Description: Pull and Start Dev version of the OC-Admin container `oc-admin_dev`.
#              Can be used to just build the content of the `oc-admin` container, with the `--build_only` flag.
# Parameters:
#  --help         Shows Help message
#  --build_only   Run, build Frontend and Backend, then quit
# =============================================

# To be ran on the Docker host to start this container

# Display Help message
if [[ "$*" == *help* ]]; then
  echo ""
  echo "Usage:  _docker.run-oc-admin_dev.sh [OPTIONS]"
  echo ""
  echo "Options:"
  echo "   --help                Shows this help"
  echo "   --build_only          Run, build Frontend and Backend, then quit"
  echo ""
  echo "By default (no parameters) \`oc-admin_dev\` will stay running until killed."
  echo ""
  exit 0
fi

echo "### Create \`oc-admin_dev\` Volume..."
docker volume create oc-admin_dev

echo "### PULL CONTAINER..."
docker pull tonymasse/oc-admin_dev

if [[ "$*" == *build_only* ]]; then

  # Start a temporary `oc-admin_dev` copy, then build the `oc-admin` image

  echo "### RUN CONTAINER IN BUILING MODE..."
  # docker run --interactive --tty --rm --volume oc-admin_dev:/app/EZ-Cloud/dist --env BUILD_OC_ADMIN_IMAGE="TRUE" tonymasse/oc-admin_dev
  docker run --interactive --tty --rm --volume oc-admin_dev:/app/EZ-Cloud/dist --volume /var/run/docker.sock:/var/run/docker.sock --entrypoint="/app/_entrypoint.buildDockerFull.sh" tonymasse/oc-admin_dev

else

  # Start the more permanent version, for Dev work most likely

  echo "### INCREASING USER WATCHES LIMIT (SYSCTL)..."
  grep -qxF 'fs.inotify.max_user_watches=1048576' /etc/sysctl.conf || echo "fs.inotify.max_user_watches=1048576" | sudo tee -a /etc/sysctl.conf

  echo "### INCREASING USER INSTANCES LIMIT (SYSCTL)..."
  grep -qxF 'fs.inotify.max_user_instances=1048576' /etc/sysctl.conf || echo "fs.inotify.max_user_instances=1048576" | sudo tee -a /etc/sysctl.conf

  echo "### INCREASING QUEUED EVENTS LIMIT (SYSCTL)..."
  grep -qxF 'fs.inotify.max_queued_events=1048576' /etc/sysctl.conf || echo "fs.inotify.max_queued_events=1048576" | sudo tee -a /etc/sysctl.conf

  echo "### RELOADING SYSCTL CONFIGURATION..."
  sudo sysctl -p

  # echo "### RUN CONTAINER IN INTERACTIVE MODE..."
  # docker run --interactive --tty --publish 8400:8400/tcp --network logrhythm --volume oc-admin_dev:/app/EZ-Cloud/dist --name oc-admin tonymasse/oc-admin_dev
  echo "### START CONTAINER..."
  docker run --detach --restart unless-stopped --tty --publish 8400:8400/tcp --network logrhythm --volume oc-admin_dev:/app/EZ-Cloud/dist --volume /var/run/docker.sock:/var/run/docker.sock --name oc-admin tonymasse/oc-admin_dev

  echo "### FOLLOW CONTAINER'S LOGS..."
  docker logs --follow oc-admin

fi
