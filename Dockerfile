# Container image for docs.novin.cloud, deployed to the global cluster.
# Built and pushed by .gitlab-ci.yml on a version tag; the tag is then
# written into the gitops repo and reconciled by Flux. See DEPLOYMENT.md.
#
# ---- build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Defaults must be repeated here, not left empty: the config reads these with
# `??`, which only falls back on undefined, and an unset ARG becomes "".
# Override only when serving under a sub-path or a different domain.
ARG DOCS_BASE_URL=/
ARG DOCS_SITE_URL=https://docs.novin.cloud
# Points "ویرایش این صفحه" at the public repo; override per-environment.
ARG DOCS_EDIT_BASE_URL=https://github.com/novincloud/docs-novin/tree/main
ENV DOCS_BASE_URL=$DOCS_BASE_URL \
    DOCS_SITE_URL=$DOCS_SITE_URL \
    DOCS_EDIT_BASE_URL=$DOCS_EDIT_BASE_URL
# onBrokenLinks: "throw" makes a dead internal link fail the image build.
RUN npm run build

# ---- serve ----
# The unprivileged variant listens on 8080 and runs as nginx, so the pod
# needs no root and no writable /var/run.
FROM nginxinc/nginx-unprivileged:1.27-alpine
# The site owns its domain root, so the build output is the web root.
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
