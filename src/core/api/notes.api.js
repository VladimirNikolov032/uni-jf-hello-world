import axios from 'axios';
import { getLoggedUser } from './users.api';

export const NoteStatus = {
    Active: 'Active',
    Pending: 'Pending',
    Done: 'Done'
}

const urlApi ='http://localhost:3005'

export async function getAllNotes(searchParam) {
    const allNotes = (await axios.get(`${urlApi}/notes`)).data;

    if(!searchParam)
        return allNotes;

    const lowerCaseParameter = searchParam.toLowerCase();
    return allNotes.filter(note => note.title.toLowerCase().includes(lowerCaseParameter) || note.content.toLowerCase().includes(lowerCaseParameter));
}

export function saveNote(noteData) {
    const loggedUser = getLoggedUser();

    if (noteData.id) {
        return axios.put(`${urlApi}/notes/${noteData.id}`, noteData);

    }

    noteData.authorId = loggedUser.id;
    noteData.authorName = loggedUser.name;
    noteData.date = new Date();
    if(!noteData.status)
        noteData.status = NoteStatus.Active;

    return axios.post(`${urlApi}/notes`, noteData)
}

export function getNoteById(id) {
    return axios.get(`${urlApi}/notes/${id}`);
}

export async function getNotesByAuthorId(authorId, searchParam) {
    const allNotes = await getAllNotes(searchParam);

    return allNotes.filter(note => note.authorId === authorId);
}

export function getUserNotes(searchParam) {
    const loggedUserId = getLoggedUser().id;

    return getNotesByAuthorId(loggedUserId, searchParam);
}

export function deleteNote(id) {
    return axios.delete(`${urlApi}/notes/${id}`);
}

export async function deleteNotesForAuthor(authorId) {
    const notes = await getNotesByAuthorId(authorId);

    notes.forEach(note => {
        deleteNote(note.id);
    });
}