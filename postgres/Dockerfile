FROM postgres:16.3

COPY ./docker-entrypoint-initdb.d/* /docker-entrypoiny-initdb.d/
RUN dos2unix /docker-entrypoint-initdb.d/*
