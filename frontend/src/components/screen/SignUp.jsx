import React, { useState } from 'react';
// import { registerUser } from '../api/auth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { getSession, registerUserAuth } from '../../lib/auth';
import Loading from '../screen/Loading';
import Button from '../common/Button';

const SignUp = () => {
  const { data: session, status } = getSession();
  console.table({ session, status });
  const router = useRouter();
  const [registering, setRegistering] = useState(false);
  // TODO: remove dummy data
  const [data, setData] = useState({
    username: 'jackie',
    password: 'jackie',
  });
  const register = async () => {
    console.log('Submitted', data);
    if (router.isReady) {
      setRegistering(true);
      const { status, message } = await registerUserAuth({ ...data, type: router.query.type || 'FREE' });
      if (status === 'success') {
        toast.success('Account Created Successfully');
      } else {
        toast.error(message, { id: 'signup-error' });
      }
      // setData({
      //   username: '',
      //   password: '',
      // });
      setRegistering(false);
    }
  };
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  if (status === 'authenticated') {
    return <Loading />;
  }
  return (
    <div className="h-full bg-blue-100">
      <div className="flex flex-col items-center justify-center w-full h-full gap-3">
        <div className="text-xl text-gray-600 mb-6 font-semibold">Register An Account</div>
        <div className="w-full justify-center items-center flex flex-col">
          <label htmlFor="username" className="mb-1 text-sm font-medium text-gray-500 w-1/6">
            Username
          </label>
          <input type="text" id="username" name="username" className="p-1.5 px-2 rounded-md shadow-lg w-1/6" value={data.username} onChange={handleChange} />
        </div>
        <div className="w-full justify-center items-center flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-500 w-1/6">
            Password
          </label>
          <input type="password" id="password" name="password" className="p-1.5 px-2 rounded-md shadow-lg w-1/6" value={data.password} onChange={handleChange} />
        </div>
        <Button buttonText="Register" isDisabled={registering} isLoading={registering} onClick={register} />
      </div>
    </div>
  );
};

export default SignUp;
