import RecordRTC from 'recordrtc';
import Simplebar from 'simplebar-react';
import { isMobile } from 'react-device-detect';
import { PlusOutlined } from '@ant-design/icons';
import { FILE_TYPE } from '../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { uploadAudio, deleteFile } from '../../../reducers/fileSlice';
import { Spin, List, Form, Input, Button, Typography, Modal, Select, Popconfirm } from 'antd';

const { Paragraph } = Typography;

export default function PollAudioRecord() {
  const form = Form.useFormInstance();
  const [state, setState] = useState({
    blob: null,
    open: false,
    audioName: '',
    timeLeft: 120,
    recorder: null,
    audioDuration: 0,
    isRecording: false,
    recordingStartedAt: null,
  });

  const updateState = (newState) => setState((prevState) => ({ ...prevState, ...newState }));

  const {
    blob,
    open,
    audioName,
    timeLeft,
    audioDuration,
    recorder,
    isRecording,
    recordingStartedAt,
  } = state;

  // Redux States
  const dispatch = useDispatch();
  const { files, isLoading, isUploading } = useSelector(({ files }) => files);
  const audios = files.filter(({ type }) => type === FILE_TYPE.AUDIO);

  const getAudioFileName = () => {
    const localeTimeStr = new Date()
      .toLocaleString()
      .replaceAll(',', '')
      .replaceAll(':', '')
      .replaceAll('/', '')
      .replaceAll(' ', '_');
    return `Recording_${localeTimeStr}.webm`;
  };

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

      const audioDuration = Math.floor((Date.now() - recordingStartedAt) / 1000);

      updateState({
        audioDuration,
        recorder: null,
        blob: audioBlob,
        isRecording: false,
        audioName: getAudioFileName(),
      });
    });
  }, [recorder, recordingStartedAt]);

  // Save Recording
  const onSaveRecording = async () => {
    const formData = new FormData();
    formData.append('duration', audioDuration);
    formData.append('audio', blob, audioName || getAudioFileName());

    dispatch(uploadAudio(formData));
    updateState({ blob: null, audioName: '' });
  };

  useEffect(() => {
    if (recordingStartedAt) {
      window.interval = setInterval(() => {
        const timeLeft = 120 - Math.floor((Date.now() - recordingStartedAt) / 1000);
        if (timeLeft <= 0) stopRecording();
        else updateState({ timeLeft });
      }, 1000);
    }
  }, [recordingStartedAt, stopRecording]);

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
      <Form.Item name="audioDuration" hidden />

      <div className={`flex-item gap-2 mb-2 ${isMobile && 'flex-column'}`}>
        <Form.Item name="audio" label="Audio" className={`m-0 ${isMobile ? 'w-100' : 'w-40'}`}>
          <Select
            loading={isLoading}
            disabled={isLoading}
            className="minw-200px"
            placeholder="Select an Audio"
            options={audios.map(({ _id, name, duration = 0 }) => ({
              label: name,
              value: _id,
              duration,
            }))}
            onChange={(value, { duration }) => form.setFieldValue('audioDuration', duration)}
          />
        </Form.Item>

        <Button type="link" icon={<PlusOutlined />} onClick={() => updateState({ open: true })}>
          ADD/MANAGE AUDIOS
        </Button>
      </div>

      <Modal
        centered
        open={open}
        footer={false}
        maskClosable={false}
        title="Add/Manage Audios"
        width={isMobile ? '100%' : 600}
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

          {blob && (
            <Form.Item label="File Name (Optional)">
              <Input
                value={audioName}
                disabled={isRecording}
                placeholder="Enter file name"
                onChange={(e) => updateState({ audioName: e.target.value })}
              />
            </Form.Item>
          )}

          <div className={`flex-item gap-1 mb-1 ${isMobile && 'flex-column'}`}>
            <Button
              block={isMobile}
              htmlType="button"
              onClick={startRecording}
              loading={isRecording}
            >
              {isRecording ? (
                <>
                  Recording... <span>{secondsToMinutes(timeLeft)}</span>{' '}
                </>
              ) : (
                'Start Recording'
              )}
            </Button>

            <Button
              block={isMobile}
              htmlType="button"
              onClick={stopRecording}
              disabled={!isRecording}
            >
              Stop Recording
            </Button>

            <Button
              block={isMobile}
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
            size="small"
            footer={false}
            bordered={false}
            loading={isLoading}
            dataSource={audios}
            header="Available Audios"
            renderItem={({ _id, name }, i) => (
              <List.Item
                className="pl-0 pr-0"
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
