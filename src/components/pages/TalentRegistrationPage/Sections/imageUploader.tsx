import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../_reducer/modal';
import server from '../../../../api/index';
import { CONTAINER, IMAGEBIGDIV, IMAGEDIV, IMAGEP, PLUS, SPAN, IMAGESPAN } from './imageUploaderStyle';

function imageUploader({ imageUrl, setImageUrl }: any): JSX.Element {
  // props로 받아오는 state는 재능 등록할 때 한번에 url을 저장하기 위해서 state를 이미지 업로더에서 바꿔준 후 create 요청시에 body에 담아서 보낸다.
  // preivewPhoto는 재능 등록할 때 즉각적으로 렌더링을 하기 위한 상태이다.
  // ::::::: 따로 나눈 이유 :::::::
  // 1.서버에서 받아온 상태로 렌더링을 할 경우 로딩이 있어서 즉각적으로 렌더링이 되지 않는다. 따라서 바로 렌더링을 하기 위해 따로 상태를 관리한다.
  // 2. URL.createObjectURL()에는 formData 형식이 그대로 들어가야하기 때문에 상태를 나눠서 관리한다.
  const [previewPhoto, setPreviewPhoto] = useState<any>([]);
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
        if (response.data.message === '이미지 등록에 성공했습니다.') {
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
            ? previewPhoto.map((file: string) => (
                <IMAGEP key={Math.random()}>
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
