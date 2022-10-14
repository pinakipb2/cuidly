import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import { buttonVariant } from '../../../utils';
import { toast } from 'react-hot-toast';
import { signOut } from '../../../lib/auth';
import { clearTokens } from '../../../redux/user/userSlice';

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const accountType = useSelector((state) => state.user.accountType);
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
    <div className="sticky top-0 z-50 border-b-2 border-gray-300">
      <nav className="bg-gray-50 px-36 py-2 pt-3 rounded">
        <div className="flex flex-row justify-between items-center w-full gap-2">
          <Link href="/dashboard">
            <div className="hover:cursor-pointer">
              <Image src="/cuidly.svg" className="mr-3 h-6" width={120} height={60} alt="cuidly" />
            </div>
          </Link>
          <Badge accountType={accountType} />
          <div className="flex flex-row w-full items-center gap-10 font-medium justify-end space-x-8">
            Hello, {username}
            <Button buttonText="Logout" onClick={logout} className="mt-0 w-auto px-6 shadow-md" variant={buttonVariant.DANGER} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavbar;
