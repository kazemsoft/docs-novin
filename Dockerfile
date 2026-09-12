# Container image for self-hosting the docs (planned migration to an Iran
# server). Day-to-day deploys currently go through Vercel via a version tag —
# see DEPLOYMENT.md.
#
# ---- build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Both default correctly for root-serving; override only when the site is
# mounted under a sub-path or a different domain.
ARG DOCS_BASE_URL
ARG DOCS_SITE_URL
# Points "ویرایش این صفحه" at the public repo; override per-environment.
ARG DOCS_EDIT_BASE_URL
ENV DOCS_BASE_URL=$DOCS_BASE_URL \
    DOCS_SITE_URL=$DOCS_SITE_URL \
    DOCS_EDIT_BASE_URL=$DOCS_EDIT_BASE_URL
RUN npm run build

# ---- serve ----
FROM nginx:1.27-alpine
# The site owns its domain root, so the build output is the web root.
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
