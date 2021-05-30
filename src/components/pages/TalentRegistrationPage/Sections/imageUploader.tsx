import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../_reducer/modal';
import server from '../../../../api/index';
import { CONTAINER, IMAGEBIGDIV, IMAGEDIV, IMAGEP, PLUS, SPAN, IMAGESPAN } from './imageUploaderStyle';

function imageUploader(): JSX.Element {
  const dispatch = useDispatch();
  const [images, setImages] = useState<any>([]);

  const formData = new FormData();
  const imageUploadHandler = (acceptedFiles: any) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    formData.append('file', acceptedFiles[0]);
    server.post('/images/upload', formData, config).then((response) => {
      if (response.data.succeess) {
        setImages([...images, response.data.filePath]);
      } else {
        dispatch(openModal({ type: 'error', text: '이미지 저장에 실패했습니다.' }));
      }
    });
  };

  // 테스트용
  const onDrop = (acceptedFiles: any) => {
    formData.append('file', acceptedFiles[0]);
    setImages([...(images || []), ...acceptedFiles]);
  };
  console.log(images);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
    maxFiles: 3,
  });

  return (
    <CONTAINER>
      <IMAGESPAN>이미지 업로드 (최대 3장)</IMAGESPAN>
      <IMAGEBIGDIV {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <IMAGEDIV>
          {images.length !== 0
            ? images.map((file: string) => (
                <IMAGEP key={file}>
                  <img alt={file} src={URL.createObjectURL(file)} />
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
