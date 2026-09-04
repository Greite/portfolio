# Install dependencies only when needed
FROM oven/bun:1-alpine AS deps
ENV CI=true
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install deterministe depuis le lockfile (lance les postinstall des trustedDependencies)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile


# Rebuild the source code only when needed
FROM oven/bun:1-alpine AS builder
ENV CI=true
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

# Production image, copy all the files and run next
FROM node:krypton-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

# shadow (usermod/groupmod) + su-exec: PUID/PGID remap in docker-entrypoint.sh
RUN apk add --no-cache shadow su-exec
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --chmod=755 docker-entrypoint.sh /docker-entrypoint.sh

# No USER: the entrypoint remaps `nextjs` to PUID/PGID (default 1001:1001)
# and drops privileges itself. `--user` still works (remap is skipped).

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "server.js"]
