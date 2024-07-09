import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTicket, getUsers, updateTicket, User, Ticket } from '../../apiService';
import './TicketDetails.css';

const TicketDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    getTicket(Number(id))
      .then((response) => {
        setTicket(response.data);
        setStatus(response.data.status);
        setSelectedUser(response.data.userId ? response.data.userId.toString() : '')
      })
      .catch((error) => console.error('Error fetching ticket:', error));

    getUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));

  }, [id]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleUpdate = () => {
    updateTicket(Number(id), { ...ticket, userId: Number(selectedUser), status })
      .then((response) => {
        alert('Ticket updated successfully');
        setTicket(response.data)
      })
      .catch((error) => console.error('Error updating ticket:', error));
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{ticket.number}</h1>

      <div className="form-group">
        <select value={selectedUser} onChange={handleUserChange} className="select-input">
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <select value={status} onChange={handleStatusChange} className="select-input">
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
          <option value="unassigned">Unassigned</option>
        </select>
      </div>
      <button onClick={handleUpdate} className="update-button">Update</button>
    </div>
  );
};

export default TicketDetails;
