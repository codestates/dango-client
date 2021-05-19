import React from 'react';
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';
import styled from 'styled-components';
import 'react-dropzone-uploader/dist/styles.css';

// import server from '../../../..//api/index'

const CONTAINER = styled.div`
  display: grid;
  place-items: center;
  grid-column: 10/13;
  grid-row: 3/12;
  border: 1px solid blue;
`;

function imageUploader(): JSX.Element {
  // const getUploadParams = async ({ meta: { name } }) => {
  //     const { fields, uploadUrl, fileUrl } = await server.getPresignedUploadParams(name)
  //     return { fields, meta: { fileUrl }, url: uploadUrl }
  // }

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    console.log(allFiles);
    alert('파일이 업로드 되었습니다!');
    // allFiles.forEach(f => f.remove())
  };

  return (
    <CONTAINER>
      <Dropzone
        // getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxFiles={3}
        autoUpload={false}
        submitButtonContent="Upload"
        inputContent=" + files "
        inputWithFilesContent={(files) => `+ ${3 - files.length} More`}
        styles={{
          dropzone: {
            width: 350,
            height: 350,
            borderWidth: 2,
            borderRadius: 2,
            borderColor: '#eeeeee',
            borderStyle: 'dashed',
            backgroundColor: '#fafafa',
            color: '#bdbdbd',
            outline: 'none',
            transition: 'border .24s ease-in-out',
          },
          preview: {
            justifyContent: 'center',
            minHeight: 220,
          },
          previewImage: {
            maxHeight: 200,
            maxWidth: 200,
          },
        }}
      />
    </CONTAINER>
  );
}

export default imageUploader;
