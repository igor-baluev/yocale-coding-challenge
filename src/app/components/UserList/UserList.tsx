import React, { useState, useEffect } from 'react';
import { getUsers, User } from '../../apiService';
import './UserList.css';
import { Link } from 'react-router-dom';

const UserList: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers(searchText)
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Error fetching users:', error));
    }, [searchText]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="container">
            <h1>Users</h1>
            <input
                type="text"
                placeholder="Filter users"
                value={searchText}
                onChange={handleSearchChange}
                className="search-input"
            />
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id}>
                        <Link className='user-item' to={`/user/${user.id}`}>
                            {user.firstName} {user.lastName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
