# Build, installa dipendenze
FROM node:20.11.1-alpine3.19 AS builder

# Da usare per il dev
#WORKDIR /home/node/app
#COPY package*.json ./

# Bug, versioni nuove node necessitano workdir docker
# Da usare per il deploy
WORKDIR /build-stage
COPY . ./

RUN npm install -g @angular/cli@17
RUN npm install
ENV NG_CLI_ANALYTICS="false"

CMD ["ng", "serve", "--host=0.0.0.0"]
