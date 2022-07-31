import React from "react";
import './Alert.scss'

export interface AlertProps {
  message: string
}

export const Alert: React.FC<AlertProps> = ({message}) => {
  return (
    <div className='alert alert-error'>
      <span>{message}</span>
    </div>
  )
}
