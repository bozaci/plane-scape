import { FC } from 'react';
import { LoaderProps } from './loader.type';
import { RotatingLines } from 'react-loader-spinner';

import './loader.scss';

const Loader: FC<LoaderProps> = ({ text }) => {
  return (
    <div className="loader">
      <RotatingLines strokeColor="gray" strokeWidth="4" width="20" />
      {text && <span className="loader__text">{text}</span>}
    </div>
  );
};

export default Loader;
