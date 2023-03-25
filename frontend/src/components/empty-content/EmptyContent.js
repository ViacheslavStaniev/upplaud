import PropTypes from 'prop-types';
import { Typography, Stack, Box } from '@mui/material';
import Image from '../image';

EmptyContent.propTypes = {
  sx: PropTypes.object,
  img: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.node,
};

export default function EmptyContent({ title, description, img, sx, ...other }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: 1, textAlign: 'center', p: (theme) => theme.spacing(8, 2), ...sx }}
      {...other}
    >
      <Image
        disabledEffect
        alt="empty content"
        sx={{ height: 240, mb: 3 }}
        src={img || '/assets/illustrations/illustration_empty_content.svg'}
      />

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && <Box sx={{ color: 'text.secondary' }}>{description}</Box>}
    </Stack>
  );
}
