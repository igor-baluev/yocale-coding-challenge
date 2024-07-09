import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3004';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  image: string;
}

export interface Ticket {
  id: number;
  userId?: number;
  number: string;
  status: string;
  user: User;
}
export const getUsers = (searchText?: string): Promise<AxiosResponse<User[]>> => {
  const url = searchText ? `${API_URL}/users?q=${searchText}` : `${API_URL}/users`;
  return axios.get<User[]>(url);
};
export const getUser = (userId: number): Promise<AxiosResponse<User>> => axios.get<User>(`${API_URL}/users/${userId}`);
export const updateUser = (userId: number, data: Partial<User>): Promise<AxiosResponse<User>> => axios.put<User>(`${API_URL}/users/${userId}`, data);
export const deleteUser = (userId: number): Promise<AxiosResponse<void>> => axios.delete<void>(`${API_URL}/users/${userId}`);

export const getTickets = (): Promise<AxiosResponse<Ticket[]>> => {
  return axios.get<Ticket[]>(`${API_URL}/tickets?_expand=user`);
};
export const getTicket = (ticketId: number) => axios.get<Ticket>(`${API_URL}/tickets/${ticketId}`);
export const createTicket = (data: Partial<Ticket>) => axios.post<Ticket>(`${API_URL}/tickets`, data);
export const updateTicket = (ticketId: number, data: Partial<Ticket>) => axios.put<Ticket>(`${API_URL}/tickets/${ticketId}`, data);
