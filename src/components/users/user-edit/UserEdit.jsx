import React, { useState, useEffect } from 'react';
import './UserEdit.css';
import { getUserById, saveUser } from '../../../core/api/users.api';
import { Redirect } from 'react-router-dom';

export function UserEdit(props) {
    console.log(props);

    const [editedUser, setEditedUser] = useState({name: '', age: 0, email: '', password: '', isAdmin: false, isActive: false });
    const [showRedirect, setShowRedirect] = useState(false);
    const [errorMs, setErrorMs] = useState('');

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getUserById(props.computedMatch.params.id).then((currentUser) => {
                console.log(currentUser);
                setEditedUser(currentUser.data);
            });
        }
    }, [props.computedMatch.params.id]);

    const onInputChange = (event) => {
        event.persist();
        
        setEditedUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        if(errorMs) {
            setErrorMs('');
        }
    }

    const onCheckBoxChange = (event) => {
        event.persist();

        setEditedUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.checked
        }))
        
        if(errorMs) {
            setErrorMs('');
        }
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        saveUser(editedUser).then(() => {
            console.log('SUCCESS');
            setShowRedirect(true);
        })
        .catch((err) => setErrorMs(err.message));
    }

    return (
        <>
        { showRedirect && <Redirect to='/users' /> }
        <div className="user-edit-wrapper">
            <form className="user-edit-form" onSubmit={onFormSubmit}>
            { errorMs && <span className="text-danger">{errorMs}</span>}
                <div className="form-group">
                    <label labelfor="name">Name: </label>
                    <input type="text" name="name" id="name" className="form-control" onChange={onInputChange} value={editedUser.name}/>
                </div>
                <div className="form-group">
                    <label labelfor="age">Age: </label>
                    <input type="number" name="age" id="age" className="form-control" onChange={onInputChange} value={editedUser.age} />
                </div>
                <div className="form-group">
                    <label labelfor="email">Email: </label>
                    <input type="text" name="email" id="email" className="form-control" onChange={onInputChange} value={editedUser.email} />
                </div>
                <div className="form-group">
                    <label labelfor="password">Password: </label>
                    <input type="password" name="password" id="password" className="form-control" onChange={onInputChange} value={editedUser.password} />
                </div>
                <div className="form-group">
                    <label labelfor="isActive">Is Active: </label>
                    <input type="checkbox" name="isActive" id="isActive" className="form-control" onChange={onCheckBoxChange} checked={editedUser.isActive} />
                </div>
                <div className="form-group">
                    <label labelfor="isAdmin">Is Admin: </label>
                    <input type="checkbox" name="isAdmin" id="isAdmin" className="form-control" onChange={onCheckBoxChange} checked={editedUser.isAdmin} />
                </div>
                <button className="btn btn-dark">Save User</button>
            </form>
        </div>
        </>
    )
}