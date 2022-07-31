import {QaAForm} from "./QaAForm";
import {addNew, addQuestionAndAnswer, isLoading, QuestionAndAnswer} from "../../reducers/questionAnswer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {useState} from "react";
import {Checkbox} from "../Checkbox/Checkbox";

export const NewQaA = () => {
  const _isLoading = useSelector(isLoading)
  const dispatch = useDispatch<AppDispatch>()
  const [isAsync, setIsAsync] = useState(false)

  const handleSubmit = ({question, answer}: QuestionAndAnswer) => {
    if (isAsync) {
      dispatch(addNew({question, answer}));
    } else {
      dispatch(addQuestionAndAnswer({question, answer}));
    }
  }

  return (
    <QaAForm
      questionInitialState=''
      answerInitialState=''
      buttonLabel={_isLoading ? 'Creating new question...' : 'Create question'}
      onSubmit={handleSubmit}
      children={
        <Checkbox
          id="isAsync"
          checked={isAsync}
          onClick={() => setIsAsync(!isAsync)}
          label='Asynchronous submission'
        />
      }
    />
  )
}
