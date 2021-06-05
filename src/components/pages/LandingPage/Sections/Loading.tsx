import React from 'react';
import { CONTAINER, LOADING } from './LoadingStyle';

interface Props {
  size: string;
}

function Loading({ size }: Props): JSX.Element {
  return (
    <CONTAINER>
      <LOADING size={size} />
    </CONTAINER>
  );
}

export default Loading;
