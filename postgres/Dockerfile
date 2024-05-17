FROM postgres:16.3

COPY ./docker-entrypoint-initdb.d/* /docker-entrypoint-initdb.d/
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    dos2unix
RUN dos2unix /docker-entrypoint-initdb.d/*
