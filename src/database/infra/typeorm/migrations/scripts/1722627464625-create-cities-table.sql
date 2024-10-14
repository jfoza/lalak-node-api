create schema if not exists city_schema;

create table city_schema.cities
(
    uuid          uuid         default uuid_generate_v4() not null primary key,
    description varchar(255)                            not null,
    uf          varchar(2)                              not null,
    active      boolean      default true               not null
);