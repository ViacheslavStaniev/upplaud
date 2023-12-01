import RecordRTC from 'recordrtc';
import Simplebar from 'simplebar-react';
import { PlusOutlined } from '@ant-design/icons';
import { FILE_TYPE } from '../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { uploadAudio, deleteFile } from '../../../reducers/fileSlice';
import { Spin, List, Form, Button, Typography, Modal, Select, Popconfirm } from 'antd';

const { Paragraph } = Typography;

export default function PollAudioRecord() {
  const [state, setState] = useState({
    blob: null,
    open: false,
    timeLeft: 120,
    recorder: null,
    isRecording: false,
    recordingStartedAt: null,
  });

  const updateState = (newState) => setState((prevState) => ({ ...prevState, ...newState }));

  const { blob, open, timeLeft, recorder, isRecording, recordingStartedAt } = state;

  // Redux States
  const dispatch = useDispatch();
  const { files, isLoading, isUploading } = useSelector(({ files }) => files);
  console.log('files', files);
  const audios = files.filter(({ type }) => type === FILE_TYPE.AUDIO);

  // Start Recording
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true } }).then((stream) => {
      const recordObj = new RecordRTC(stream, {
        type: 'audio',
        bufferSize: 4096,
        sampleRate: 44100,
        audioBitsPerSecond: 128000,
      });
      recordObj.stream = stream;
      recordObj.startRecording();
      updateState({ isRecording: true, recorder: recordObj, recordingStartedAt: Date.now() });
    });
  };

  // Stop Recording
  const stopRecording = useCallback(() => {
    if (window.interval) clearInterval(window.interval);

    recorder.stopRecording(() => {
      const audioBlob = new Blob([recorder.getBlob()], { type: 'audio/webm' });
      recorder.stream.stop();
      updateState({ blob: audioBlob, isRecording: false, recorder: null });
    });
  }, [recorder]);

  // Save Recording
  const onSaveRecording = async () => {
    const formData = new FormData();
    formData.append('audio', blob, 'audio.webm');
    dispatch(uploadAudio(formData));
  };

  useEffect(() => {
    if (recordingStartedAt) {
      window.interval = setInterval(() => {
        const timeLeft = 120 - Math.floor((Date.now() - recordingStartedAt) / 1000);
        if (timeLeft <= 0) stopRecording();
        else updateState({ timeLeft });
      }, 1000);
    }
  }, [recordingStartedAt]);

  // Seconds to mm:ss
  const secondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes} :${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  return (
    <>
      <div className="flex-item gap-2 mb-2">
        <Form.Item name="audio" label="Audio" className="w-40 m-0">
          <Select
            loading={isLoading}
            disabled={isLoading}
            className="minw-200px"
            placeholder="Select an Audio"
            options={audios.map(({ _id, name }) => ({ label: name, value: _id }))}
          />
        </Form.Item>

        <Button type="link" icon={<PlusOutlined />} onClick={() => updateState({ open: true })}>
          ADD/MANAGE AUDIOS
        </Button>
      </div>

      <Modal
        centered
        width={600}
        open={open}
        footer={false}
        maskClosable={false}
        title="Add/Manage Audios"
        onCancel={() => updateState({ blob: null, open: false })}
      >
        <Paragraph strong className="m-0">
          Record New Audio
        </Paragraph>
        <Paragraph type="secondary">
          Max 2 minutes. The recording will auto stop after two minutes.
        </Paragraph>
        <Spin spinning={isLoading} tip="Uploading...">
          <audio src={blob ? URL.createObjectURL(blob) : ''} controls className="w-100 mb-1" />

          <div className="flex-item gap-1 mb-1">
            <Button htmlType="button" onClick={startRecording} loading={isRecording}>
              {isRecording ? (
                <>
                  Recording... <span>{secondsToMinutes(timeLeft)}</span>{' '}
                </>
              ) : (
                'Start Recording'
              )}
            </Button>

            <Button htmlType="button" onClick={stopRecording} disabled={!isRecording}>
              Stop Recording
            </Button>

            <Button
              type="primary"
              htmlType="button"
              loading={isUploading}
              onClick={onSaveRecording}
              disabled={!blob || isRecording}
            >
              Save Recording
            </Button>
          </div>
        </Spin>

        <Simplebar style={{ maxHeight: 420, paddingRight: 10 }}>
          <List
            footer={false}
            bordered={false}
            loading={isLoading}
            dataSource={audios}
            header="Available Audios"
            renderItem={({ _id, name }, i) => (
              <List.Item
                actions={[
                  <Popconfirm
                    key="delete"
                    okText="Yes"
                    cancelText="No"
                    title="Delete"
                    onConfirm={() => dispatch(deleteFile(_id))}
                    description="Are you sure to delete this Audio?"
                  >
                    <Button danger size="small">
                      Delete
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta title={`${i + 1}. ${name}`} style={{ alignItems: 'center' }} />
              </List.Item>
            )}
          />
        </Simplebar>
      </Modal>
    </>
  );
}
