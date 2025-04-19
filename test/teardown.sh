#!/bin/bash

# Load container IDs from the file
if [ -f container_ids.env ]; then
  source container_ids.env
else
  echo "Error: container_ids.env file not found."
  exit 1
fi

# Stop and remove containers
echo "Stopping and removing containers..."
docker stop $DB_CONTAINER_ID
docker rm $DB_CONTAINER_ID
docker stop $CACHE_CONTAINER_ID
docker rm $CACHE_CONTAINER_ID

# Remove volume
echo "Removing docker volume..."
docker volume rm test_data || echo "Volume test_data not found or already removed"

# Optionally, remove the container_ids.env file
rm -f container_ids.env