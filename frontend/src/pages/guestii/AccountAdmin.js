import {
  Alert,
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '../../auth/useAuthContext';
import useResponsive from '../../hooks/useResponsive';
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useSettingsContext } from '../../components/settings';
import ShowInfo from './ShowInfo';
import AppTitle from '../../components/AppTitle';

export default function AccountAdmin() {
  const { user, updateUser } = useAuthContext();
  const { themeStretch } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');
  const flexDirection = isDesktop ? 'row' : 'column';

  const AccountSchema = Yup.object().shape({
    userName: Yup.string().required('Suffix is Required'),
    firstName: Yup.string().required('First name is Required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    userName: user?.userName,
  };

  const methods = useForm({
    resolver: yupResolver(AccountSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await updateUser(data);
    } catch (error) {
      console.error(error);

      reset();
      setError('afterSubmit', { ...error, message: error.message || error });
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
          <Stack
            spacing={2}
            marginTop={2}
            marginBottom={2}
            sx={{ width: isDesktop ? '80%' : '100%' }}
          >
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

            <Stack
              sx={{
                mb: 2,
                gap: 2,
                flexDirection,
                alignContent: 'center',
                justifyContent: 'space-between',
              }}
            >
              <RHFTextField name="firstName" label="FIRST NAME" />
              <RHFTextField name="lastName" label="LAST NAME" />
            </Stack>

            <Stack
              sx={{
                mb: 2,
                gap: 2,
                flexDirection,
                alignContent: 'center',
                justifyContent: 'space-between',
              }}
            >
              <RHFTextField name="email" label="EMAIL" />
              <RHFTextField
                name="userName"
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

          <LoadingButton
            size="large"
            type="submit"
            shape="circular"
            variant="outlined"
            sx={{ minWidth: 120 }}
            loading={isSubmitting}
          >
            SAVE
          </LoadingButton>
        </FormProvider>

        <Divider sx={{ my: 4, mt: 4 }} />

        <ShowInfo />

        <Divider sx={{ my: 4, mt: 4 }} />

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
      </Container>
    </>
  );
}
