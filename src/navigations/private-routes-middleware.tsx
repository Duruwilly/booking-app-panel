import React, { Suspense } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SpinnerRoller from '../components/spinner/SpinnerRoller';
import { RootState } from '../redux/store';

type propType = {
    Component: React.FC<{ permission?: string; }>;
    Layout: React.FC<{
        children: JSX.Element;
    }>;
    isAuthProtected: boolean;
    ifAuthenticatedRedirect: boolean;
    permission?: string;
};

const AuthMiddleware = ({ Component, Layout,
    isAuthProtected,
    ifAuthenticatedRedirect,
    permission }: propType): JSX.Element => {
    // Come back here to add the loggedIn status
    // let { authenticated } = useSelector((state: RootState) => state.authReducer);
    const user_id = localStorage.getItem("user_id");

    if (isAuthProtected && !user_id) {
        return <Navigate to="/" />;
    }

    if (user_id && ifAuthenticatedRedirect) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <Layout>
            <Suspense fallback={<SpinnerRoller />}>
                <Component permission={permission} />
            </Suspense>
        </Layout>
    )
}

export default AuthMiddleware