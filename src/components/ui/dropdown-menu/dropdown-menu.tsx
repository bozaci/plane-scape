import { useRef, FC } from 'react';
import { DropdownMenuProps } from './dropdown-menu.type';
import { useOnClickOutside } from 'usehooks-ts';
import cx from 'classnames';

import './dropdown-menu.scss';

const DropdownMenu: FC<DropdownMenuProps> = ({ options = [], setOptions, className, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleShowMenu = () => {
    ref.current?.classList.toggle('is-active');
  };

  const handleCloseMenu = () => {
    ref.current?.classList.remove('is-active');
  };

  const handleSelectItem = (item: any) => {
    const newOptions = [...options];
    options.forEach((option) => {
      option.isSelected = false;
    });
    setOptions(newOptions);
    item.isSelected = true;
    handleCloseMenu();
  };

  useOnClickOutside(ref, handleCloseMenu);

  return (
    <div ref={ref} className={cx('dropdown-menu', className)}>
      <div onClick={handleShowMenu} className="dropdown-menu__inner">
        {children}
      </div>

      <div className="dropdown-menu__menu">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelectItem(option)}
            className={cx('dropdown-menu__item', {
              'is-selected': option.isSelected,
            })}
          >
            <span className="dropdown-menu__text dropdown-menu__text--white">{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
