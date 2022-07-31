import {Button} from "../Button/Button";
import React from "react";
import {useDispatch} from "react-redux";
import {removeAllQuestionAndAnswers, sortQuestions,} from "../../reducers/questionAnswer";

export const ActionSection = () => {
  const dispatch = useDispatch()

  return (
    <div className='button-container' data-testid='action-section'>
      <Button onClick={() => dispatch(sortQuestions())} variant="primary">Sort</Button>
      <Button onClick={() => dispatch(removeAllQuestionAndAnswers())} variant="tertiary">Remove questions</Button>
    </div>
  )
}
