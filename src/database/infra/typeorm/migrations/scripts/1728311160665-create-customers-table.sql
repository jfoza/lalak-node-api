create table user_schema.customers
(
    uuid uuid default uuid_generate_v4() not null primary key,
    user_uuid uuid constraint "CustomerUsersUserIdFk" references user_schema.users,
    verified_email boolean not null default false,
    creator_uuid uuid,
    updater_uuid uuid,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);