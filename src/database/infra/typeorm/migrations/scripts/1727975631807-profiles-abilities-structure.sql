DO $$
    DECLARE
_view_action   varchar := 'VIEW';
        _insert_action varchar := 'INSERT';
        _update_action varchar := 'UPDATE';
        _delete_action varchar := 'DELETE';
        _upload_action varchar := 'UPLOAD';

        -- PROFILES
        _profile1 uuid := uuid_generate_v4();
        _profile2 uuid := uuid_generate_v4();
        _profile3 uuid := uuid_generate_v4();

        -- ABILITIES
        _ability1 uuid := uuid_generate_v4();
        _ability2 uuid := uuid_generate_v4();
        _ability3 uuid := uuid_generate_v4();
        _ability4 uuid := uuid_generate_v4();
        _ability5 uuid := uuid_generate_v4();
        _ability6 uuid := uuid_generate_v4();
        _ability7 uuid := uuid_generate_v4();
        _ability8 uuid := uuid_generate_v4();
        _ability9 uuid := uuid_generate_v4();
        _ability10 uuid := uuid_generate_v4();
        _ability11 uuid := uuid_generate_v4();
        _ability12 uuid := uuid_generate_v4();
        _ability13 uuid := uuid_generate_v4();
        _ability14 uuid := uuid_generate_v4();
        _ability15 uuid := uuid_generate_v4();
        _ability16 uuid := uuid_generate_v4();
        _ability17 uuid := uuid_generate_v4();
        _ability18 uuid := uuid_generate_v4();
        _ability19 uuid := uuid_generate_v4();
        _ability20 uuid := uuid_generate_v4();
        _ability21 uuid := uuid_generate_v4();
        _ability22 uuid := uuid_generate_v4();
        _ability23 uuid := uuid_generate_v4();
        _ability24 uuid := uuid_generate_v4();
        _ability25 uuid := uuid_generate_v4();
        _ability26 uuid := uuid_generate_v4();
        _ability27 uuid := uuid_generate_v4();
        _ability28 uuid := uuid_generate_v4();
        _ability29 uuid := uuid_generate_v4();
        _ability30 uuid := uuid_generate_v4();
        _ability31 uuid := uuid_generate_v4();
        _ability32 uuid := uuid_generate_v4();
        _ability33 uuid := uuid_generate_v4();
        _ability34 uuid := uuid_generate_v4();
        _ability35 uuid := uuid_generate_v4();
        _ability36 uuid := uuid_generate_v4();
        _ability37 uuid := uuid_generate_v4();
        _ability38 uuid := uuid_generate_v4();
        _ability39 uuid := uuid_generate_v4();
        _ability40 uuid := uuid_generate_v4();
        _ability41 uuid := uuid_generate_v4();
        _ability42 uuid := uuid_generate_v4();
        _ability43 uuid := uuid_generate_v4();
        _ability44 uuid := uuid_generate_v4();
        _ability45 uuid := uuid_generate_v4();
        _ability46 uuid := uuid_generate_v4();
        _ability47 uuid := uuid_generate_v4();
        _ability48 uuid := uuid_generate_v4();
        _ability49 uuid := uuid_generate_v4();
        _ability50 uuid := uuid_generate_v4();

