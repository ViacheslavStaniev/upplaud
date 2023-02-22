import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Container,
  Typography,
  Alert,
  Stack,
  IconButton,
  InputAdornment,
  Divider,
  Button,
  Box,
  // Radio,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '../../auth/useAuthContext';
import useResponsive from '../../hooks/useResponsive';
import Iconify from '../../components/iconify';
import FormProvider, { RHFInputLabel, RHFTextField } from '../../components/hook-form';
import { useSettingsContext } from '../../components/settings';
import AppTitle from '../../components/AppTitle';

export default function AccountAdmin() {
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();

  // const [pack, setPack] = useState('month');
  const [showPassword, setShowPassword] = useState(false);

  const isDesktop = useResponsive('up', 'lg');
  const flexDirection = isDesktop ? 'row' : 'column';

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
  });

  const AccountSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is Required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: user?.name.first,
    lastName: user?.name.last,
    email: user?.email,
    password: '',
    suffix: user?.username,
  };

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
      <AppTitle title="Account Admin" />

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1">
          Account Admin
        </Typography>

        <Typography>Here you can track the automation of your guests:</Typography>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} marginTop={2} marginBottom={2}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

            <Stack
              sx={{
                gap: 2,
                mb: 2,
                alignContent: 'center',
                justifyContent: 'space-between',
                flexDirection,
              }}
            >
              <RHFTextField name="firstName" label="FIRST NAME" />
              <RHFTextField name="lastName" label="LAST NAME" />
              <RHFTextField name="email" label="EMAIL" />
            </Stack>

            <Stack
              sx={{
                gap: 2,
                mb: 2,
                alignContent: 'center',
                justifyContent: 'space-between',
                flexDirection,
              }}
            >
              <div style={{ width: isDesktop ? 'calc(50% - 16px)' : '100%' }}>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {window.location.hostname.toUpperCase()}/
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>

          <Divider sx={{ my: 4, mt: 4 }} />

          <Typography variant="h4" component="h3" paragraph>
            Show Info
          </Typography>

          <Stack
            sx={{
              mb: 2,
              gap: 2,
              width: isDesktop ? '65%' : '100%',
              alignContent: 'center',
              justifyContent: 'space-between',
              flexDirection,
            }}
          >
            <RHFTextField
              name="webpage"
              label="YOUR SHOW'S WEBPAGE"
              placeholder="Blog, landing pages, etc"
              type="url"
            />
            <RHFTextField name="showname" label="YOUR SHOW'S NAME" />
          </Stack>

          <Stack sx={{ gap: 2, mb: 4, flexDirection }}>
            <Stack sx={{ gap: 2, width: isDesktop ? '65%' : '100%' }}>
              <RHFInputLabel label="Upload the show's logo" />
              <Box
                {...getRootProps({ className: 'dropzone' })}
                sx={{
                  padding: 5,
                  background: '#FCFBFC',
                  borderRadius: 2,
                  border: '2px dashed #B3B3B3',
                  textAlign: 'center',
                }}
              >
                <input {...getInputProps()} />
                <Typography>Click to upload photo or drag and drop</Typography>
                <span>Any file up to 10MB</span>
              </Box>
            </Stack>

            {acceptedFiles.length > 0 && (
              <Stack flex={1} gap={2}>
                <RHFInputLabel label="Uploaded logo" />
                <img
                  alt={acceptedFiles[0].name}
                  src={URL.createObjectURL(acceptedFiles[0])}
                  style={{
                    maxHeight: 125,
                    maxWidth: 125,
                    borderRadius: 4,
                    background: '#1B1E22',
                    border: '1px solid #e0e0e0',
                  }}
                />
              </Stack>
            )}
          </Stack>

          <Typography variant="h4" component="h3" paragraph>
            Connect with social media
          </Typography>

          <Stack sx={{ gap: 3, mb: 5, flexDirection }}>
            <Button
              size="large"
              type="button"
              shape="circular"
              variant="contained"
              startIcon={<Iconify icon="mdi:facebook" />}
              style={{ background: '#1877F2' }}
            >
              Connect with Facebook
            </Button>
            <Button
              size="large"
              type="button"
              shape="circular"
              variant="contained"
              startIcon={<Iconify icon="mdi:instagram" />}
              style={{
                background:
                  'radial-gradient(128.57% 128.57% at 10.71% 105.36%, #FFCB52 0%, #E34677 56.25%, #C938AC 100%)',
              }}
            >
              Connect with Instagram
            </Button>
            <Button
              size="large"
              type="button"
              shape="circular"
              variant="contained"
              startIcon={<Iconify icon="mdi:linkedin" />}
              style={{ background: '#0A66C2' }}
            >
              Connect with LinkedIn
            </Button>
          </Stack>

          {/* <Divider sx={{ my: 4, mt: 4 }} /> */}

          {/* <Stack gap={3} flexDirection={isDesktop ? 'row' : 'column'} marginBottom={4}>
            <Stack
              padding={2}
              borderRadius={2}
              width={isDesktop ? 300 : '100%'}
              border={`2px solid ${pack === 'month' ? '#00B8D9' : '#e0e0e0'}`}
            >
              <Stack
                sx={{
                  marginBottom: 2,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography color="ActiveBorder">MONTHLY</Typography>
                <Radio
                  color="info"
                  value="month"
                  name="automation-type"
                  checked={pack === 'month'}
                  onChange={(e) => setPack('month')}
                />
              </Stack>
              <Typography>$20/month</Typography>
            </Stack>

            <Stack
              padding={2}
              borderRadius={2}
              width={isDesktop ? 300 : '100%'}
              border={`2px solid ${pack === 'pack5' ? '#00B8D9' : '#e0e0e0'}`}
            >
              <Stack
                sx={{
                  marginBottom: 2,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography color="ActiveBorder">AUTOMATION PACK 5</Typography>
                <Radio
                  color="info"
                  value="pack5"
                  name="automation-type"
                  checked={pack === 'pack5'}
                  onChange={(e) => setPack('pack5')}
                />
              </Stack>
              <Typography>$100/with quantity option</Typography>
            </Stack>
          </Stack> */}

          <Stack gap={2} flexDirection="row">
            <LoadingButton
              size="large"
              type="submit"
              shape="circular"
              variant="outlined"
              sx={{ minWidth: 120 }}
              loading={isSubmitSuccessful || isSubmitting}
            >
              SAVE
            </LoadingButton>

            {/* <Button size="large" type="button" variant="contained" color="info" shape="circular">
              UPGRADE YOUR PACKAGE
            </Button> */}
          </Stack>
        </FormProvider>
      </Container>
    </>
  );
}
