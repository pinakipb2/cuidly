import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { logInUser, logOutUser, registerUser } from '../../api/auth';
import { authStatusType, isUserInRedux } from '../../utils';

// getSession() returns an object containing two values: data and status
const getSession = () => {
  const dataType = {
    UNDEFINED: undefined,
    NULL: null,
  };

  let status = authStatusType.LOADING;
  let data = dataType.UNDEFINED;

  const userId = useSelector((state) => state.user.userId);
  const username = useSelector((state) => state.user.username);
  const accountType = useSelector((state) => state.user.accountType);

  const notAuthenticatedUser = isUserInRedux();

  const router = useRouter();
  useEffect(() => {
    // console.log(router.pathname);
    // console.log(notAuthenticatedUser);
    if (notAuthenticatedUser) {
      if (router.pathname === '/dashboard') {
        router.push('/login');
      }
    } else {
      router.push('/dashboard');
    }
  }, [notAuthenticatedUser]);

  if (notAuthenticatedUser) {
    status = authStatusType.UNAUTHENTICATED;
    data = dataType.NULL;
    return {
      data,
      status,
    };
  } else {
    status = authStatusType.AUTHENTICATED;
    data = {
      id: userId,
      username,
      accountType,
    };
    return {
      data,
      status,
    };
  }
};

// The callbackUrl specifies to which URL the user will be redirected after signing in. It defaults to the home page.
// authData is { username, password, type: router.query.type || 'FREE' }
const registerUserAuth = async (authData) => {
  try {
    const { data } = await registerUser(authData);
    if (data.username !== authData.username) {
      throw new Error('Unable to Register User');
    }
    return { status: 'success', message: 'Account Created Successfully' };
  } catch (err) {
    console.log(err);
    return { status: 'error', message: err.response.data.message };
  }
};

// authData is { username, password }
const signIn = async (authData, callbackUrl = '/dashboard') => {
  try {
    const resp = await logInUser(authData);
    return { status: 'success', message: resp.data };
  } catch (err) {
    console.log(err);
    return { status: 'error', message: err.response.data.message };
  }
};

const signOut = async (access_token, refresh_token, callbackUrl = '/login') => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    };
    const resp = await logOutUser({ refresh_token }, config);
    return { status: 'success', message: resp.data };
  } catch (err) {
    console.log(err);
    return { status: 'error', message: err.response.data.message };
  }
};

export { registerUserAuth, signIn, getSession, signOut };
