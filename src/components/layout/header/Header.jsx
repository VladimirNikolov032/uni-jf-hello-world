import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { logout } from '../../../core/api/users.api';

const logOutBtnStyles = {
    cursor: 'pointer',
    border: 'solid 1px',
    padding: '5px',
    margin: '5px',
    color: 'lightgrey'
     
}

export const Header = withRouter((props) => {
console.log('Header PROPSUU |(*≧▽≦*)/', props);
const [isLoggedOut, setLogoutFlag] = useState(false);
const [searchParam, setSearchParam] = useState('');

    const onLogout = (event) => {
        logout();
        setLogoutFlag(true);

    }

    const onSearchChange = (event) => {
        event.persist();
        setSearchParam(event.target.value);
    }

    const onSearchClick = (event) => {
        event.preventDefault();
        const pathNameUrl = props.location.pathname.substr(1);

        const historyObject = {pathname: `/${pathNameUrl}`};
        if (searchParam) {
            historyObject['search'] = `?p=${searchParam}`;
        }
        props.history.push(historyObject);
    }

    return(
        <>
        { isLoggedOut && <Redirect to="/loginUser" /> }
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {/* <a className="navbar-brand">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users/create">Create User</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/notes">All Notes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/notes/user-notes">My Notes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/notes/create">Create new Note</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0" onSubmit={onSearchClick}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={onSearchChange}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <span className="logout-btn" style={logOutBtnStyles} onClick={onLogout}>Logout</span>
            </div>
        </nav>
        </>
    );
})