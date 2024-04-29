# Build, installa dipendenze
FROM node:20.11.1-alpine3.19 as builder

# Bug, versioni nuove node necessitano workdir docker
WORKDIR /build-stage
COPY . ./
RUN npm install -g @angular/cli@17
RUN npm install

CMD ["ng", "serve", "--host=0.0.0.0"]
