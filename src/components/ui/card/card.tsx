import { FC } from 'react';
import { CardProps } from './card.type';
import cx from 'classnames';

import './card.scss';

const Card: FC<CardProps> = ({ data }) => {
  const { backgroundImage, icon, text, href, isLink, as = 'div' } = data;
  const Element = isLink ? 'a' : as;

  return (
    <Element
      href={href}
      className={cx('card', {
        'card--link': isLink,
      })}
    >
      <div className="card__inner">
        <div className="card__icon">{icon}</div>
        <p className="card__text">{text}</p>
      </div>

      <div className="card__bg-image-container">
        <img src={backgroundImage} alt={text} className="card__bg-img" />
      </div>
    </Element>
  );
};

export default Card;
