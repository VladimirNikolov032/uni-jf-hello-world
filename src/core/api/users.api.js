import axios from 'axios';
import { deleteNotesForAuthor } from './notes.api';

const urlApi = "http://localhost:3005";

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}

export async function getAllUsers(params) {
    const allUsers = (await axios.get(`${urlApi}/users`)).data;
    
    if(!params)
        return  allUsers;
        const lowerCaseParameter = params.toLowerCase();
    return allUsers.filter(user => user.name.toLowerCase().includes(lowerCaseParameter) || user.email.toLowerCase().includes(lowerCaseParameter));
}

export function getUserById(id) {
    return axios.get(`${urlApi}/users/${id}`);
}

export async function register(userData) {
     const users = await getAllUsers();

    if(users.find(u => u.email === userData.email)) {
        throw new Error ('This Email already exists!!');
    }

    userData = {
        ...userData,
        isActive: true,
        isAdmin: false,
        picture: "http://picsum.photos/200/300?random-5"

    }
    return axios.post(`${urlApi}/users`, userData);
}

export async function loginUser(userData) {
    const users = await getAllUsers();
    
    const loggedUser = users.find(u => u.email === userData.email && u.password.toString() === userData.password);

    if(loggedUser && !loggedUser.isActive) {
        throw new Error('The current user is being blocked!');
    }

    if(loggedUser) {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        return;
    }

    throw new Error('Incorrect username/password');
}

export function logout() {
    localStorage.removeItem('loggedUser');
}

export function saveUser(userData) {
    if (userData.id) {
        return axios.put(`${urlApi}/users/${userData.id}`, userData);
    }

    return register(userData);
}

export function deleteUser(id) {
    deleteNotesForAuthor(id);
    return axios.delete(`${urlApi}/users/${id}`);
}