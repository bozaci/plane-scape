import { FC } from 'react';
import { RadioProps } from './radio.type';

import './radio.scss';

const Radio: FC<RadioProps> = ({ text, ...res }) => {
  return (
    <label className="radio-container">
      <input type="radio" className="radio" {...res} />
      {text && <span className="radio-container__text">{text}</span>}
    </label>
  );
};

export default Radio;
