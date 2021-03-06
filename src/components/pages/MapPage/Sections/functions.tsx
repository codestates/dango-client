import React from 'react';
import { ReactComponent as StarSvg } from '../../../../images/star.svg';

export function handleCategory(category: string): string {
  switch (category) {
    case 'ν/λ¦¬λΉ':
      return 'π‘';
    case 'λΉμ¦λμ€':
      return 'π';
    case 'κ°λ°/λμμΈ':
      return 'π»';
    case 'κ±΄κ°':
      return 'π';
    case 'λ μ¨':
      return 'π§π»βπ«';
    case 'λ°λ €λλ¬Ό':
      return 'πΆ';
    case 'κΈ°ν':
      return 'π‘';
    default:
      return 'π‘';
  }
}

export function handleStarRatings(ratings: number | undefined): JSX.Element {
  switch (true) {
    case ratings !== undefined && ratings >= 4.5:
      return (
        <>
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
        </>
      );
    case ratings !== undefined && ratings < 4.5 && ratings >= 3.5:
      return (
        <>
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
        </>
      );
    case ratings !== undefined && ratings < 3.5 && ratings >= 2.5:
      return (
        <>
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
        </>
      );
    case ratings !== undefined && ratings < 2.5 && ratings >= 1.5:
      return (
        <>
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
        </>
      );
    case ratings !== undefined && ratings < 1.5 && ratings >= 0.5:
      return (
        <>
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
        </>
      );
    default:
      return (
        <>
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
        </>
      );
  }
}
