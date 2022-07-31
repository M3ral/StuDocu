import {useSelector} from "react-redux";
import React from "react";
import {totalQaAItems} from "../../reducers/questionAnswer";
import './Feedback.scss'

export const Feedback = () => {
  const _totalQaAItems = useSelector(totalQaAItems)

  return (
    <div className='feedback-container'>
      <p>{`Here you can find ${_totalQaAItems > 0 ? _totalQaAItems : 'no'} questions. Feel free to create your own questions!`}</p>
    </div>
  )
}
