import { useState } from 'react';

export default function Form() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center  shadow-lg ">
      <form className="-translate-y-full w-full max-w-lg bg-slate-400 shadow-lg shadow-slate-500/50 p-4 flex justify-center mt-20 ">
        <div className="flex flex-col">
          <div className="">
            <input
              type="text"
              required
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-4 text: rounded-md outline-none pl-1 w-64"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="text"
              // value={address}
              className="mb-4 text: rounded-md outline-none pl-1 w-64"
              placeholder="Address"
              // onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              required
              // value={email}
              className="mb-4 text: rounded-md outline-none pl-1 w-64"
              placeholder="Email"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              // value={number}
              className="mb-4 text: rounded-md outline-none pl-1 w-64"
              placeholder="Number"
              // onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="rounded-lg w-20 bg-black text-white"
              type="submit"
              onClick={(e: any) => {
                e.preventDefault();
                //   addContactMutation.mutate({ name, address, email, number });
              }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
