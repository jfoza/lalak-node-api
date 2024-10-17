CREATE OR REPLACE FUNCTION user_schema.get_user_abilities(_user_uuid UUID)
    RETURNS TABLE (
                      uuid UUID,
                      description VARCHAR,
                      subject VARCHAR,
                      action VARCHAR,
                      profile_active BOOLEAN,
                      ability_active BOOLEAN
                  ) AS $$
BEGIN
    RETURN QUERY
        SELECT DISTINCT
            ur.uuid,
            ur.description,
            ur.subject,
            ur.action,
            up.active AS profile_active,
            ur.active AS ability_active
        FROM user_schema.abilities ur
                 JOIN user_schema.profiles_abilities upr ON ur.uuid = upr.ability_uuid
                 JOIN user_schema.profiles up ON upr.profile_uuid = up.uuid
                 JOIN user_schema.users uu ON up.uuid = uu.profile_uuid
        WHERE uu.uuid = _user_uuid
          AND ur.active = true
          AND up.active = true
        GROUP BY ur.uuid, up.active;
END;
$$ LANGUAGE plpgsql;