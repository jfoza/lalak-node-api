create schema if not exists city_schema;

create table city_schema.states
(
    uuid          uuid         default uuid_generate_v4() not null primary key,
    description varchar(255)                            not null,
    uf          varchar(2)                              not null,
    created_at  timestamp(0) default now()              not null,
    updated_at  timestamp(0) default now()              not null
);