import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser, User } from '../../apiService';
import './UserDetails.css';

const UserDetails: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<Partial<User>>({});

    useEffect(() => {
        getUser(Number(userId))
            .then((response) => {
                setUser(response.data);
                setFormData(response.data);
            })
            .catch((error) => console.error('Error fetching user:', error));
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(Number(userId), formData)
            .then((response) => {
                setUser(response.data);
                alert('User updated successfully');
            })
            .catch((error) => console.error('Error updating user:', error));
    };

    const handleDelete = () => {
        deleteUser(Number(userId))
            .then(() => {
                alert('User deleted successfully');
                navigate('/users');
            })
            .catch((error) => console.error('Error deleting user:', error));
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>Edit User Details</h1>
            <div className='user-details'>
                <img className="user-image" src={formData.image || ''} />
                <form onSubmit={handleSubmit} className="user-form">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type="text"
                            id="dob"
                            name="dob"
                            value={(new Date((formData.dob || '').toString()).toDateString())}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-footer">
                        <button type="submit" className="save-button">Save</button>
                        <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserDetails;
