import React from 'react';
import { getLoggedUser } from '../api/users.api';
import { Redirect } from 'react-router-dom';

export function UnAuthenticatedGuardRoute(props) {
    const loggedUser = getLoggedUser();
    
    if(!loggedUser) {
        return <props.component {... props} />
    }

    return <Redirect to="/" />;

}