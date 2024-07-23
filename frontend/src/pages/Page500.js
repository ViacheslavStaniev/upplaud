import { Button, Result } from "antd";
import AppTitle from "../components/AppTitle";

export default function Page500() {
  return (
    <>
      <AppTitle title='500, something went wrong' />

      <Result
        title='500'
        status='500'
        subTitle='Sorry, something went wrong.'
        extra={
          <Button href='/' type='primary'>
            Back Home
          </Button>
        }
      />
    </>
  );
}
