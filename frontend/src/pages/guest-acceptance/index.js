import { LoadingButton } from '@mui/lab';
import {
  Box,
  Chip,
  Grid,
  Stack,
  Alert,
  Button,
  Divider,
  Typography,
  InputAdornment,
} from '@mui/material';
import { CheckOutlined } from '@mui/icons-material';
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
  const [steps, setSteps] = useState([
    { key: 1, label: 'Click', completed: true, active: false },
    { key: 2, label: 'Connect Socials', completed: false, active: true },
    { key: 3, label: 'Confirm Schedule', completed: false, active: false },
  ]);

  const activeStep = steps.find((step) => step.active);

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

      setSteps((preSteps) => preSteps.map((step) => ({ ...step, active: step.key === 3 })));
    } catch (error) {
      console.error(error);

      reset();
      setError('afterSubmit', { ...error, message: error.message || error });
    }
  };

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
              <Typography sx={{ mb: 3 }}>
                Automate your episode promotion in just 2 quick steps
              </Typography>

              {steps.map(({ key, label, completed, active }) => (
                <Stack
                  key={key}
                  sx={{
                    mb: 2,
                    gap: 2,
                    position: 'relative',
                    flexDirection: 'row',
                    alignItems: 'center',
                    '&::after': {
                      ...(key < 3 && {
                        left: 32,
                        height: 24,
                        content: '""',
                        position: 'absolute',
                        border: '1px solid #9E9E9E',
                        bottom: key === 1 ? -16 : -24,
                      }),
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 69,
                      height: 69,
                      display: 'flex',
                      borderRadius: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...(active && { border: '1px solid #11C2C2' }),
                    }}
                  >
                    <Stack
                      sx={{
                        width: '80%',
                        height: '80%',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...(active && { color: '#ffffff', background: '#11C2C2' }),
                        ...(completed && { color: '#8F24B2', background: 'rgb(143,36,178,0.1)' }),
                        ...(!completed &&
                          !active && { color: '#1B1E22', border: '1px solid', opacity: 0.3 }),
                      }}
                    >
                      {completed ? <CheckOutlined /> : `0${key}`}
                    </Stack>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 20,
                      ...(active && { color: '#11C2C2' }),
                      ...(!completed && !active && { color: '#9e9e9e' }),
                    }}
                  >
                    {label}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs>
          {activeStep.key === 2 && (
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

                      <Stack
                        gap={1}
                        top={95}
                        flexWrap="wrap"
                        position="absolute"
                        flexDirection="row"
                      >
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
                  type="submit"
                  shape="circular"
                  variant="contained"
                  loading={isSubmitting}
                >
                  CONFIRM POSTING SCHEDULE
                </LoadingButton>
              </FormProvider>
            </Box>
          )}

          {activeStep.key === 3 && (
            <Box sx={{ p: 4, pr: 6 }}>
              <Typography sx={{ mb: 4, mt: 4, fontSize: 44 }} color="primary.main">
                Confirm automatic posting schedule
              </Typography>

              <Button color="info" size="large" type="button" shape="circular" variant="contained">
                CLICK TO START YOUR PRE EPISODE PROMOTION
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}
