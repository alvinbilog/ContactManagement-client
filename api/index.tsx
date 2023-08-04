import axios from 'axios';
import { ContactInterface, UpdateContactInterface } from '../types';

const awsServer = 'http://3.144.254.102:8000/contacts';

export const fetchContacts = async (): Promise<ContactInterface[]> => {
  const res = await axios.get(`${awsServer}/get-all`);
  return res.data.data;
};
// test email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const addContacts = async (
  name: string,
  address: string,
  email: string,
  number: string
): Promise<ContactInterface | undefined> => {
  try {
    //required fields validation
    if (!name || !email) {
      throw new Error('Please fill in the required fields');
    }
    // email validation
    if (!isValidEmail(email)) {
      throw new Error('Please enter a valid email address.');
    }

    const res = await axios.post('${awsServer}/create', {
      // id: new Date(),
      name,
      address,
      email,
      number,
    });
    const newContacts = await res.data;
    return newContacts;
  } catch (err: any) {
    console.log(err.message);
    throw new Error('Failed to add contacts.');
  }
};
export const updateContact = async (
  id: string,
  name: string,
  address: string,
  email: string,
  number: string
): Promise<UpdateContactInterface> => {
  try {
    const res = await axios.put(`${awsServer}/update/${id}`, {
      name,
      address,
      email,
      number,
    });
    const newData = await res.data;
    return newData;
  } catch (e: any) {
    console.log(e.message);
    throw new Error('Failed to edit contact.');
  }
};

export const deleteContact = async (id: string) => {
  try {
    const res = await axios.delete(`${awsServer}/delete/${id}`);

    // queryClient.invalidateQueries({ queryKey: ['contacts'] });
    return res.data;
  } catch (e: any) {
    console.log(e.message);
  }
};
