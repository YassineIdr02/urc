import { useState, ChangeEvent, useRef, FormEvent } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/userSlice";

interface NewSignupProps {
  showLoginForm: () => void;
}

const NewSignup: React.FC<NewSignupProps> = ({ showLoginForm }) => {
  const dispatch = useAppDispatch();
  const userRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [user, setInfo] = useState({
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

    dispatch(registerUser(user));

    setInfo({
      username: "",
      password: "",
      email: "",
    });

    showLoginForm()
  };
  return (
    <form action="" onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center">
      <p className="text-center">Join ProEx, Unlock Possibilities Together</p>
      
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
    </form>
  );
};

export default NewSignup;
