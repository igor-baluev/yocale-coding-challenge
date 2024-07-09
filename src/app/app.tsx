import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from './components/UserList/UserList';
import UserDetails from './components/UserDetails/UserDetails';
import TicketList from './components/TicketList/TicketList';
import TicketDetails from './components/TicketDetails/TicketDetails';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/tickets" replace />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/user/:userId" element={<UserDetails />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/ticket/:id" element={<TicketDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
