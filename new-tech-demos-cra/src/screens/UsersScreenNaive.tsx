import React, { useState } from "react";
import getAllUsers, { User } from "../services/api";

const Users: React.FC<{users: User[]}> = ({ users }: {users: User[] }) => (
    <ul>
        {users.map((user: User) => <li key={user.id}>{user.name}</li>)}
    </ul>
);
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
          <div>
              <h1>Naive Users Screen</h1>
              <button type="button" onClick={fetchUsers}>Fetch Users</button>
              {loading && <h1>loading ...</h1>}
              {!loading && <Users users={users} />}
          </div>
          <div>
              <Users users={[]} />
          </div>
      </div>
  );
}
