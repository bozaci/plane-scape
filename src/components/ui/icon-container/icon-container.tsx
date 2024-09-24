import { FC } from 'react';
import { IconContainerProps } from './icon-container.type';
import cx from 'classnames';

import './icon-container.scss';

const IconContainer: FC<IconContainerProps> = ({ icon, text, href, className }) => {
  return (
    <>
      {href ? (
        <a
          className={cx(
            'icon-container',
            {
              'icon-container--link': href,
            },
            className,
          )}
          href={href}
        >
          <div className="icon-container__icon">{icon}</div>
          <span className="icon-container__text">{text}</span>
        </a>
      ) : (
        <div
          className={cx(
            'icon-container',
            {
              'icon-container--link': href,
            },
            className,
          )}
        >
          <div className="icon-container__icon">{icon}</div>
          <span className="icon-container__text">{text}</span>
        </div>
      )}
    </>
  );
};

export default IconContainer;
