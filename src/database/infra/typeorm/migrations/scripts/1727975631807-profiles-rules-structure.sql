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

        -- RULES
        _rule1 uuid := uuid_generate_v4();
        _rule2 uuid := uuid_generate_v4();
        _rule3 uuid := uuid_generate_v4();
        _rule4 uuid := uuid_generate_v4();
        _rule5 uuid := uuid_generate_v4();
        _rule6 uuid := uuid_generate_v4();
        _rule7 uuid := uuid_generate_v4();
        _rule8 uuid := uuid_generate_v4();
        _rule9 uuid := uuid_generate_v4();
        _rule10 uuid := uuid_generate_v4();
        _rule11 uuid := uuid_generate_v4();
        _rule12 uuid := uuid_generate_v4();
        _rule13 uuid := uuid_generate_v4();
        _rule14 uuid := uuid_generate_v4();
        _rule15 uuid := uuid_generate_v4();
        _rule16 uuid := uuid_generate_v4();
        _rule17 uuid := uuid_generate_v4();
        _rule18 uuid := uuid_generate_v4();
        _rule19 uuid := uuid_generate_v4();
        _rule20 uuid := uuid_generate_v4();
        _rule21 uuid := uuid_generate_v4();
        _rule22 uuid := uuid_generate_v4();
        _rule23 uuid := uuid_generate_v4();
        _rule24 uuid := uuid_generate_v4();
        _rule25 uuid := uuid_generate_v4();
        _rule26 uuid := uuid_generate_v4();
        _rule27 uuid := uuid_generate_v4();
        _rule28 uuid := uuid_generate_v4();
        _rule29 uuid := uuid_generate_v4();
        _rule30 uuid := uuid_generate_v4();
        _rule31 uuid := uuid_generate_v4();
        _rule32 uuid := uuid_generate_v4();
        _rule33 uuid := uuid_generate_v4();
        _rule34 uuid := uuid_generate_v4();
        _rule35 uuid := uuid_generate_v4();
        _rule36 uuid := uuid_generate_v4();
        _rule37 uuid := uuid_generate_v4();
        _rule38 uuid := uuid_generate_v4();
        _rule39 uuid := uuid_generate_v4();
        _rule40 uuid := uuid_generate_v4();
        _rule41 uuid := uuid_generate_v4();
        _rule42 uuid := uuid_generate_v4();
        _rule43 uuid := uuid_generate_v4();
        _rule44 uuid := uuid_generate_v4();
        _rule45 uuid := uuid_generate_v4();
        _rule46 uuid := uuid_generate_v4();
        _rule47 uuid := uuid_generate_v4();
        _rule48 uuid := uuid_generate_v4();
        _rule49 uuid := uuid_generate_v4();
        _rule50 uuid := uuid_generate_v4();

BEGIN
INSERT INTO user_schema.rules (uuid, description, subject, action)
VALUES
    (_rule1, 'ROOT', 'ROOT', _view_action),
    (_rule2, 'ADMIN_USERS_ADMIN_MASTER_VIEW', 'ADMIN_USERS_ADMIN_MASTER', _view_action),
    (_rule3, 'ADMIN_USERS_ADMIN_MASTER_INSERT', 'ADMIN_USERS_ADMIN_MASTER', _insert_action),
    (_rule4, 'ADMIN_USERS_ADMIN_MASTER_UPDATE', 'ADMIN_USERS_ADMIN_MASTER', _update_action),

    (_rule5, 'ADMIN_USERS_EMPLOYEE_VIEW', 'ADMIN_USERS_EMPLOYEE', _view_action),
    (_rule6, 'ADMIN_USERS_EMPLOYEE_INSERT', 'ADMIN_USERS_EMPLOYEE', _insert_action),
    (_rule7, 'ADMIN_USERS_EMPLOYEE_UPDATE', 'ADMIN_USERS_EMPLOYEE', _update_action),

    (_rule8, 'PROFILES_ADMIN_MASTER_VIEW', 'PROFILES_ADMIN_MASTER', _view_action),
    (_rule9, 'PROFILES_EMPLOYEE_VIEW', 'PROFILES_EMPLOYEE', _view_action),

    (_rule10, 'CITIES_VIEW', 'CITIES', _view_action ),
    (_rule11, 'STATES_VIEW', 'STATES', _view_action),

    (_rule12, 'CUSTOMERS_VIEW', 'CUSTOMERS_VIEW', _view_action),
    (_rule13, 'CUSTOMERS_INSERT', 'CUSTOMERS_INSERT', _insert_action),
    (_rule14, 'CUSTOMERS_UPDATE', 'CUSTOMERS_UPDATE', _update_action)
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

INSERT INTO user_schema.profiles_rules (profile_uuid, rule_uuid)
VALUES
    -- ADMIN MASTER
    (_profile1, _rule1),
    (_profile1, _rule2),
    (_profile1, _rule3),
    (_profile1, _rule4),
    (_profile1, _rule8),
    (_profile1, _rule10),
    (_profile1, _rule11),
    (_profile1, _rule12),
    (_profile1, _rule13),
    (_profile1, _rule14),

    -- EMPLOYEE
    (_profile2, _rule1),
    (_profile2, _rule5),
    (_profile2, _rule6),
    (_profile2, _rule7),
    (_profile2, _rule9),
    (_profile2, _rule10),
    (_profile2, _rule11),
    (_profile2, _rule12)
;
END $$;
