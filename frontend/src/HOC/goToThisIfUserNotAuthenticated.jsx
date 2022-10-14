import Loading from '../components/screen/Loading';
import { getSession } from '../lib/auth';
import { authStatusType } from '../utils';

const goToThisIfUserNotAuthenticated = (Component) => {
  const Auth = (props) => {
    const { data: session, status } = getSession();
    console.table({ session, status });
    if (status === authStatusType.AUTHENTICATED || status === authStatusType.LOADING) {
      return <Loading />;
    }
    return <Component {...props} />;
  };
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }
  return Auth;
};

export default goToThisIfUserNotAuthenticated;
