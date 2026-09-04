#!/bin/sh
# PUID/PGID handling modeled on linuxserver.io images: remap the build-time
# `nextjs` user to the requested ids, fix /app/.next ownership (next/image
# cache is written there at runtime), then drop privileges. Skipped entirely
# when the container is started with --user.
set -e

if [ "$(id -u)" = "0" ]; then
  PUID=${PUID:-1001}
  PGID=${PGID:-1001}
  groupmod -o -g "$PGID" nodejs
  usermod  -o -u "$PUID" nextjs >/dev/null
  chown -R nextjs:nodejs /app/.next
  echo "portfolio: running as uid=$PUID gid=$PGID"
  exec su-exec nextjs "$@"
fi

exec "$@"
