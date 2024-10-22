CREATE SCHEMA IF NOT EXISTS products_schema;

create table products_schema.themes
(
    uuid uuid default uuid_generate_v4() not null primary key,
    description varchar not null,
    active boolean not null default true,
    creator_uuid uuid,
    updater_uuid uuid,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);