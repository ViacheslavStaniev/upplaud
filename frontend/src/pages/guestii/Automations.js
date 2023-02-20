import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Stack, Button } from '@mui/material';
import { useSettingsContext } from '../../components/settings';
import CustomTable from '../../components/table/CustomTable';

const automationData = [
  {
    id: 1,
    name: 'Tikam Chand',
    recordingDate: new Date().toDateString(),
    status: {
      host: { posted: 2, date: new Date().toDateString() },
      guest: { posted: 2, date: new Date().toDateString() },
    },
    asqs: null,
    todo: '',
  },
  {
    id: 2,
    name: 'Suraj Jha',
    recordingDate: new Date().toDateString(),
    status: {
      host: { posted: 1, date: new Date().toDateString() },
      guest: { posted: 3, date: new Date().toDateString() },
    },
    asqs: null,
    todo: '',
  },
  {
    id: 3,
    name: 'Narendra Singh',
    recordingDate: new Date().toDateString(),
    status: {
      host: { posted: 1, date: new Date().toDateString() },
      guest: { posted: 0, date: new Date().toDateString() },
    },
    asqs: null,
    todo: '',
  },
  {
    id: 4,
    name: 'John Doe',
    recordingDate: new Date().toDateString(),
    status: {
      host: { posted: 2, date: new Date().toDateString() },
      guest: { posted: 2, date: new Date().toDateString() },
    },
    asqs: { g: 3, h: 2, n: 5 },
    todo: 'Reconnect Socials',
  },
  {
    id: 5,
    name: 'Bhupendra Kumar',
    recordingDate: new Date().toDateString(),
    status: {
      host: { posted: 2, date: new Date().toDateString() },
      guest: { posted: 2, date: new Date().toDateString() },
    },
    asqs: null,
    todo: '',
  },
  {
    id: 6,
    name: 'Dilip Kumar',
    recordingDate: new Date().toDateString(),
    status: {
      host: { posted: 2, date: new Date().toDateString() },
      guest: { posted: 2, date: new Date().toDateString() },
    },
    asqs: null,
    todo: '',
  },
  {
    id: 7,
    name: 'Ramraj M',
    recordingDate: new Date().toDateString(),
    status: {
      host: { posted: 2, date: new Date().toDateString() },
      guest: { posted: 2, date: new Date().toDateString() },
    },
    asqs: null,
    todo: '',
  },
  {
    id: 8,
    name: 'Jivansh M',
    recordingDate: new Date().toDateString(),
    status: {
      host: { posted: 2, date: new Date().toDateString() },
      guest: { posted: 2, date: new Date().toDateString() },
    },
    asqs: null,
    todo: '',
  },
  {
    id: 9,
    name: 'Kartik D',
    recordingDate: new Date().toDateString(),
    status: {
      host: { posted: 2, date: new Date().toDateString() },
      guest: { posted: 2, date: new Date().toDateString() },
    },
    asqs: null,
    todo: '',
  },
  {
    id: 10,
    name: 'Durgesh Kumhar',
    recordingDate: new Date().toDateString(),
    status: {
      host: { posted: 0, date: new Date().toDateString() },
      guest: { posted: 0, date: new Date().toDateString() },
    },
    asqs: null,
    todo: '',
  },
];

export default function Automations() {
  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState(automationData);

  const tableHead = [
    { id: 'name', label: 'NAME', align: 'left' },
    { id: 'recordingDate', label: 'RECORDING DATE', align: 'left' },
    { id: 'status', label: 'STATUS', align: 'center' },
    { id: 'asqs', label: 'ASQs', align: 'center' },
    { id: 'todo', label: 'TASK TO DO', align: 'center' },
    { id: 'action', label: 'ACTIONS', align: 'right' },
  ];

  return (
    <>
      <Helmet>
        <title> Automations | {process.env.REACT_APP_APP_NAME}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Automations
        </Typography>

        <Stack sx={{ flexDirection: 'row', gap: 3, marginBottom: 3 }}>
          <Typography flex={1}>
            Here you can manage the automation of your guests & track the number of audience
            submissions connected to your Guest, Host (you), or Neither. You can also export the
            Submissions for each guest, featuring participants’ names, emails, questions & Audio Ask
            files.
          </Typography>

          <Box flex="inherit">
            <Button
              fullWidth
              color="info"
              size="large"
              type="button"
              shape="circular"
              variant="contained"
            >
              REMIND INVITES
            </Button>
          </Box>
        </Stack>

        <CustomTable tableData={tableData} tableHead={tableHead} setTableData={setTableData} />
      </Container>
    </>
  );
}
