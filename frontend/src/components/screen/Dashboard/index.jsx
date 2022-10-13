import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../lib/auth';
import { clearTokens } from '../../../redux/user/userSlice';
import { buttonVariant } from '../../../utils';
import Button from '../../common/Button';

const MainContent = () => {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user.access_token);
  const refresh_token = useSelector((state) => state.user.refresh_token);
  const logout = async () => {
    console.table({ access_token, refresh_token });
    const { status, message } = await signOut(access_token, refresh_token);
    if (status === 'success') {
      dispatch(clearTokens());
      toast.success('Logged Out Successfully');
    } else {
      dispatch(clearTokens());
      console.log(message);
    }
  };
  return (
    <div>
      Secret Page !!
      <Button buttonText="Log Out" onClick={logout} variant={buttonVariant.DANGER} />
    </div>
  );
};

export default MainContent;
