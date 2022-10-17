import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokens } from '../api/auth';
import MainContent from '../components/screen/Dashboard';
import goToThisIfUserAuthenticated from '../HOC/goToThisIfUserAuthenticated';
import { setTokens } from '../redux/user/userSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const refresh_token = useSelector((state) => state.user.refresh_token);
  useEffect(() => {
    const controller = new AbortController();
    const refreshTokenOnRender = async () => {
      try {
        const { data } = await refreshTokens({ refresh_token }, { signal: controller.signal });
        console.log(data);
        dispatch(setTokens({ data }));
      } catch (err) {
        console.log(err);
      }
    };
    refreshTokenOnRender();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <MainContent />
    </>
  );
};

export default goToThisIfUserAuthenticated(Dashboard);
