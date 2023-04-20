import { Button, Result } from "antd";
import AppTitle from "../components/AppTitle";

export default function Page403() {
  return (
    <>
      <AppTitle title='403 Not authorized' />

      <Result
        title='403'
        status='403'
        subTitle='Sorry, you are not authorized to access this page.'
        extra={
          <Button href='/' type='primary'>
            Back Home
          </Button>
        }
      />
    </>
  );
}
