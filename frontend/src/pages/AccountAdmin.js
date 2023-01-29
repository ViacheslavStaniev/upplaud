import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDropzone } from 'react-dropzone';
// @mui
import { Container, Typography, Alert, Stack, IconButton, InputAdornment, Divider, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import Iconify from '../components/iconify';
import FormProvider, { RHFInputLabel, RHFTextField } from '../components/hook-form';
import { useSettingsContext } from '../components/settings';

export default function AccountAdmin() {
  const { themeStretch } = useSettingsContext();
  const [showPassword, setShowPassword] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
  });

  console.log(acceptedFiles);

  const AccountSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is Required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = { firstName: '', lastName: '', email: '', password: '', suffix: '' };

  const methods = useForm({
    resolver: yupResolver(AccountSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title> Account Admin | Podasq</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1">
          Account Admin
        </Typography>

        <Typography>Here you can track the automation of your guests:</Typography>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} marginTop={2} marginBottom={2}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

            <Stack gap={2} flexDirection="row" marginBottom={3} alignContent="center" justifyContent="space-between">
              <RHFTextField name="firstName" label="FIRST NAME" />
              <RHFTextField name="lastName" label="LAST NAME" />
              <RHFTextField name="email" label="EMAIL" />
            </Stack>

            <Stack gap={2} flexDirection="row" marginBottom={3} alignContent="center" justifyContent="space-between">
              <div style={{ width: 'calc(50% - 16px)' }}>
                <RHFTextField
                  name="password"
                  label="PASSWORD"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <RHFTextField
                name="suffix"
                label="Guestii Prefix"
                placeholder="SUFFIX"
                InputProps={{ startAdornment: <InputAdornment position="start">PODASQ.COM/</InputAdornment> }}
              />
            </Stack>
          </Stack>

          <Divider sx={{ my: 4, mt: 4 }} />

          <Typography variant="h4" component="h3" paragraph>
            Show Info
          </Typography>

          <Stack gap={2} width="65%" flexDirection="row" marginBottom={3} alignContent="center" justifyContent="space-between">
            <RHFTextField name="webpage" label="YOUR SHOW'S WEBPAGE" placeholder="Blog, landing pages, etc" type="url" />
            <RHFTextField name="showname" label="YOUR SHOW'S NAME" />
          </Stack>

          <Stack gap={2} flexDirection="row" marginBottom={4}>
            <Stack gap={2} width="65%">
              <RHFInputLabel label="Upload the show's logo" />
              <div
                {...getRootProps({ className: 'dropzone' })}
                style={{ padding: 35, background: '#FCFBFC', borderRadius: 4, border: '2px dashed #B3B3B3', textAlign: 'center' }}
              >
                <input {...getInputProps()} />
                <Typography>Click to upload photo or drag and drop</Typography>
                <span>Any file up to 10MB</span>
              </div>
            </Stack>

            {acceptedFiles.length > 0 && (
              <Stack flex={1} gap={2}>
                <RHFInputLabel label="Uploaded logo" />
                <img
                  alt={acceptedFiles[0].name}
                  src={URL.createObjectURL(acceptedFiles[0])}
                  style={{ maxHeight: 125, maxWidth: 125, borderRadius: 4, background: '#1B1E22', border: '1px solid #e0e0e0' }}
                />
              </Stack>
            )}
          </Stack>

          <Typography variant="h4" component="h3" paragraph>
            Connect with social media
          </Typography>

          <Stack gap={3} flexDirection="row" marginBottom={5}>
            <Button
              size="large"
              type="button"
              variant="contained"
              startIcon={<Iconify icon="mdi:facebook" />}
              style={{ borderRadius: 50, background: '#1877F2' }}
            >
              Connect with Facebook
            </Button>
            <Button
              size="large"
              type="button"
              variant="contained"
              startIcon={<Iconify icon="mdi:instagram" />}
              style={{
                borderRadius: 50,
                background: 'radial-gradient(128.57% 128.57% at 10.71% 105.36%, #FFCB52 0%, #E34677 56.25%, #C938AC 100%)',
              }}
            >
              Connect with Instagram
            </Button>
            <Button
              size="large"
              type="button"
              variant="contained"
              startIcon={<Iconify icon="mdi:linkedin" />}
              style={{ borderRadius: 50, background: '#0A66C2' }}
            >
              Connect with LinkedIn
            </Button>
          </Stack>

          <Divider sx={{ my: 4, mt: 4 }} />

          <Stack gap={3} flexDirection="row" marginBottom={4}>
            <Stack padding={2} borderRadius={2} border="2px solid #00B8D9" width={220}>
              <Typography color="ActiveBorder">MONTHLY</Typography>
              <Typography>$20/month</Typography>
            </Stack>

            <Stack padding={2} borderRadius={2} border="2px solid #e0e0e0" width={220}>
              <Typography color="ActiveBorder">AUTOMATION PACK 5</Typography>
              <Typography>$100/with quantity option</Typography>
            </Stack>
          </Stack>

          <Stack gap={2} flexDirection="row">
            <LoadingButton
              size="large"
              type="submit"
              variant="outlined"
              style={{ borderRadius: 50 }}
              loading={isSubmitSuccessful || isSubmitting}
            >
              SAVE
            </LoadingButton>

            <Button size="large" type="button" variant="contained" color="info" style={{ borderRadius: 50 }}>
              UPGRADE YOUR PACKAGE
            </Button>
          </Stack>
        </FormProvider>
      </Container>
    </>
  );
}
