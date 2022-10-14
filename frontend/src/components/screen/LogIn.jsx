import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../redux/user/userSlice';
import { signIn } from '../../lib/auth';
import Button from '../common/Button';

const LogIn = () => {
  const dispatch = useDispatch();
  // TODO: remove default values
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [logginIn, setLogginIn] = useState(false);
  const login = async () => {
    const data = { username: usernameRef.current.value, password: passwordRef.current.value };
    console.log('Submitted', data);
    // TODO: remove toast
    usernameRef.current.value = '';
    passwordRef.current.value = '';
    // TODO: Remove these 2 lines
    usernameRef.current.value = 'pinakipb2';
    passwordRef.current.value = 'pinakipb2';
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
  return (
    <div className="h-full bg-blue-100 w-full">
      <div className="flex flex-col items-center justify-center w-full h-full gap-3">
        <div className="text-xl text-gray-600 mb-6 font-semibold">LogIn To Cuidly</div>
        {/* TODO: Remove default value */}
        <div className="w-full justify-center items-center flex flex-col">
          <label htmlFor="username" className="mb-1 text-sm font-medium text-gray-500 w-1/6">
            Username
          </label>
          <input type="text" id="username" className="p-1.5 px-2 rounded-md shadow-lg w-1/6" defaultValue="pinakipb2" ref={usernameRef} />
        </div>
        <div className="w-full justify-center items-center flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-500 w-1/6">
            Password
          </label>
          <input type="password" id="password" className="p-1.5 px-2 rounded-md shadow-lg w-1/6" defaultValue="pinakipb2" ref={passwordRef} />
        </div>
        <Button buttonText="Log In" isDisabled={logginIn} isLoading={logginIn} loadingText="Logging In" onClick={login} />
      </div>
    </div>
  );
};

export default LogIn;
