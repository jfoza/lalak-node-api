CREATE SCHEMA IF NOT EXISTS "person_schema";

create table person_schema.persons
(
    uuid           uuid default uuid_generate_v4() not null primary key,
    name           varchar(255)                            not null,
    short_name     varchar(255)                            not null,
    birth_date     date,
    phone          varchar(15) constraint person_schema_persons_phone_unique unique,
    zip_code       varchar(8),
    address        varchar(255),
    number_address varchar(255),
    complement     varchar(255),
    district       varchar(255),
    uf             varchar(2),
    city_uuid      uuid constraint "PersonsCityUuidFk" references city_schema.cities,
    active         boolean      default true               not null,
    creator_uuid   uuid,
    updater_uuid   uuid,
    created_at     timestamp(0) default now()              not null,
    updated_at     timestamp(0) default now()              not null
);