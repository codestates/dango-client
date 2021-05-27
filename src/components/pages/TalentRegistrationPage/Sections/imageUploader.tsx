import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../_reducer/modal';
import server from '../../../../api/index';

const CONTAINER = styled.div`
  display: grid;
  place-items: center;
  grid-column: 10/13;
  grid-row: 3/12;
  box-shadow: 1px 1px 3px 1px #dadce0;
  margin-right: 1rem;
`;

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
      <div
        style={{
          width: 300,
          height: 300,
          maxWidth: 300,
          border: '1px solid lightgray',
          display: 'flex',
        }}
        {...getRootProps({ className: 'dropzone' })}
      >
        <input {...getInputProps()} />
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', boxSizing: 'border-box' }}>
          {images.length !== 0
            ? images.map((file: string) => (
                <p
                  key={file}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 146,
                    height: 146,
                    overflowX: 'scroll',
                    border: '1px solid',
                    position: 'relative',
                  }}
                >
                  <img alt={file} src={URL.createObjectURL(file)} />
                </p>
              ))
            : ''}
        </div>
      </div>
    </CONTAINER>
  );
}

export default imageUploader;
