import {QaAForm} from "./QaAForm";
import {QuestionAndAnswer, QuestionAnswerSlice, updateQuestionAndAnswer} from "../../reducers/questionAnswer";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../store";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


export const UpdateQaA = () => {
  const {data} = useSelector<IRootState, QuestionAnswerSlice>((state) => state.questionsAndAnswers)
  const {qaId} = useParams()
  const [state, setState] = useState({
    question: '', answer: ''
  })
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const getItemIndex = (id: string) => data.findIndex((item) => item.id === id)
    if (qaId !== undefined) {

      const index = getItemIndex(qaId)
      if (index >= 0) {
        const item = data[index]
        setState({
          question: item.question,
          answer: item.question
        })
      } else {
        navigate("/");
      }
    }
  }, [qaId, data, navigate])

  const handleUpdate = ({question, answer}: QuestionAndAnswer) => {
    dispatch(updateQuestionAndAnswer({id: qaId!, question, answer}));
    navigate('/')
  }

  return (
    <QaAForm
      questionInitialState={state.question}
      answerInitialState={state.answer}
      buttonLabel='Update Q&A'
      onSubmit={handleUpdate}
    />
  )
}
