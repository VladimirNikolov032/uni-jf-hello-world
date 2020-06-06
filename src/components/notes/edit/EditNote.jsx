import React, { useState, useEffect } from 'react';
import { saveNote, getNoteById } from '../../../core/api/notes.api';
import { Redirect } from 'react-router-dom';
import './EditNote.css';

export function EditNote(props) {

    const [currentNote, setCurrentNote] = useState({ title: '', content: '', authorId: '', authorName: '', date: '' });
    const [showRedirect, setShowRedirect] = useState(false);

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getNoteById(props.computedMatch.params.id).then((result) => {
                setCurrentNote(result.data);
            });
        }
    }, [props.computedMatch.params.id])

    const onInputChange = (event) => {
        event.persist();
        setCurrentNote((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onNoteSave = (event) => {
        event.preventDefault();
        saveNote(currentNote).then(() => {
            setShowRedirect(true);
        })
            .catch((err) => console.error(err));

    }

    return (
        <>
            {showRedirect && <Redirect to='/notes' />}
            <div className="note-edit-container">
                <form onSubmit={onNoteSave}>
                    <div className="note-edit-form">
                        <div className="form-group">
                            <label labelfor="title">Title: </label>
                            <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={currentNote.title} />
                        </div>
                        <div className="form-group">
                            <label labelfor="content">Content: </label>
                            <textarea className="form-control" id="content" name="content" onChange={onInputChange} value={currentNote.content} />
                        </div>
                        <div className="form-group">
                            <label lablefor="status">Status: </label>
                            <select className="form-control" id="status" name="status" onChange={onInputChange} value={currentNote.status}>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <button className="btn btn-primary">Save note</button>
                    </div>
                </form>
            </div>
        </>
    )
}