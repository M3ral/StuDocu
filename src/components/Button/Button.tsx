import React from "react";
import './Button.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'


export interface ButtonProps {
  onClick: (...arg: any) => void,
  disabled?: boolean,
  variant: ButtonVariant
  children: string
}

export const Button: React.FC<ButtonProps> = ({onClick, disabled = false, variant, ...restProps}, children) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button btn-${variant}`}
      {...restProps}/>
  )
}
