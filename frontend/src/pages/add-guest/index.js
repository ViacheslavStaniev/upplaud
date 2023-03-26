import {
  Chip,
  Alert,
  Stack,
  Button,
  Switch,
  Tooltip,
  Container,
  Typography,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { addUpdateGuest } from '../../actions/guests';
import useResponsive from '../../hooks/useResponsive';
import FormProvider, { RHFTextField, RHFDateField } from '../../components/hook-form';
import { useSettingsContext } from '../../components/settings';
import AppTitle from '../../components/AppTitle';

export default function AccountAdmin() {
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();

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
      await addUpdateGuest({ ...data, potentialTopics: topics });

      setTopics([]);
      reset(defaultValues);
      enqueueSnackbar('Guest added successfully!');
    } catch (error) {
      console.error(error);

      reset();
      setError('afterSubmit', { ...error, message: error.message || error });
    }
  };

  return (
    <>
      <AppTitle title="Add Guest" />

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
              <RHFDateField name="recordingDate" label="Recording Date" />
              <RHFTextField name="jobTitle" label="Guest Job Title and Business" />

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

          <Stack sx={{ gap: 2, flexDirection }}>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              Start Host Automation Now
            </Typography>
            <FormControlLabel
              name="startHostAutomation"
              label="Start when guest starts"
              control={<Switch size="medium" />}
            />
          </Stack>

          <Stack gap={2} flexDirection="row" marginTop={4}>
            <LoadingButton
              size="large"
              type="submit"
              shape="circular"
              variant="outlined"
              loading={isSubmitting}
            >
              Add Guest
            </LoadingButton>

            <Button
              disabled
              size="large"
              type="button"
              color="primary"
              shape="circular"
              variant="contained"
              endIcon={
                <Tooltip
                  arrow
                  placement="top"
                  title="Upload a spreadsheet of guests. Each column should match above fields labels EXACTLY (case sensitive so copy/paste)."
                >
                  <HelpOutline />
                </Tooltip>
              }
            >
              UPLOAD CSV
            </Button>

            <Button
              disabled
              color="info"
              size="large"
              type="button"
              shape="circular"
              variant="contained"
            >
              AUTOMATE GUEST
            </Button>
          </Stack>
        </FormProvider>
      </Container>
    </>
  );
}
