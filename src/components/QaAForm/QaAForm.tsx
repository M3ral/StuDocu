import React, {useEffect, useState} from "react";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";
import {Textarea} from "../Textarea/Textarea";
import './QaAForm.scss'
import {isRequired} from "../../utils/validators";

interface QaAFormProps {
  onSubmit: any
  questionInitialState: string
  answerInitialState: string
  buttonLabel: string
  children?: React.ReactNode
}

export const QaAForm: React.FC<QaAFormProps> =
  ({
     questionInitialState,
     answerInitialState,
     onSubmit,
     buttonLabel,
     children
   }) => {
    const [question, setQuestion] = useState(questionInitialState)
    const [answer, setAnswer] = useState(answerInitialState)
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
      setQuestion(questionInitialState)
      setAnswer(answerInitialState)
    }, [questionInitialState, answerInitialState])

    useEffect(() => {
      if (isRequired(question) && isRequired(answer)) {
        setIsValid(true)
      } else {
        setIsValid(false)
      }
    }, [setIsValid, question, answer])

    const submit = (e: SubmitEvent) => {
      e.preventDefault()
      onSubmit({question, answer})
      setQuestion('')
      setAnswer('')
    }

    return (
      <form className='form-container' data-testid='qa-form'>
        <Input name='question' aria-label='question' label='Question' value={question}
               onChange={(e) => setQuestion(e.target.value)}/>
        <Textarea name='answer' aria-label='answer' label='Answer' value={answer}
                  onChange={(e) => setAnswer(e.target.value)}/>
        {children}
        <div className='button-container'>
          <Button disabled={!isValid} onClick={(e) => submit(e)} variant='secondary'>{buttonLabel}</Button>
        </div>
      </form>
    )
  }
