import { FC } from 'react';
import { InputGroupProps } from './input-group.type';

import './input-group.scss';

const InputGroup: FC<InputGroupProps> = ({ children }) => {
  return <div className="input-group">{children}</div>;
};

export default InputGroup;
