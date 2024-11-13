import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useAppDispatch } from '../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../features/userSlice';


const Register = () => {
    const dispatch = useAppDispatch()
    const userRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const [user, setInfo] = useState({
        username: "",
        password: "",
        email:""
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
    
        dispatch(registerUser(user))

        setInfo({
          username: "",
          password: "",
          email:""
        })
    
        navigate('/')
    
      }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form action="" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
            id='username'
               autoComplete="false"
               ref={userRef}
               type="text"
               value={user.username}
               onChange={handleInputChange}
               name="username"
               placeholder="Username"
              required
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
            id='email'
             type="text"
             name="email"
             value={user.email}
             onChange={handleInputChange}
             placeholder="Email"
              required
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
            id='password'
               type="password"
               name="password"
               value={user.password}
               onChange={handleInputChange}
               placeholder="Password"
              required
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
          
          
        </form>
      </div>
    </div>
  )
}

export default Register