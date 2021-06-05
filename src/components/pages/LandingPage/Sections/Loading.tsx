import React from 'react';
import { CONTAINER, LOADING } from './LoadingStyle';

interface Props {
  loading: boolean;
  size: string;
}

function Loading({ loading, size }: Props): JSX.Element {
  return (
    <CONTAINER loading={loading}>
      <LOADING size={size} />
    </CONTAINER>
  );
}

export default Loading;
