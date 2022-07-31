import {NewQaA} from "../components/QaAForm/NewQaA";
import React from "react";
import {useSelector} from "react-redux";
import {totalQaAItems} from "../reducers/questionAnswer";
import {Questions} from "../components/Questions/Questions";
import {Alert} from "../components/Alert/Alert";
import {ActionSection} from "../components/ActionSection/ActionSection";
import {TooltipWrapper} from "../components/TooltipWrapper/TooltipWrapper";

export const Overview = () => {
  const _totalQaAItems = useSelector(totalQaAItems)
  const questionAnswerSection = _totalQaAItems > 0 ? <Questions/> : <Alert message='No questions yet :-('/>
  const buttonSection = _totalQaAItems > 0 && <ActionSection/>
  return (
    <>
      <TooltipWrapper position='bottom' margin={15} text='Here you can find the created questions and their answers.'>
        <h2>Created question</h2>
      </TooltipWrapper>
      {questionAnswerSection}
      {buttonSection}
      <TooltipWrapper position='bottom' margin={15} text='Here you can create new questions and their answers.'>
        <h2>Created a new question</h2>
      </TooltipWrapper>
      <NewQaA/>
    </>
  )
}
