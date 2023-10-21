import { useEffect } from 'react';
import { APP_BASEURL } from '../../config-global';
import { Button, notification, Divider } from 'antd';
import { useAuthContext } from '../../auth/AuthProvider';
import CustomIcon from '../../components/CustomIcon';

export default function SocialLogin() {
  const { loginViaToken } = useAuthContext();

  useEffect(() => {
    const getParam = (param) => new URLSearchParams(window.location.hash.substring(1)).get(param);

    const authToken = getParam('auth_token');
    if (authToken) {
      loginViaToken(authToken);
      window.location.assign('/');
    } else if (getParam('error') && getParam('error_description')) {
      notification.error({ message: 'Login Error!', description: getParam('error_description') });
    }
  }, [loginViaToken]);

  return (
    <div className="flex-center flex-item">
      <Button
        shape="round"
        type="google"
        icon={<CustomIcon name="google" />}
        href={`${APP_BASEURL}/auth/login/google`}
      >
        Google
      </Button>

      <Divider type="vertical" />

      <Button
        shape="round"
        type="linkedin"
        icon={<CustomIcon name="linkedin" />}
        href={`${APP_BASEURL}/auth/login/linkedin`}
      >
        LinkedIn
      </Button>
    </div>
  );
}
