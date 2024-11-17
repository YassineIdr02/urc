import { useState, ChangeEvent, useRef, FormEvent } from "react";
import { useAppDispatch } from "../../hooks/hooks";

import { registerUser, RegisterUserProp } from "../../features/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { unwrapResult } from "@reduxjs/toolkit";

interface NewSignupProps {
  showLoginForm: () => void;
  notify : () => void;
}

const NewSignup: React.FC<NewSignupProps> = ({ showLoginForm, notify }) => {
  const dispatch = useAppDispatch();
  const userRef = useRef<HTMLInputElement>(null);
  const [user, setInfo] = useState<RegisterUserProp>({
    username: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const resultAction = await dispatch(registerUser(user));
      const { statusText } = unwrapResult(resultAction);
      console.log(statusText);
  
      notify()

      setTimeout(() => {
        showLoginForm();
      }, 4000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to register user");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  
    setInfo({
      username: "",
      password: "",
      email: "",
    });
  
   
  };
  return (
    <form action="" onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center">
      <p className="text-center">Join UBO Chat Relay</p>
      
      <input
        autoComplete="false"
        ref={userRef}
        type="text"
        value={user.username}
        onChange={handleInputChange}
        name="username"
        placeholder="Username"
        className="input input-bordered rounded-2xl input-accent w-full"
      />
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="input input-bordered rounded-2xl input-accent w-full"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleInputChange}
        placeholder="Password"
        required
        className="input input-bordered rounded-2xl input-accent w-full"
      />

      <button
        type="submit"
        className="btn bg-white shadow-md w-full rounded-2xl hover:bg-slate-50"
      >
        Sign up
      </button>

      <ToastContainer theme="colored" autoClose={2000} />
    </form>
  );
};

export default NewSignup;
