import { FC } from 'react';
import { InputProps } from './input.type';
import cx from 'classnames';

import './input.scss';

const Input: FC<InputProps> = ({ type = 'text', icon, ...res }) => {
  return (
    <label className="input-container">
      <div className="input-container__icon">{icon}</div>
      <input
        type={type}
        className={cx('input', {
          'has-icon': icon,
        })}
        {...res}
      />
    </label>
  );
};

export default Input;
