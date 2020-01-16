import React from "react";
import { User } from "../services/api";

const Users: React.FC<{users: User[]}> = ({ users }: {users: User[] }) => (
    <ul>
        {users.map((user: User) => <li key={user.id}>{user.name}</li>)}
    </ul>
);

export default Users;
