import React, { useState } from "react";
import getAllUsers, { User } from "../services/api";
import UsersList from "../components/UsersList";

export default function UsersScreen() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    async function fetchUsers() {
        setLoading(true);
        const results = await getAllUsers();
        setUsers(results);
        setLoading(false);
    }
    return (
        <div className="App">
            <h1>Naive Users Screen</h1>
            <button type="button" onClick={fetchUsers}>Fetch Users</button>
            {loading && <h1>loading ...</h1>}
            {!loading && <UsersList users={users} />}
        </div>
    );
}
