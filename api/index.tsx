import axios from 'axios';
import { ContactInterface, EditContactInterface } from '../types';

export const fetchContacts = async (): Promise<ContactInterface[]> => {
  const res = await axios.get('http://localhost:8000/contacts/get-all');
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

    const res = await axios.post('http://localhost:8000/contacts/create', {
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
  _id: string,
  name: string,
  address: string,
  email: string,
  number: string
): Promise<EditContactInterface> => {
  try {
    console.log(_id);
    const res = await axios.put(
      `http://localhost:8000/contacts/update/${_id}`,
      {
        name,
        address,
        email,
        number,
      }
    );
    const updatedData = await res.data;
    return updatedData;
  } catch (e: any) {
    console.log(e.message);
    throw new Error('Failed to edit contact.');
  }
};

export const deleteContact = async (id: string) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/contacts/delete/${id}`
    );

    // queryClient.invalidateQueries({ queryKey: ['contacts'] });
    return res.data;
  } catch (e: any) {
    console.log(e.message);
  }
};
