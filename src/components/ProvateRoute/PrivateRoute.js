import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext, UserInfoContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    loggedInUser.email ? (
                    children
                    ) : (
                    <Redirect
                        to={{
                        pathname: "/login",
                        state: { from: location }
                        }}
                    />
                    )
                }
            />
        </div>
    );
};

export default PrivateRoute;