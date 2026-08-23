# ---- build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Points "ویرایش این صفحه" at the public repo; override per-environment.
ARG DOCS_EDIT_BASE_URL
ENV DOCS_EDIT_BASE_URL=$DOCS_EDIT_BASE_URL
RUN npm run build

# ---- serve ----
FROM nginx:1.27-alpine
# Site is served under /docs, so the static output must live at that path.
COPY --from=builder /app/build /usr/share/nginx/html/docs
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