BEGIN
INSERT INTO user_schema.abilities (uuid, description, subject, action)
VALUES
    (_ability1, 'ROOT', 'ROOT', _view_action),
    (_ability2, 'ADMIN_USERS_ADMIN_MASTER_VIEW', 'ADMIN_USERS_ADMIN_MASTER', _view_action),
    (_ability3, 'ADMIN_USERS_ADMIN_MASTER_INSERT', 'ADMIN_USERS_ADMIN_MASTER', _insert_action),
    (_ability4, 'ADMIN_USERS_ADMIN_MASTER_UPDATE', 'ADMIN_USERS_ADMIN_MASTER', _update_action),

    (_ability5, 'ADMIN_USERS_EMPLOYEE_VIEW', 'ADMIN_USERS_EMPLOYEE', _view_action),
    (_ability6, 'ADMIN_USERS_EMPLOYEE_INSERT', 'ADMIN_USERS_EMPLOYEE', _insert_action),
    (_ability7, 'ADMIN_USERS_EMPLOYEE_UPDATE', 'ADMIN_USERS_EMPLOYEE', _update_action),

    (_ability8, 'PROFILES_ADMIN_MASTER_VIEW', 'PROFILES_ADMIN_MASTER', _view_action),
    (_ability9, 'PROFILES_EMPLOYEE_VIEW', 'PROFILES_EMPLOYEE', _view_action),

    (_ability10, 'CITIES_VIEW', 'CITIES', _view_action ),
    (_ability11, 'STATES_VIEW', 'STATES', _view_action),

    (_ability12, 'CUSTOMERS_VIEW', 'CUSTOMERS', _view_action),
    (_ability13, 'CUSTOMERS_INSERT', 'CUSTOMERS', _insert_action),
    (_ability14, 'CUSTOMERS_UPDATE', 'CUSTOMERS', _update_action),

    (_ability15, 'THEMES_VIEW',   'THEMES', _view_action),
    (_ability16, 'THEMES_INSERT', 'THEMES', _insert_action),
    (_ability17, 'THEMES_UPDATE', 'THEMES', _update_action),
    (_ability18, 'THEMES_DELETE', 'THEMES', _delete_action),

    (_ability19, 'CATEGORIES_VIEW',   'CATEGORIES', _view_action),
    (_ability20, 'CATEGORIES_INSERT', 'CATEGORIES', _insert_action),
    (_ability21, 'CATEGORIES_UPDATE', 'CATEGORIES', _update_action),
    (_ability22, 'CATEGORIES_DELETE', 'CATEGORIES', _delete_action),

    (_ability23, 'EVENTS_VIEW',   'EVENTS', _view_action),
    (_ability24, 'EVENTS_INSERT', 'EVENTS', _insert_action),
    (_ability25, 'EVENTS_UPDATE', 'EVENTS', _update_action),
    (_ability26, 'EVENTS_DELETE', 'EVENTS', _delete_action),

    (_ability27, 'PRODUCTS_VIEW',   'PRODUCTS', _view_action),
    (_ability28, 'PRODUCTS_INSERT', 'PRODUCTS', _insert_action),
    (_ability29, 'PRODUCTS_UPDATE', 'PRODUCTS', _update_action),
    (_ability30, 'PRODUCTS_DELETE', 'PRODUCTS', _delete_action)
;

INSERT INTO user_schema.profiles (uuid, description, unique_name)
VALUES
    (
        _profile1,
        'Admin Master',
        'ADMIN_MASTER'
    ),
    (
        _profile2,
        'Colaborador',
        'EMPLOYEE'
    ),
    (
        _profile3,
        'Cliente',
        'CUSTOMER'
    );

INSERT INTO user_schema.profiles_abilities (profile_uuid, ability_uuid)
VALUES
    -- ADMIN MASTER
    (_profile1, _ability1),
    (_profile1, _ability2),
    (_profile1, _ability3),
    (_profile1, _ability4),
    (_profile1, _ability8),
    (_profile1, _ability10),
    (_profile1, _ability11),
    (_profile1, _ability12),
    (_profile1, _ability13),
    (_profile1, _ability14),
    (_profile1, _ability15),
    (_profile1, _ability16),
    (_profile1, _ability17),
    (_profile1, _ability18),
    (_profile1, _ability19),
    (_profile1, _ability20),
    (_profile1, _ability21),
    (_profile1, _ability22),
    (_profile1, _ability23),
    (_profile1, _ability24),
    (_profile1, _ability25),
    (_profile1, _ability26),
    (_profile1, _ability27),
    (_profile1, _ability28),
    (_profile1, _ability29),
    (_profile1, _ability30),

    -- EMPLOYEE
    (_profile2, _ability1),
    (_profile2, _ability5),
    (_profile2, _ability6),
    (_profile2, _ability7),
    (_profile2, _ability9),
    (_profile2, _ability10),
    (_profile2, _ability11),
    (_profile2, _ability12),
    (_profile2, _ability15),
    (_profile2, _ability16),
    (_profile2, _ability17),
    (_profile2, _ability19),
    (_profile2, _ability20),
    (_profile2, _ability21),
    (_profile2, _ability23),
    (_profile2, _ability24),
    (_profile2, _ability25),
    (_profile2, _ability27),
    (_profile2, _ability28),
    (_profile2, _ability29)

;
END $$;
