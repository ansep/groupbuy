#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE public.roles (
        id bigint NOT NULL,
        name character varying(20),
        CONSTRAINT roles_name_check CHECK (((name)::text = ANY ((ARRAY['ROLE_BUYER'::character varying, 'ROLE_BROKER'::character varying])::text[])))
    );

    CREATE SEQUENCE public.roles_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;
    
    ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
    
    ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
    
    SELECT pg_catalog.setval('public.roles_id_seq', 1, false);
    
    ALTER TABLE ONLY public.roles
        ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
    
    INSERT INTO roles(name) VALUES('ROLE_BUYER');
    INSERT INTO roles(name) VALUES('ROLE_BROKER');
EOSQL
