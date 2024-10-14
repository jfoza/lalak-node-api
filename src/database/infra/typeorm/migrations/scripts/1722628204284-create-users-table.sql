CREATE TABLE IF NOT EXISTS user_schema.users
(
    uuid uuid default uuid_generate_v4() not null primary key,
    person_uuid uuid constraint "UsersPersonUuidFk" references person_schema.persons,
    profile_uuid uuid constraint "UsersProfileUuidFk" references user_schema.profiles,
    email varchar not null constraint "UQ_97672ac88f789774dd47f7c8be3" unique,
    password varchar not null,
    active boolean not null default true,
    creator_uuid uuid,
    updater_uuid uuid,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);