import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import {
  Box,
  Alert,
  Stack,
  Button,
  Accordion,
  Typography,
  InputAdornment,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import FormProvider, { RHFTextField, RHFEditor, RHFInputLabel } from '../../components/hook-form';

TemplateEditor.propTypes = {
  item: PropTypes.object,
  expanded: PropTypes.bool,
  onExpand: PropTypes.func,
};

export default function TemplateEditor({ item, expanded, onExpand }) {
  const { enqueueSnackbar } = useSnackbar();

  const { key, subject, emailText, afterDays, title } = item;

  const defaultValues = { subject, emailText, afterDays };
  const methods = useForm({ defaultValues });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  if (errors) console.log('errors', errors);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      reset(defaultValues);
      enqueueSnackbar('Invitation saved successfully!');
    } catch (error) {
      console.error(error);

      reset();
      setError('afterSubmit', { ...error, message: error.message || error });
    }
  };

  return (
    <Accordion expanded={expanded} onChange={onExpand}>
      <AccordionSummary
        sx={{ color: expanded ? '#8F24B2' : '' }}
        expandIcon={expanded ? <RemoveCircleOutline /> : <AddCircleOutline />}
      >
        <Typography variant="subtitle1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} marginTop={2} marginBottom={2}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

            <RHFTextField
              name="subject"
              label="SUBJECT"
              placeholder="Enter your subject"
              InputProps={{
                startAdornment: <InputAdornment position="start">{key} try</InputAdornment>,
              }}
            />

            <RHFEditor name="emailText" id={`editor${key}`} />

            <Box>
              <RHFInputLabel label="Mandatory uneditable end of email:" />
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  padding: 5,
                  fontSize: 24,
                  borderRadius: 2,
                  bgcolor: 'background.neutral',
                }}
              >
                Please click this button to connect your social media & automate your episode
                promotion:
              </Typography>
            </Box>
          </Stack>

          <Stack gap={2} flexDirection="row" marginTop={4}>
            <LoadingButton
              color="info"
              size="large"
              type="submit"
              shape="circular"
              variant="contained"
              loading={isSubmitting}
            >
              SAVE EDITS
            </LoadingButton>

            <Button size="large" type="button" shape="circular" variant="outlined">
              REVERT TO ORIGINAL
            </Button>
          </Stack>
        </FormProvider>
      </AccordionDetails>
    </Accordion>
  );
}
