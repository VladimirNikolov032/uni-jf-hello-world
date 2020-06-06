import React, { useState } from 'react';
import { logout } from '../../../core/api/users.api';
import { Redirect } from 'react-router-dom';

const logOutBtnStyles = {
    cursor: 'pointer',
    border: 'solid 1px',
    padding: '5px',
    margin: '5px',
    color: 'black',
    position: 'absolute',
    right: 928
     
}
const styles = { 
    backgroundColor: 'lightgray',
    height: '45px',
    width: '100%',
    position: 'fixed',
    bottom: 0
};

export function Footer() {
    const [isLoggedOut, setLogoutFlag] = useState(false);

    const onLogout = (event) => {
        logout();
        setLogoutFlag(true);

    }

    return(
        <>
        { isLoggedOut && <Redirect to="/loginUser" /> }
       <div className="footer" style={styles}>
            <span className="logout-btn" style={logOutBtnStyles} onClick={onLogout}>Logout</span>
       </div>
       </>  
    );
}