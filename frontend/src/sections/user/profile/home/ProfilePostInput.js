import { useRef } from 'react';
import { alpha } from '@mui/material/styles';
import { PermMedia, Videocam } from '@mui/icons-material';
import { Card, Button, Fab, Stack, InputBase } from '@mui/material';

export default function ProfilePostInput() {
  const fileInputRef = useRef(null);

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card sx={{ p: 3 }}>
      <InputBase
        multiline
        fullWidth
        rows={4}
        placeholder="Share what you are thinking here..."
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
          <Fab size="small" color="inherit" variant="softExtended" onClick={handleClickAttach}>
            <PermMedia width={24} sx={{ color: 'success.main' }} />
            Image/Video
          </Fab>

          <Fab size="small" color="inherit" variant="softExtended">
            <Videocam width={24} sx={{ color: 'error.main' }} />
            Streaming
          </Fab>
        </Stack>

        <Button variant="contained">Post</Button>
      </Stack>

      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    </Card>
  );
}
