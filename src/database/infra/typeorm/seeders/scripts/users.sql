START TRANSACTION;

DO $$

    DECLARE
        _name VARCHAR := 'Giuseppe Foza';
        _short_name VARCHAR := 'GF';
        _email VARCHAR := 'jofender.foza@gmail.com';
        _password VARCHAR := '$2b$10$C5e72x.IaiB799aSxtXvqOEPu3euUS6d1reSEonyAT8SKh0xBqJai';

        _profile_uuid uuid;
        _person_uuid uuid;
        _user_uuid uuid;

    BEGIN

        SELECT uuid INTO _profile_uuid FROM user_schema.profiles WHERE unique_name = 'ADMIN_MASTER';

        insert into person_schema.persons(name, short_name)
        values (_name, _short_name) RETURNING uuid into _person_uuid;

        insert into user_schema.users (
            person_uuid,
            profile_uuid,
            email,
            password
        ) values (
                  _person_uuid,
                  _profile_uuid,
                  _email,
                  _password
                 )
        RETURNING uuid into _user_uuid;

        INSERT INTO user_schema.admin_users (user_uuid) VALUES(_user_uuid);
    END $$;
COMMIT;