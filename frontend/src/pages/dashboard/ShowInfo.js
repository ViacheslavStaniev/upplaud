import { Form, Image, Input, Upload, Button, Typography } from "antd";

export default function ShowInfo() {
  const [form] = Form.useForm();
  // const { user } = useAuthContext();

  const { Dragger } = Upload;
  const { Text, Title, Paragraph } = Typography;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const logo = Form.useWatch("logo", form);

  // const normFile = (e) => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) return e;

  //   return e?.fileList;
  // };

  // const { getRootProps, getInputProps } = useDropzone({
  //   maxFiles: 1,
  //   multiple: false,
  //   accept: { "image/*": [".png", ".gif", ".jpeg", ".jpg"] },
  //   onDrop: (acceptedFiles) => {
  //     if (acceptedFiles.length > 0) {
  //       const file = acceptedFiles[0];
  //       const reader = new FileReader();
  //       reader.onloadend = () => setValue("logo", reader.result);
  //       reader.readAsDataURL(file);
  //     }
  //   },
  // });

  return (
    <>
      <Title level={3} className='m-0 mb-2'>
        Show Info
      </Title>

      <Form
        form={form}
        size='large'
        className='w-80'
        layout='vertical'
        onFinish={onSubmit}
        initialValues={{ website: "", name: "", logo: "" }}
      >
        <div className='flex-item gap-2'>
          <Form.Item name='name' label="YOUR SHOW'S NAME" className='flex-1'>
            <Input placeholder="YOUR SHOW'S NAME" />
          </Form.Item>
          <Form.Item name='website' label="YOUR SHOW'S WEBPAGE" className='flex-1'>
            <Input type='url' placeholder='Blog, landing pages, etc' />
          </Form.Item>
        </div>

        <div className='flex-item gap-2 align-baseline'>
          <Form.Item label="Upload the show's logo" className='flex-auto'>
            <Dragger
              name='files'
              action='/upload.do'
              style={{ padding: 20, width: "100%", background: "rgb(252, 251, 252)", border: "2px dashed rgb(179, 179, 179)" }}
            >
              <Paragraph>Click to upload photo or drag and drop</Paragraph>
              <Text>Any file up to 10MB</Text>
            </Dragger>
          </Form.Item>

          <div className={logo ? "" : "visibility-hidden"}>
            <Paragraph className='form-label mb-8px'>Uploaded logo</Paragraph>
            <Image src={logo} alt='uploaded logo' className='bg-1B1E22 border-E0E0E0 br-5px maxw-125px maxh-125px' />
          </div>
        </div>

        <Button shape='round' className='minw-110px primary-outlined' loading={false}>
          SAVE
        </Button>
      </Form>
    </>
  );
}
