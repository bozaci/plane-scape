import { FC } from 'react';
import cx from 'classnames';
import { AlertBoxProps } from './alert-box.type';
import * as Icon from 'phosphor-react';

import './alert-box.scss';

const AlertBox: FC<AlertBoxProps> = ({ status, text }) => {
  return (
    <div
      className={cx('alert-box', {
        [`alert-box--status-${status}`]: status,
      })}
    >
      <div className="alert-box__icon">
        {status === 'error' && <Icon.XCircle />}
        {status === 'warning' && <Icon.Warning />}
      </div>

      <p className="alert-box__text">{text}</p>
    </div>
  );
};

export default AlertBox;
