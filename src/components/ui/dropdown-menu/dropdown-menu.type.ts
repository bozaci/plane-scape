import React from 'react';

export type optionsType = {
  name: string;
  value: string;
  isSelected?: boolean;
};

export interface DropdownMenuProps {
  options: optionsType[];
  setOptions: any;
  className?: string;
  children: React.ReactNode;
}
