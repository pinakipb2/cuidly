import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearTokens, setTokens } from '../redux/user/userSlice';
import { getSession, signIn, signOut } from '../lib/auth';

const LogIn = () => {
  const dispatch = useDispatch();
  const { data: session, status } = getSession();
  console.log(session, status);
  const access_token = useSelector((state) => state.user.access_token);
  const refresh_token = useSelector((state) => state.user.refresh_token);
  // TODO: remove default values
  const [data, setData] = useState({
    username: 'pinakipb2',
    password: 'pinakipb2',
  });
  const [logginIn, setLogginIn] = useState(false);
  const login = async () => {
    console.log('Submitted', data);
    //   // TODO: remove toast and setData
    // setData({
    //   username: '',
    //   password: '',
    // });
    setLogginIn(true);
    const { status, message } = await signIn(data);
    if (status === 'success') {
      dispatch(setTokens(message));
      toast.success('Logged In Successfully');
    } else {
      toast.error(message, { id: 'login-error' });
    }
    setLogginIn(false);
  };
  const logout = async () => {
    console.table({ access_token, refresh_token });
    const { status, message } = await signOut(access_token, refresh_token);
    if (status === 'success') {
      dispatch(clearTokens());
      toast.success('Logged Out Successfully');
    } else {
      console.log(message);
    }
  };
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="h-full bg-blue-100">
      <div className="flex flex-col items-center justify-center w-full h-full gap-3">
        <div className="text-xl text-gray-600 mb-6 font-semibold">LogIn To Cuidly</div>
        <div>
          <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-500 w-full">
            Username
          </label>
          <input type="text" id="username" name="username" className="block p-1.5 px-2 rounded-md shadow-lg w-60" value={data.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-500 w-full">
            Password
          </label>
          <input type="password" id="password" name="password" className="block p-1.5 px-2 rounded-md shadow-lg w-60" value={data.password} onChange={handleChange} />
        </div>
        <button
          className="flex items-center place-items-center justify-center bg-blue-700 w-60 rounded-md shadow-lg mt-2 py-2 text-white font-semibold disabled:bg-opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            login();
          }}
          disabled={logginIn}
        >
          {logginIn && (
            <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          Log In
        </button>
        {/* TODO: remove this button */}
        <button
          className="bg-red-700 w-60 rounded-md shadow-lg mt-2 py-2 text-white font-semibold"
          onClick={() => {
            logout();
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default LogIn;
