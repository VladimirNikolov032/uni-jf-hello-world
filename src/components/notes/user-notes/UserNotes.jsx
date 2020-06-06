import React, { useState, useEffect } from 'react';
import { NoteCard } from '../note-detail/NoteDetail';
import { getUserNotes } from '../../../core/api/notes.api';

const listUserNotesStyles = {
    display: 'flex',
    flexWrap: 'wrap'
}

export function UserNotes(props) {

    const [userNotes, setUserNotes] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getUserNotes(searchParam).then((notes) => {
            setUserNotes(notes);
        });
    }, [props.location.search]);
    
    return (
        <div className="user-notes-container" style={listUserNotesStyles}>
            { userNotes.map(note => <NoteCard note={note} key={note.id} /> ) }
        </div>
    )
}