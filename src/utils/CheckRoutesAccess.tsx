import axios from "axios";
import React, { lazy, useEffect, useState } from "react";
import SpinnerRoller from "../components/spinner/SpinnerRoller";
import { BASE_URL } from "../constant/base-urls";
const UnauthorizedPage = lazy(() => import("../pages/UnauthorizePage"));

type propTypes = {
    permission: string;
    component: JSX.Element | any;
};

const CheckRouteAccess = (props: propTypes) => {
    const { permission, component: Component } = props
    const [hasAccess, setHasAccess] = useState(false);
    const [checkingAccess, setCheckingAccess] = useState(true);
    const token = localStorage.getItem("token")

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/checkAccess/check-admin-access/${permission}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data.isAuthorize) {
                    setHasAccess(true);
                } else {
                    setHasAccess(false);
                }
            } catch (error) {
                setHasAccess(false);
            }

            setCheckingAccess(false);
        };

        checkAccess();
    }, [permission, token]);




    if (checkingAccess) {
        return <SpinnerRoller />;
    }

    if (hasAccess) {
        return <Component />;
    }

    return <UnauthorizedPage />;

    // const ReturnedComponent = useMemo(() => {
    //   let result;

    //   if (checkingAccess) {
    //     result = <SearchButtonSpinner />;
    //   } else {
    //     if (hasAccess) {
    //       result = expectedComponent;
    //     } else {
    //       result = UnauthorizedPage;
    //     }
    //   }

    //   return result;
    // }, [hasAccess, checkingAccess, expectedComponent]);
    // return <ReturnedComponent role={role} />;
};

export default CheckRouteAccess;
