create table user_schema.profiles_rules
(
    uuid uuid default uuid_generate_v4() not null primary key,
    profile_uuid uuid constraint "ProfilesRulesProfileUuidFk" references user_schema.profiles on delete cascade,
    rule_uuid uuid constraint "ProfilesRulesRuleUuidFk" references user_schema.rules on delete cascade,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);