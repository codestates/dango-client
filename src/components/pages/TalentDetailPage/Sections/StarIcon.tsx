import React from 'react';
import { ReactComponent as StarSvg } from '../../../../images/star.svg';

interface Props {
  fillColor: string;
}

const StarIcon = ({ fillColor }: Props): JSX.Element => {
  return <StarSvg style={{ marginRight: '3px' }} fill={fillColor} />;
};

export default StarIcon;
