import React from "react";

export interface InputProps {
  value: string,
  name: string,
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const Input: React.FC<InputProps> = ({value, name, onChange, label, ...props}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} onChange={onChange} value={value} {...props}/>
    </div>
  )
}
