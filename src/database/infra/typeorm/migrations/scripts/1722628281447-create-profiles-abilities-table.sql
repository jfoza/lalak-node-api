create table user_schema.profiles_abilities
(
    uuid uuid default uuid_generate_v4() not null primary key,
    profile_uuid uuid constraint "ProfilesAbilitiesProfileUuidFk" references user_schema.profiles on delete cascade,
    ability_uuid uuid constraint "ProfilesAbilitiesAbilityUuidFk" references user_schema.abilities on delete cascade,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);