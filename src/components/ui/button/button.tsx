import { FC } from 'react';
import { ButtonProps } from './button.type';
import cx from 'classnames';

import './button.scss';

const Button: FC<ButtonProps> = ({ theme, size, isRounded, className, children, ...res }) => {
  return (
    <button
      className={cx(
        'button',
        {
          [`button--theme-${theme}`]: theme,
          [`button--size-${size}`]: size,
          'has-rounded': isRounded,
        },
        className,
      )}
      {...res}
    >
      {children}
    </button>
  );
};

export default Button;
