import { Helmet } from 'react-helmet-async';
// @mui
import {
  Container,
  Typography,
  Alert,
  Stack,
  Button,
  Tooltip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useResponsive from '../../hooks/useResponsive';

// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useSettingsContext } from '../../components/settings';

export default function AccountAdmin() {
  const { themeStretch } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');
  const flexDirection = isDesktop ? 'row' : 'column';

  const AccountSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is Required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    recordingDate: Yup.date().required('Please choose a recording date.'),
    jobTitle: Yup.string().required('Please fill the Job Title'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    recordingDate: '',
    jobTitle: '',
    topic: '',
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
      <Helmet>
        <title> Add Guest | Podasq</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1">
          Add Guest
        </Typography>

        <Typography>
          Enter your guest details to automate their pre-episode promotion on social media
        </Typography>

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
              <RHFTextField name="firstName" label="Guest First Name" />
              <RHFTextField name="lastName" label="Guest Last Name" />
              <RHFTextField name="email" label="Guest Email" />
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
              <RHFTextField name="recordingDate" label="Recording Date" />
              {/* <Controller
                name="recordingDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Recording Date"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    renderInput={(params) => <RHFTextField {...params} fullWidth error={!!error} helperText={error?.message} />}
                  />
                )}
              /> */}
              {/* <DatePicker
                label="Basic example"
                value={null}
                onChange={(newValue) => console.log(newValue)}
                renderInput={(params) => <RHFTextField {...params} />}
              /> */}
              <RHFTextField name="jobTitle" label="Guest Job Title and Business" />
              <RHFTextField name="topic" label="Potential Topic (Optional)" />
            </Stack>
          </Stack>

          <Stack sx={{ gap: 2, flexDirection }}>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              Start Host Automation Now
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked size="medium" />}
              label="Start when guest starts"
            />
          </Stack>

          <Stack gap={2} flexDirection="row" marginTop={4}>
            <LoadingButton
              size="large"
              type="submit"
              variant="outlined"
              style={{ borderRadius: 50 }}
              loading={isSubmitSuccessful || isSubmitting}
              endIcon={
                <Tooltip title="Fill the Title" placement="top">
                  <Iconify icon="mdi:question-mark-circle-outline" />
                </Tooltip>
              }
            >
              UPLOAD CSV
            </LoadingButton>

            <Button
              size="large"
              type="button"
              variant="contained"
              color="info"
              style={{ borderRadius: 50 }}
            >
              AUTOMATE GUEST
            </Button>
          </Stack>
        </FormProvider>
      </Container>
    </>
  );
}
