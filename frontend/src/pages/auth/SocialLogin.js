import { useEffect } from 'react';
import { Button, notification } from 'antd';
import { APP_BASEURL } from '../../config-global';
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
        type="text"
        shape="circle"
        href={`${APP_BASEURL}/auth/login/facebook`}
        icon={<CustomIcon name="facebook" className="color-facebook" />}
      />
      <Button
        type="text"
        shape="circle"
        href={`${APP_BASEURL}/auth/login/linkedin`}
        icon={<CustomIcon name="linkedin" className="color-linkedin" />}
      />
    </div>
  );
}
