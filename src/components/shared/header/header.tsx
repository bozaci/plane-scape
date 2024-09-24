import * as Icon from 'phosphor-react';

import Logo from '@/components/ui/logo';
import Account from '@/components/ui/account';
import IconContainer from '@/components/ui/icon-container';
import userAvatarImage from '@/assets/images/user-avatar.png';

import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__left-side">
            <Logo />
          </div>

          <div className="header__right-side">
            <IconContainer
              icon={<Icon.Tag weight="fill" />}
              text="Deals"
              className="me-1 hidden--mobile-or-tablet"
            />
            <IconContainer
              icon={<Icon.GlobeHemisphereWest weight="fill" />}
              text="Discover"
              className="me-1 hidden--mobile-or-tablet"
            />
            <IconContainer
              icon={<Icon.Airplane weight="fill" />}
              text="My Flights"
              href="/my-flights"
              className="me-3"
            />
            <Account
              avatar={userAvatarImage}
              name="Joane Smith"
              className="hidden--mobile-or-tablet"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
