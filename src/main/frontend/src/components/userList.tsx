import React from 'react';
import { getUsers } from '../api/userService';
import { UserDTO } from '../models/userdto';

const UserList: React.FC = () => {
    const [users, setUsers] = React.useState<UserDTO[]>([]);

    React.useEffect(() => {
        const UsersFromDB = async () => {
            const usersData = await getUsers();
            setUsers(usersData);
        };

        UsersFromDB().catch(console.error);
    }, []);

    return (
        <div>
            <h2>Users</h2>
            {users.length > 0 ? (
                users.map(user => (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user.clerkId}</p>
                    </div>
                ))
            ) : (
                <p>No users found</p>
            )}
        </div>
    )
}

export default UserList