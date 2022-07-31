import React from "react";
import './Checkbox.scss'

export interface CheckboxProps {
  label: string
  checked: boolean,
  onClick: () => void,
  id: string
}

export const Checkbox: React.FC<CheckboxProps> = ({label, checked, onClick, id}) => {
  return (
    <div className='checkbox'>
      <input type="checkbox" id={id} checked={checked} onChange={onClick}/>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
