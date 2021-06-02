import React from 'react';
import { ReactComponent as StarSvg } from '../../../../images/star.svg';

// 카테고리를 이모티콘으로 렌더
export function handleCategory(category: string): string {
  switch (category) {
    case '홈/리빙':
      return '🏠';
    case '비즈니스':
      return '📄';
    case '개발/디자인':
      return '💻';
    case '건강':
      return '💊';
    case '레슨':
      return '🧑🏻‍🏫';
    case '반려동물':
      return '🐶';
    case '기타':
      return '🤔';
    default:
      return '🍡';
  }
}

// 별점 평균 범위별로 렌더
export function handleStarRatings(ratings: number | undefined): JSX.Element {
  switch (true) {
    case ratings !== undefined && ratings >= 4.5: // 별 다섯 개
      return (
        <>
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
        </>
      );
    case ratings !== undefined && ratings < 4.5 && ratings >= 3.5: // 별 네 개
      return (
        <>
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
        </>
      );
    case ratings !== undefined && ratings < 3.5 && ratings >= 2.5: // 별 세 개
      return (
        <>
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
        </>
      );
    case ratings !== undefined && ratings < 2.5 && ratings >= 1.5: // 별 두 개
      return (
        <>
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#ffdb58" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
          <StarSvg style={{ marginRight: '3px' }} fill="#dcdcdc" />
        </>
      );
    case ratings !== undefined && ratings < 1.5 && ratings >= 0.5: // 별 한 개
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
      // 별 0개 or 별점 없음
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
