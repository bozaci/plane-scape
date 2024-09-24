import { FC } from 'react';
import { AccountProps } from './account.type';
import cx from 'classnames';
import './account.scss';

const Account: FC<AccountProps> = ({ avatar, name, className }) => {
  return (
    <div className={cx('account', className)}>
      <div className="account__avatar">
        <img src={avatar} alt={name} className="account__avatar-img" />
      </div>

      <span className="account__text">{name}</span>
    </div>
  );
};

export default Account;
