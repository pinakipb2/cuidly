import { useSelector } from 'react-redux';

const isUserInRedux = () => {
  const userId = useSelector((state) => state.user.userId);
  const username = useSelector((state) => state.user.username);
  const accountType = useSelector((state) => state.user.accountType);
  const access_token = useSelector((state) => state.user.access_token);
  const refresh_token = useSelector((state) => state.user.refresh_token);
  const notAuthenticatedUser = userId === null || username === null || accountType === null || access_token === null || refresh_token === null;
  return notAuthenticatedUser;
};

const authStatusType = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
};

const buttonVariant = {
  PRIMARY: 'PRIMARY',
  SUCCESS: 'SUCCESS',
  DANGER: 'DANGER',
};

export { isUserInRedux, authStatusType, buttonVariant };
