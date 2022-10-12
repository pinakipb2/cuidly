import { useSelector } from 'react-redux';
import { logInUser, logOutUser, registerUser } from '../../api/auth';

// getSession() returns an object containing two values: data and status
const getSession = () => {
  const dataType = {
    UNDEFINED: undefined,
    NULL: null,
  };

  const statusType = {
    LOADING: 'loading',
    AUTHENTICATED: 'authenticated',
    UNAUTHENTICATED: 'unauthenticated',
  };

  let status = statusType.LOADING;
  let data = dataType.UNDEFINED;

  const userId = useSelector((state) => state.user.userId);
  const username = useSelector((state) => state.user.username);
  const accountType = useSelector((state) => state.user.accountType);
  const access_token = useSelector((state) => state.user.access_token);
  const refresh_token = useSelector((state) => state.user.refresh_token);

  if (userId === null || username === null || accountType === null || access_token === null || refresh_token === null) {
    status = statusType.UNAUTHENTICATED;
    data = dataType.NULL;
    return {
      data,
      status,
    };
  } else {
    status = statusType.AUTHENTICATED;
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
    const resp = await registerUser(authData);
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
