'use client'; // This is a client component 👈🏽

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  // useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import {
  addContacts,
  deleteContact,
  updateContact,
  fetchContacts,
} from '../../../api';
import React from 'react';

import { ContactInterface, UpdateContactInterface } from '../../../types';

const queryClient = new QueryClient();
const queryKeys = { CONTACTS: 'contacts' };

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Contacts />
    </QueryClientProvider>
  );
};
export default App;

const Contacts = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [data, setData] = useState({});
  const [blur, setBlur] = useState('blur-none');
  const [modalOpen, setModalOpen] = useState(false);

  //create
  const addContactMutation = useMutation({
    mutationFn: (contactData: {
      name: string;
      address: string;
      email: string;
      number: string;
    }) =>
      addContacts(
        contactData.name,
        contactData.address,
        contactData.email,
        contactData.number
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CONTACTS] });
    },
    onSettled: () => {
      setName('');
      setAddress('');
      setEmail('');
      setNumber('');
    },
  });

  //edit
  function editHandler(contact: any) {
    setBlur('blur-md');
    setModalOpen(true);
    setName(contact.name);
    setAddress(contact.address), setEmail(contact.email);
    setNumber(contact.number);
  }
  // async function updateContact(contact: any) {
  //   try {
  //     console.log('old');
  //     console.log(contact._id);
  //     const res = await fetch(
  //       `http://localhost:8000/contacts/update/${contact._id}`,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           name: name,
  //           address: address,
  //           email: email,
  //           number: number,
  //         }),
  //       }
  //     );
  //     const newContacts = await res.json();
  //     console.log('new');
  //     console.log(newContacts);

  //     setName('');
  //     setAddress('');
  //     setEmail('');
  //     setNumber('');
  //     return newContacts;
  //   } catch (e: any) {
  //     console.log(e.message);
  //   }
  // }
  const updateContactMutation = useMutation({
    mutationFn: (contactData: {
      id: string;
      name: string;
      address: string;
      email: string;
      number: string;
    }) =>
      updateContact(
        contactData.id,
        contactData.name,
        contactData.address,
        contactData.email,
        contactData.number
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CONTACTS] });
    },
  });

  //delete
  const deleteContactMutation = useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CONTACTS] });
    },
  });

  const {
    isLoading,
    isError,
    error,
    data: contacts,
    // } = useQuery<boolean, any, any, any>({
  } = useQuery<ContactInterface[], Error>({
    queryKey: [queryKeys.CONTACTS],
    queryFn: fetchContacts,
  });

  return (
    <div>
      <div className={`${blur}`}>
        <h1 className="text-5xl mt-10 flex justify-center">Contacts</h1>
        <form className="flex justify-center mt-10">
          <div className="flex flex-col">
            <div className="">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 text: rounded-md outline-none pl-1 w-64"
                placeholder="Name"
              />
            </div>
            <div>
              <input
                type="text"
                value={address}
                className="mb-4 text: rounded-md outline-none pl-1 w-64"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                required
                value={email}
                className="mb-4 text: rounded-md outline-none pl-1 w-64"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={number}
                className="mb-4 text: rounded-md outline-none pl-1 w-64"
                placeholder="Number"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="rounded-lg w-20 bg-black text-white"
                type="submit"
                onClick={(e: any) => {
                  e.preventDefault();
                  addContactMutation.mutate({ name, address, email, number });
                }}
              >
                Add
              </button>
            </div>
          </div>
        </form>

        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="flex justify-center mt-8 w-100">
            <table className="table-fixed ">
              <thead>
                <tr>
                  <th className="w-40">Name</th>
                  <th className="w-60">Adress</th>
                  <th className="w-56">Email</th>
                  <th className="w-36">Number</th>
                </tr>
              </thead>

              <tbody>
                {contacts?.map((contact: ContactInterface) => (
                  <tr key={contact._id}>
                    <td className="text-left p-3  ">{contact.name}</td>
                    <td className="text-left p-3">{contact.address}</td>
                    <td className="text-left p-3">{contact.email}</td>
                    <td className="text-left p-3">{contact.number}</td>
                    <td>
                      <button
                        className="ml-2 rounded-lg  px-3 py-0.5 bg-emerald-200 "
                        onClick={() => {
                          editHandler(contact);
                          // editContactMutation.mutate(contact._id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="ml-2 rounded-lg  px-3 py-0.5 bg-rose-400"
                        onClick={() =>
                          deleteContactMutation.mutate(contact._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modalOpen ? (
        <div className="fixed inset-0 flex items-center justify-center  shadow-lg ">
          <button
            onClick={() => {
              setModalOpen(false);
              setBlur('blur-none');
              setName('');
              setAddress('');
              setEmail('');
              setNumber('');
            }}
          >
            X
          </button>
          <form className="-translate-y-full w-full max-w-lg bg-slate-400 shadow-lg shadow-slate-500/50 p-4 flex justify-center mt-20 ">
            <div className="flex flex-col">
              <div className="">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-4 text: rounded-md outline-none pl-1 w-64"
                  placeholder="Name"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={address}
                  className="mb-4 text: rounded-md outline-none pl-1 w-64"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  className="mb-4 text: rounded-md outline-none pl-1 w-64"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={number}
                  className="mb-4 text: rounded-md outline-none pl-1 w-64"
                  placeholder="Number"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="rounded-lg w-20 bg-black text-white"
                  onClick={() => {
                    setModalOpen(false);
                    setBlur('blur-none');
                    // updateContact(data);
                    updateContactMutation.mutate(data);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
