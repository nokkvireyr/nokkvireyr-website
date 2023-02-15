#Dependancy stage
FROM node:16.14.0 as deps
#RUN apt-get update -y
#RUN sudo apt-get install -y libc6

WORKDIR /app

COPY package-lock.json ./
COPY package.json ./
RUN npm update csfundmodels
RUN npm install

#The building stage

FROM node:16.14.0 as builder

ENV NODE_ENV=production

WORKDIR /app

# COPY next.config.js.production ./next.config.js
COPY next.config.js ./next.config.js
COPY /public ./public

COPY package-lock.json ./
COPY package.json ./

COPY --from=deps /app/node_modules ./node_modules
# COPY service-worker.js ./
COPY /src ./
# COPY /keys ./keys

COPY postcss.config.js ./
COPY tailwind.config.js ./tailwind.config.js
COPY tsconfig.json ./

RUN npm run build

#Runner
FROM node:16.14.0 as runner

WORKDIR /app

RUN npm install sharp
#WORKDIR /app

ENV NODE_ENV=production
#RUN npm install pm2 -g

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p /app/.next/cache && chown nextjs:nodejs /app/.next/cache
VOLUME ["/app/.next/cache"]

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./src
COPY --from=builder /app/service-worker.js ./


COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN ls -al

EXPOSE 3000

USER nextjs

CMD ["node", "server.js"]
