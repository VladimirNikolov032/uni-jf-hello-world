import React, { useState, useEffect } from 'react';
import { getAllNotes, deleteNote } from '../../../core/api/notes.api';
import { NoteCard } from '../note-detail/NoteDetail';

const noteListStyle = {
    margin: '5px',
    flexWrap: 'wrap'
};

export function NotesList(props) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getAllNotes(searchParam).then((result) => {
            setNotes(result);
        });
    }, [props.location.search])

    const onDelete = (id) => {
        deleteNote(id).then(() => {
            setNotes((prevState) => {
                return prevState.filter(note => note.id !== id)
            })
        })
    };

    return (
        <div className="notes-list-container d-flex" style={noteListStyle}>
            { notes.map(note => <NoteCard note={note} key={note.id} onDeleteClick={onDelete} /> )}
        </div>
    );
}