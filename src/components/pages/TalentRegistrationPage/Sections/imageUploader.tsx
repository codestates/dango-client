import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../_reducer/modal';
import server from '../../../../api/index';
import { CONTAINER, IMAGEBIGDIV, IMAGEDIV, IMAGEP, PLUS, SPAN, IMAGESPAN } from './imageUploaderStyle';

function imageUploader({ imageUrl, setImageUrl }: any): JSX.Element {
  const dispatch = useDispatch();

  const formData = new FormData();
  const imageUploadHandler = (acceptedFiles: any) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    if (acceptedFiles.length > 1) {
      acceptedFiles.map((file: any, index: number) => formData.append('file', file[index].path));
    } else {
      formData.append('file', acceptedFiles[0].path);
    }

    server.post('/images/upload', formData, config).then((response) => {
      if (response.data.message === '이미지 등록에 성공했습니다.') {
        setImageUrl([...imageUrl, ...response.data.data]);
      } else {
        dispatch(openModal({ type: 'error', text: '이미지 저장에 실패했습니다.' }));
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: imageUploadHandler,
    maxFiles: 3,
  });

  return (
    <CONTAINER>
      <IMAGESPAN>이미지 업로드 (최대 3장)</IMAGESPAN>
      <IMAGEBIGDIV {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <IMAGEDIV>
          {imageUrl.length !== 0
            ? imageUrl.map((file: string) => (
                <IMAGEP key={Math.random()}>
                  <img alt={file} src={imageUrl} />
                </IMAGEP>
              ))
            : ''}
        </IMAGEDIV>
        <PLUS>
          <SPAN>+</SPAN>
        </PLUS>
      </IMAGEBIGDIV>
    </CONTAINER>
  );
}

export default imageUploader;
