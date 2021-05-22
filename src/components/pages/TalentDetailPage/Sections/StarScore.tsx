import React, { useMemo } from 'react';
import { ReactComponent as StarSvg } from '../../../../images/star.svg';

interface StarsProps {
  index: number;
  rating: number;
  hoverRating: number;
  onMouseEnter: (idx: number) => void;
  onMouseLeave: () => void;
  onSaveRating: (idx: number) => void;
}

const YELLOW = '#ffdb58';
const GREY = '#dcdcdc';

function StarScore({ index, rating, hoverRating, onMouseEnter, onMouseLeave, onSaveRating }: StarsProps): JSX.Element {
  const fillColor = useMemo(() => {
    if (hoverRating >= index) {
      return YELLOW;
    }
    if (!hoverRating && rating >= index) {
      return YELLOW;
    }
    return GREY;
  }, [rating, hoverRating, index]);

  return (
    <span
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <StarSvg style={{ marginRight: '3px' }} fill={fillColor} />
    </span>
  );
}

export default StarScore;
