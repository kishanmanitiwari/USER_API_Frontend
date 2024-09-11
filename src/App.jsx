import React, { useState } from 'react';
import { API_URL } from './utils/constants';
import axios from 'axios';

const App = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState({
        getId: '',
        postId: '',
        putId: '',
        patchId: '',
        deleteId: ''
    });
    const [userData, setUserData] = useState({});
    const [appId, setAppId] = useState('');
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        job_title: ''
    });
    const [updateData, setUpdateData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        job_title: ''
    });
    const [response, setResponse] = useState('');

    // Get all users
const getUsers = async () => {
    try {
        const res = await axios.get(API_URL);
        setUsers(res.data.data);
    } catch (error) {
        console.error('Error fetching users:', error);
        setResponse(`Error fetching users: ${error.message}`);
    }
};

// Get user by ID
const getUserById = async () => {
    try {
        const res = await axios.get(`${API_URL}/${userId.getId}`);
        setUserData(res.data);
        setUserId((prev) => ({ ...prev, getId: '' }));
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        setResponse(`Error fetching user by ID: ${error.message}`);
    }
};

// Create a new user
const postUser = async () => {
    try {
        const res = await axios.post(API_URL, newUser, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                appid: appId
            }
        });
        setResponse(`User created: ${JSON.stringify(res.data)}`);
        setNewUser({ first_name: '', last_name: '', gender: '', email: '', job_title: '' });
        setAppId('');
    } catch (error) {
        console.error('Error creating user:', error);
        setResponse(`Error creating user: ${error.message}`);
    }
};

// Update user (PUT)
const putUser = async () => {
    try {
        const res = await axios.put(`${API_URL}/${userId.putId}`, updateData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                appid: appId
            }
        });
        setResponse(`User updated: ${JSON.stringify(res.data)}`);
        setAppId('');
        setUpdateData({ first_name: '', last_name: '', gender: '', email: '', job_title: '' });
    } catch (error) {
        console.error('Error updating user:', error);
        setResponse(`Error updating user: ${error.message}`);
    }
};

// Partially update user (PATCH)
const patchUser = async () => {
    try {
        const res = await axios.patch(`${API_URL}/${userId.patchId}`, updateData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                appid: appId
            }
        });
        setResponse(`User partially updated: ${JSON.stringify(res.data)}`);
        setAppId('');
        setUpdateData({ first_name: '', last_name: '', gender: '', email: '', job_title: '' });
    } catch (error) {
        console.error('Error partially updating user:', error);
        setResponse(`Error partially updating user: ${error.message}`);
    }
};

// Delete user
const deleteUser = async () => {
    try {
        const res = await axios.delete(`${API_URL}/${userId.deleteId}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                appid: appId
            }
        });
        setResponse(`User deleted: ${JSON.stringify(res.data)}`);
        setUserId((prev) => ({ ...prev, deleteId: '' }));
        setAppId('');
    } catch (error) {
        console.error('Error deleting user:', error);
        setResponse(`Error deleting user: ${error.message}`);
    }
};

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">User API UI</h1>

                {/* Get All Users */}
                <div className="mb-6">
                    <button
                        onClick={getUsers}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Get All Users
                    </button>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-semibold mb-2">Users</h2>
                        <pre className="whitespace-pre-wrap">{JSON.stringify(users, null, 2)}</pre>
                    </div>
                </div>

                {/* Get User by ID */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Get User by ID</h2>
                    <input
                        type="text"
                        value={userId.getId}
                        onChange={(e) => setUserId({ ...userId, getId: e.target.value })}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={getUserById}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                    >
                        Get User
                    </button>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <pre className="whitespace-pre-wrap">{JSON.stringify(userData, null, 2)}</pre>
                    </div>
                </div>

                {/* Create User */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Create User</h2>
                    <input
                        type="text"
                        value={newUser.first_name}
                        onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                        placeholder="First Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={newUser.last_name}
                        onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                        placeholder="Last Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={newUser.gender}
                        onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                        placeholder="Gender"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={newUser.job_title}
                        onChange={(e) => setNewUser({ ...newUser, job_title: e.target.value })}
                        placeholder="Job Title"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                        placeholder="API KEY"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={postUser}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Create User
                    </button>
                </div>

                {/* Update User (PUT) */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Update User (PUT)</h2>
                    <input
                        type="text"
                        value={userId.putId}
                        onChange={(e) => setUserId({ ...userId, putId: e.target.value })}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.first_name}
                        onChange={(e) => setUpdateData({ ...updateData, first_name: e.target.value })}
                        placeholder="First Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.last_name}
                        onChange={(e) => setUpdateData({ ...updateData, last_name: e.target.value })}
                        placeholder="Last Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.gender}
                        onChange={(e) => setUpdateData({ ...updateData, gender: e.target.value })}
                        placeholder="Gender"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="email"
                        value={updateData.email}
                        onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.job_title}
                        onChange={(e) => setUpdateData({ ...updateData, job_title: e.target.value })}
                        placeholder="Job Title"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                        placeholder="API KEY"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={putUser}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
                    >
                        Update User
                    </button>
                </div>

                {/* Partial Update User (PATCH) */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Partial Update User (PATCH)</h2>
                    <input
                        type="text"
                        value={userId.patchId}
                        onChange={(e) => setUserId({ ...userId, patchId: e.target.value })}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.first_name}
                        onChange={(e) => setUpdateData({ ...updateData, first_name: e.target.value })}
                        placeholder="First Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.last_name}
                        onChange={(e) => setUpdateData({ ...updateData, last_name: e.target.value })}
                        placeholder="Last Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.gender}
                        onChange={(e) => setUpdateData({ ...updateData, gender: e.target.value })}
                        placeholder="Gender"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="email"
                        value={updateData.email}
                        onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.job_title}
                        onChange={(e) => setUpdateData({ ...updateData, job_title: e.target.value })}
                        placeholder="Job Title"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                        placeholder="API KEY"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={patchUser}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
                    >
                        Partial Update User
                    </button>
                </div>

                {/* Delete User */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Delete User</h2>
                    <input
                        type="text"
                        value={userId.deleteId}
                        onChange={(e) => setUserId({ ...userId, deleteId: e.target.value })}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                     <input
                        type="text"
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                        placeholder="API KEY"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={deleteUser}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                    >
                        Delete User
                    </button>
                </div>

                {/* Response Display */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Response</h2>
                    <pre className="whitespace-pre-wrap">{response}</pre>
                </div>
            </div>
        </div>
    );
};

export default App;
