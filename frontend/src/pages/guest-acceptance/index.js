import { LoadingButton } from '@mui/lab';
import {
  Box,
  Chip,
  Step,
  Grid,
  Stack,
  Alert,
  Button,
  Divider,
  Stepper,
  StepLabel,
  Typography,
  InputAdornment,
} from '@mui/material';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import Logo from '../../components/logo';
import useResponsive from '../../hooks/useResponsive';
import FormProvider, { RHFTextField, RHFDateField } from '../../components/hook-form';
import AppTitle from '../../components/AppTitle';
import SocialConnect from '../account-admin/SocialConnect';

export default function GuestAcceptance() {
  const { userId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  console.log(userId);

  const isDesktop = useResponsive('up', 'lg');
  const flexDirection = isDesktop ? 'row' : 'column';

  const AccountSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is Required'),
    jobTitle: Yup.string().required('Please fill the Job Title'),
    recordingDate: Yup.date().required('Please choose a recording date.'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    recordingDate: '',
    startHostAutomation: false,
    dummyTopic: '', // just to save the topics
  };

  const [topics, setTopics] = useState([]);

  const methods = useForm({
    resolver: yupResolver(AccountSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const dummyTopic = watch('dummyTopic');

  const onSubmit = async (data) => {
    try {
      console.log(data);

      setTopics([]);
      reset(defaultValues);
      enqueueSnackbar('Data updated successfully!');
    } catch (error) {
      console.error(error);

      reset();
      setError('afterSubmit', { ...error, message: error.message || error });
    }
  };

  const steps = [
    { key: '1', label: 'Click' },
    { key: '2', label: 'Connect' },
    { key: '3', label: 'Confirm' },
  ];

  return (
    <>
      <AppTitle title="Guest Acceptance" />

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Box
            sx={{
              minHeight: '100vh',
              bgcolor: 'background.lightPurple',
              borderRight: '1px solid #eeeeee',
            }}
          >
            <Logo sx={{ m: 7.5 }} />

            <Box sx={{ pl: 7.5, pr: 7.5 }}>
              <Typography sx={{ fontSize: 54, lineHeight: 1.25 }} gutterBottom>
                Build interest in your episode…
              </Typography>
              <Typography color="primary.main">Even before it’s recorded!</Typography>
            </Box>

            <Box
              sx={{
                p: 7.5,
                background: 'url(/assets/guest-acceptance-bg.svg) no-repeat left top',
              }}
            >
              <Typography marginBottom>
                Automate your episode promotion in just 2 quick steps
              </Typography>

              <Stepper activeStep={1} alternativeLabel orientation="vertical">
                {steps.map(({ key, label }) => (
                  <Step key={key}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
        </Grid>

        <Grid item xs>
          <Box sx={{ p: 4, pr: 6 }}>
            <Typography sx={{ mb: 4, mt: 4, fontSize: 44 }} color="primary.main">
              First, confirm your info. Then connect your social media.
            </Typography>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} marginTop={5} marginBottom={5}>
                {!!errors.afterSubmit && (
                  <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

                <Stack
                  sx={{
                    mb: 2,
                    gap: 2,
                    flexDirection,
                    alignContent: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <RHFTextField name="firstName" label="First Name" />
                  <RHFTextField name="lastName" label="Last Name" />
                  <RHFTextField name="email" label="Email" />
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
                  <RHFDateField name="recordingDate" label="Recording Date" />
                  <RHFTextField name="jobTitle" label="Job Title and Business" />

                  <Stack width="100%" position="relative">
                    <RHFTextField
                      name="dummyTopic"
                      disabled={topics.length === 5}
                      label="Potential Topic (Optional)"
                      placeholder="Add your topic here..."
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              edge="end"
                              aria-label="Add Topic"
                              disabled={topics.length === 5 || !dummyTopic}
                              onClick={() => {
                                setTopics((t) => [...t, dummyTopic]);
                                setValue('dummyTopic', '');
                              }}
                            >
                              Add Topic
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Stack gap={1} top={95} flexWrap="wrap" position="absolute" flexDirection="row">
                      {topics.map((topic, key) => (
                        <Chip
                          key={key}
                          label={topic}
                          variant="outlined"
                          sx={{ justifyContent: 'left', width: 'fit-content' }}
                          onDelete={() => setTopics((t) => t.filter((_, i) => i !== key))}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Typography sx={{ mb: 4, fontSize: 24 }}>
                We&apos;ll gather questions from your connections that you and the host can answer
                during your recording. You can connect any or all of your social media:
              </Typography>

              <SocialConnect />

              <Divider sx={{ mt: 4, mb: 4 }} />

              <LoadingButton
                color="info"
                size="large"
                type="button"
                shape="circular"
                variant="contained"
                loading={isSubmitting}
              >
                CONFIRM POSTING SCHEDULE
              </LoadingButton>
            </FormProvider>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
