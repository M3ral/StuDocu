import {useSelector} from "react-redux";
import {IRootState} from "../../store";
import {QuestionAnswerSlice} from "../../reducers/questionAnswer";
import {Accordion} from "../Accordion/Accordion";
import {useMemo} from "react";

export const Questions = () => {
  const {data} = useSelector<IRootState, QuestionAnswerSlice>((state) => state.questionsAndAnswers)
  const list = useMemo(() => data.map((props) =>
    <Accordion key={props.id} {...props}/>), [data])

  return (
    <div data-testid='questions' style={{marginBottom: '15px'}}>
      {list}
    </div>
  )
}
