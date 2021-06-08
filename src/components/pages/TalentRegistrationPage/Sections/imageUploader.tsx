import React, { useState, memo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../_reducer/modal';
import server from '../../../../api/index';
import { CONTAINER, IMAGEBIGDIV, IMAGEDIV, IMAGEP, PLUS, SPAN, IMAGESPAN } from './imageUploaderStyle';

interface File {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  path: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

function imageUploader({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string[];
  setImageUrl: (imageUrl: string[]) => void;
}): JSX.Element {
  const [previewPhoto, setPreviewPhoto] = useState<File[]>([]);
  const dispatch = useDispatch();
  const formData = new FormData();
  const imageUploadHandler = (acceptedFiles: any) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    for (let i = 0; i < acceptedFiles.length; i++) {
      formData.append('file', acceptedFiles[i]);
    }
    setPreviewPhoto([...previewPhoto, ...acceptedFiles]);

    server
      .post('/images/upload', formData, config)
      .then((response) => {
        if (response.status === 200) {
          setImageUrl(imageUrl.concat(response.data.data));
        }
      })
      .catch(() => dispatch(openModal({ type: 'error', text: '이미지 저장에 실패했습니다.' })));
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
          {previewPhoto.length !== 0
            ? previewPhoto.map((file: File) => (
                <IMAGEP key={Math.random()}>
                  <img alt="" src={URL.createObjectURL(file)} />
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

export default memo(imageUploader);
