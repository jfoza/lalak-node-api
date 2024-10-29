create table products_schema.products
(
    uuid uuid default uuid_generate_v4() not null primary key,
    description varchar not null,
    details text,
    unique_name varchar unique not null,
    value decimal(6,2) not null default 0.00,
    quantity bigint not null default 0,
    balance bigint not null default 0,
    active boolean not null default true,
    creator_uuid uuid,
    updater_uuid uuid,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);