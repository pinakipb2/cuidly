import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { registerUserAuth } from '../../lib/auth';
import Button from '../common/Button';

const SignUp = () => {
  const router = useRouter();
  const [registering, setRegistering] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const register = async () => {
    if (router.isReady) {
      // TODO: remove toast
      usernameRef.current.value = '';
      passwordRef.current.value = '';
      // TODO: Remove these 2 lines
      usernameRef.current.value = 'jackal';
      passwordRef.current.value = 'jackal';
      setRegistering(true);
      const data = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        type: router.query.type || 'FREE',
      };
      console.log('Submitted', data);
      const { status, message } = await registerUserAuth(data);
      if (status === 'success') {
        toast.success('Account Created Successfully');
      } else {
        toast.error(message, { id: 'signup-error' });
      }
      setRegistering(false);
    }
  };
  return (
    <div className="h-full bg-blue-100">
      <div className="flex flex-col items-center justify-center w-full h-full gap-3">
        <div className="text-xl text-gray-600 mb-6 font-semibold">Register An Account</div>
        {/* TODO: Remove default values */}
        <div className="w-full justify-center items-center flex flex-col">
          <label htmlFor="username" className="mb-1 text-sm font-medium text-gray-500 w-1/6">
            Username
          </label>
          <input type="text" id="username" className="p-1.5 px-2 rounded-md shadow-lg w-1/6" defaultValue="jackal" ref={usernameRef} />
        </div>
        <div className="w-full justify-center items-center flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-500 w-1/6">
            Password
          </label>
          <input type="password" id="password" className="p-1.5 px-2 rounded-md shadow-lg w-1/6" defaultValue="jackal" ref={passwordRef} />
        </div>
        <Button buttonText="Register" isDisabled={registering} isLoading={registering} onClick={register} />
      </div>
    </div>
  );
};

export default SignUp;
