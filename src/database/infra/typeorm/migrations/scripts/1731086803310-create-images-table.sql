CREATE SCHEMA IF NOT EXISTS general_schema;

create table general_schema.images
(
    uuid uuid default uuid_generate_v4() not null primary key,
    path text not null,
    type varchar(20) default 'product'::character varying not null
        constraint ck_type
            check ((type)::text = ANY
                   ((ARRAY ['product'::character varying, 'user-avatar'::character varying])::text[])),
    creator_uuid uuid,
    updater_uuid uuid,
    created_at  timestamp default now() not null,
    updated_at  timestamp default now() not null
);