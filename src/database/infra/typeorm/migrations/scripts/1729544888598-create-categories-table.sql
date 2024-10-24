create table products_schema.categories
(
    uuid uuid default uuid_generate_v4() not null primary key,
    theme_uuid uuid constraint "CategoriesThemeUuidFk" references products_schema.themes on delete restrict,
    description varchar not null,
    active boolean not null default true,
    creator_uuid uuid,
    updater_uuid uuid,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);