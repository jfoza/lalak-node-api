create table user_schema.user_tokens
(
    uuid uuid default uuid_generate_v4() not null primary key,
    user_uuid uuid not null constraint "UserTokensUserUuidFk" references user_schema.users,
    token uuid not null,
    token_type varchar not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);