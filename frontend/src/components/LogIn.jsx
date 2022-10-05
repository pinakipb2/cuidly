import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import { toast } from 'react-hot-toast';

const LogIn = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const submit = async () => {
    console.log('Submitted', data);
    try {
      const resp = await loginUser(data);
      console.log(resp);
      console.log(resp.data);
      // TODO: remove toast and setData
      toast.success('Logged In Successfully');
    //   setData({
    //     username: '',
    //     password: '',
    //   });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
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
          className="bg-gray-700 w-60 rounded-md shadow-lg mt-2 py-2 text-white font-semibold"
          onClick={() => {
            submit();
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LogIn;
