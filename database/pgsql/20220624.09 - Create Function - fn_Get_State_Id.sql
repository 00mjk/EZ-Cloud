-- =============================================
-- Author:		Tony Massé
-- Create date: 2022-06-24
-- Modified on: 2022-08-03 - To add better logging
-- Description:	Return the StateID for a given StateName
-- =============================================

RAISE NOTICE '% - Create/Update Function "fn_Get_State_Id" ownership and indices, if necessary.', clock_timestamp()::TEXT;
DROP FUNCTION IF EXISTS public."fn_Get_State_Id";

CREATE FUNCTION public."fn_Get_State_Id" 
(
    IN "@stateName" character varying
)
RETURNS int
LANGUAGE plpgsql
AS $BODY$
BEGIN
    RETURN COALESCE(
        (
            SELECT
                "id"
            FROM 
                public."states"
            WHERE
                "name" = "@stateName"
            LIMIT 1
        )
        , 0 -- Default to 0 / Disabled
    );
END;
$BODY$;


