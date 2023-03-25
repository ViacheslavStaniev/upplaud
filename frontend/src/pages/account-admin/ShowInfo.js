import { useDropzone } from 'react-dropzone';
import { Box, Alert, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { addUpdateShow } from '../../actions/show';
import { CLOUDFRONT_URL } from '../../config-global';
import { useAuthContext } from '../../auth/useAuthContext';
import useResponsive from '../../hooks/useResponsive';
import FormProvider, { RHFInputLabel, RHFTextField } from '../../components/hook-form';

export default function ShowInfo() {
  const { user, fetchUser } = useAuthContext();
  const isDesktop = useResponsive('up', 'lg');
  const flexDirection = isDesktop ? 'row' : 'column';

  const { show } = user;

  const methods = useForm({
    defaultValues: {
      upload: false,
      name: show?.name,
      website: show?.website,
      logo: show && show.logo ? CLOUDFRONT_URL + show.logo : '',
    },
  });

  const {
    reset,
    watch,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const logo = watch('logo');

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setValue('logo', reader.result);
          if (show?.logo) setValue('upload', true);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const onSubmit = async (data) => {
    try {
      await addUpdateShow(data, show?._id);
      fetchUser();
    } catch (error) {
      console.error(error);

      reset();
      setError('afterSubmit', { ...error, message: error.message || error });
    }
  };

  return (
    <>
      <Typography variant="h4" component="h3" paragraph>
        Show Info
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack
          sx={{
            mb: 2,
            gap: 2,
            flexDirection,
            alignContent: 'center',
            justifyContent: 'space-between',
            width: isDesktop ? '65%' : '100%',
          }}
        >
          <RHFTextField name="name" label="YOUR SHOW'S NAME" />

          <RHFTextField
            type="url"
            name="website"
            label="YOUR SHOW'S WEBPAGE"
            placeholder="Blog, landing pages, etc"
          />
        </Stack>

        <Stack sx={{ gap: 2, mb: 4, flexDirection }}>
          <Stack sx={{ gap: 2, width: isDesktop ? '65%' : '100%' }}>
            <RHFInputLabel name="logo" label="Upload the show's logo" />
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

          {logo && (
            <Stack flex={1} gap={2}>
              <RHFInputLabel label="Uploaded logo" />
              <img
                alt="uploaded logo"
                src={logo}
                style={{
                  maxWidth: 125,
                  maxHeight: 125,
                  borderRadius: 4,
                  background: '#1B1E22',
                  border: '1px solid #e0e0e0',
                }}
              />
            </Stack>
          )}
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
    </>
  );
}
