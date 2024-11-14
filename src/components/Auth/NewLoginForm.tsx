import { Link } from "react-router-dom";
import  { useState, ChangeEvent } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { CustomError } from "../../model/CustomError";
import { Session } from "../../model/common";
import { loginUser } from "../../user/loginApi";

 
const NewLoginForm = () => {
  const [error, setError] = useState({} as CustomError);
  const [session, setSession] = useState({} as Session);
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      loginUser({ user_id: -1, username: data.get('login') as string, password: data.get('password') as string },
          (result: Session) => {
              console.log(result);
              setSession(result);
              form.reset();
              setError(new CustomError(""));
              navigate('/home/inbox/1')

          }, (loginError: CustomError) => {
              console.log(loginError);
              setError(loginError);
              setSession({} as Session);
          });
  };
  return (
    <form className="flex flex-col gap-2 justify-center" onSubmit={handleSubmit}>
      
      <input
        type="text"
        id="login"
        name="login"
        required
        className="input input-bordered rounded-2xl input-accent w-full"
      />
      <input
        type="password"
        id="password"
        name="password"
        className="input input-bordered rounded-2xl input-accent w-full"
      />

      <button className="btn bg-white shadow-md w-full rounded-2xl hover:bg-slate-50 "
        type="submit"
      >
        Sign in
      </button>

    </form>
  );
};

export default NewLoginForm;
