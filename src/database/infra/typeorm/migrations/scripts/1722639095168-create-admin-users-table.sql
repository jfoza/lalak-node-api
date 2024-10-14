create table user_schema.admin_users
(
    uuid uuid default uuid_generate_v4() not null primary key,
    user_uuid uuid constraint "AdminUsersUserUuidFk" references user_schema.users,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);