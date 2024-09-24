import { Link } from 'react-router-dom';

import logoIcon from '@/assets/images/logo-icon.svg';
import './logo.scss';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <div className="logo__img">
        <img src={logoIcon} alt="Logo Icon" />
      </div>

      <h1 className="logo__text">Plane Scape</h1>
    </Link>
  );
};

export default Logo;
