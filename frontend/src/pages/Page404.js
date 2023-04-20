import { Button, Result } from "antd";
import AppTitle from "../components/AppTitle";

export default function Page404() {
  return (
    <>
      <AppTitle title='404 Page Not Found' />

      <Result
        title='404'
        status='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button href='/' type='primary'>
            Back Home
          </Button>
        }
      />
    </>
  );
}
