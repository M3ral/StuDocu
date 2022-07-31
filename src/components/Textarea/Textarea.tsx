import React from "react";

export interface TextareaProps {
  value: string,
  name: string,
  label: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export const Textarea: React.FC<TextareaProps> = ({value, name, onChange, label, ...props}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <textarea name={name} onChange={onChange} value={value} {...props}/>
    </div>
  )
}
