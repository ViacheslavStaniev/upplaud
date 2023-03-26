import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Alert,
  Button,
  Divider,
  MenuItem,
  Container,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { ImageOutlined } from '@mui/icons-material';
import { useSettingsContext } from '../../components/settings';
import FormProvider, { RHFTextField, RHFSelect } from '../../components/hook-form';
import AppTitle from '../../components/AppTitle';

export default function PostingTemplate() {
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();

  const defaultValues = { postcard: 'none', headline: '', textColor: '', bgColor: '' };
  const methods = useForm({ defaultValues });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      reset(defaultValues);
      enqueueSnackbar('Guest added successfully!');
    } catch (error) {
      console.error(error);

      reset();
      setError('afterSubmit', { ...error, message: error.message || error });
    }
  };

  const CURRENCIES = [
    { value: 'none', label: 'Please Select' },
    { value: 'post1', label: 'Postcard 1st' },
    { value: 'post2', label: 'Postcard 2nd' },
    { value: 'post3', label: 'Postcard 3rd' },
    { value: 'post4', label: 'Postcard 4th' },
    { value: 'post5', label: 'Postcard 5th' },
  ];

  const disabled = watch('postcard') === 'none';

  return (
    <>
      <AppTitle title="Posting Template" />

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Posting Template
        </Typography>

        <Card sx={{ bgcolor: 'background.lightPurple', p: 2, mb: 5 }}>
          <Typography gutterBottom>
            You can have up to 5 postcards posted per episode, promoting it on your social media &
            on your guests&apos;. In this screen, you can edit the color & text of each
            postcard&apos;s Headline.
          </Typography>

          <Typography gutterBottom>
            Plus you can customize the Postcard posting schedule for your social media. This will be
            the default for your Guest. But they can tailor their posting schedule for themselves.
          </Typography>

          <Typography>
            Each postcard will automatically be updated with your Guest&apos;s name, topic title,
            recording date & the Ask Page URL. What you&apos;ll see below is simply a template for
            your headline customization.
          </Typography>
        </Card>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <Grid container direction="row" gap={5}>
            <Stack gap={2} flex={1}>
              <Typography variant="h4" component="h4" paragraph>
                Select Postcard to Edit
              </Typography>

              <RHFSelect name="postcard" label="Select Postcard">
                {CURRENCIES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                name="headline"
                disabled={disabled}
                label="Headline Text"
                placeholder="Enter your headline text here"
              />
              <RHFTextField
                name="textColor"
                label="Text Color"
                disabled={disabled}
                placeholder="e.g #000000"
              />
              <RHFTextField
                name="bgColor"
                disabled={disabled}
                label="Background Color"
                placeholder="e.g #000000"
              />

              <Box>
                <LoadingButton
                  size="large"
                  type="submit"
                  shape="circular"
                  variant="outlined"
                  loading={isSubmitting}
                  sx={{ display: 'block', mb: 2 }}
                >
                  SAVE CUSTOMIZATION
                </LoadingButton>

                <Button
                  size="large"
                  type="button"
                  color="info"
                  shape="circular"
                  variant="contained"
                >
                  CUSTOMIZE YOUR POSTING SCHEDULE
                </Button>
              </Box>
            </Stack>

            <Divider orientation="vertical" flexItem sx={{ ml: 5, mr: 5 }} />

            <Grid item flex={1}>
              <Typography variant="h4" component="h4" paragraph>
                Postcard Preview
              </Typography>

              <Stack
                sx={{
                  p: 2,
                  width: 500,
                  height: 500,
                  borderRadius: 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #00B8D9',
                }}
              >
                <ImageOutlined sx={{ fontSize: 120, color: '#00B8D9' }} />
                <Typography variant="h5" color="primary.main" gutterBottom>
                  No preview available yet
                </Typography>
                <Typography>Please select the postcard first to get a preview</Typography>
              </Stack>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </>
  );
}
