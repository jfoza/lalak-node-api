create table user_schema.rules
(
    uuid uuid default uuid_generate_v4() not null primary key,
    description varchar not null constraint "UQ_029f52e88a42d77eba77064466d" unique,
    subject varchar,
    action varchar,
    active boolean default true,
    created_at  timestamp default now() not null,
    updated_at  timestamp default now() not null
);