import React from 'react';
import { Switch } from 'react-router-dom';
import {  UsersList } from "../../users/users-list/UsersList";
import { User } from '../../users/user/User';
import { AuthenticatedGuardRoute } from '../../../core/vanGuards/AuthenticationGuardRoute';
import { UserEdit } from '../../users/user-edit/UserEdit';
import { NotesList } from '../../notes/notes-list/NotesList';
import { EditNote } from '../../notes/edit/EditNote';
import { UserNotes } from '../../notes/user-notes/UserNotes';

export function Main({ count }) {   
    return(
        <div className="main-content">
            <Switch>
                <AuthenticatedGuardRoute exact path="/users" component={UsersList} />   
                <AuthenticatedGuardRoute exact path="/users/create" admin= {true} component={UserEdit} />
                <AuthenticatedGuardRoute exact path="/users/:id" component={User} />
                <AuthenticatedGuardRoute exact path="/users/edit/:id" admin={true} component={UserEdit} /> 

                <AuthenticatedGuardRoute exact path="/notes" component={NotesList} /> 
                <AuthenticatedGuardRoute exact path="/notes/user-notes" component={UserNotes} />     
                <AuthenticatedGuardRoute exact path="/notes/create" component={EditNote} />
                <AuthenticatedGuardRoute exact path="/notes/edit/:id" component={EditNote} /> 
            </Switch>
        </div>
    );
}

