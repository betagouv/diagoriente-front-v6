import React, { FunctionComponent } from 'react';
import { ReactComponent as Star1Svg } from 'assets/svg/star1.svg';
import { ReactComponent as Star2Svg } from 'assets/svg/star2.svg';
import { ReactComponent as Star3Svg } from 'assets/svg/star3.svg';
import { ReactComponent as Star4Svg } from 'assets/svg/star4.svg';
import classNames from 'common/utils/classNames';

export type StarProps = {
  star: number;
  reverse?: boolean;
};

const Star: FunctionComponent<StarProps> = ({ star = 1, reverse = false }) => {
  const stars = [<Star1Svg />, <Star2Svg />, <Star3Svg />, <Star4Svg />];

  return (
    <div className={classNames('flex space-x-1', reverse ? 'flex-row-reverse space-x-reverse' : 'flex-row')}>
      {Array.from(Array(star)).map((v, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>{stars[index]}</div>
      ))}
    </div>
  );
};

export default Star;
