import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'default' | 'primary' | 'primary-ghost';
  size?: 'normal' | 'small';
  isRounded?: boolean;
  className?: string;
  children: React.ReactNode;
}
