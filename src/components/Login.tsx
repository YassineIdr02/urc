import React from 'react'
import { useState } from "react";
import {loginUser} from "../user/loginApi";
import { Session } from "../model/common";
import { CustomError } from "../model/CustomError";
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
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
                navigate('/inbox')

            }, (loginError: CustomError) => {
                console.log(loginError);
                setError(loginError);
                setSession({} as Session);
            });
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="login" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            required
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don`t have an account?{' '}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login