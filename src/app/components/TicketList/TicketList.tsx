import React, { useState, useEffect } from 'react';
import { getTickets, getUsers, Ticket, User } from '../../apiService';
import { Link } from 'react-router-dom';
import './TicketList.css';

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [status, setStatus] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    setIsLoading(true);
    getTickets()
      .then((response) => setTickets(response.data))
      .catch((error) => console.error('Error fetching tickets:', error))
      .finally(() => setIsLoading(false));


    getUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      (status === '' || ticket.status === status)
  );

  if (tickets.length === 0) return;

  return (
    <div className="container">
      <h1>Tickets</h1>
      <div className='search-bar'>
        <select value={status} className="status-select">
          <option value="">All</option>
          {users.map(user => {
            return (
              <option value={user.id}>{user.firstName}{user.lastName}</option>
            )
          })}
        </select>
        <select value={status} onChange={handleStatusChange} className="status-select">
          <option value="">All</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
          <option value="unassigned">Unassigned</option>
        </select>
      </div>

      {
        isLoading
          ? <div>Loading...</div>
          : <ul className="ticket-list">
            {filteredTickets.map((ticket) => {
              const { user, status, id, number } = ticket
              const { firstName, lastName } = user
              return (
                <li key={id}>
                  <Link
                    className='ticket-item'
                    to={`/ticket/${id}`}>{number}
                    {status !== 'unassigned' && <span style={{ flexGrow: 1 }}>{firstName} {lastName}</span>}
                    <span className={`ticket-status ${status}`}>{status}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
      }
    </div>
  );
};

export default TicketList;
