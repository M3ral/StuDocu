import React, {useState} from "react";
import './Accordion.scss'
import {Button} from "../Button/Button";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeOneQuestionAndAnswer} from "../../reducers/questionAnswer";

export interface AccordionProps {
  id: string
  question: string
  answer: string
}

export const Accordion: React.FC<AccordionProps> = ({id, question, answer}) => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  return (
    <div className='accordion'>
      <div className='actions-wrapper' onClick={() => setShow(!show)}>
        <h4>{question}</h4>

        <div>
          <Button onClick={() => dispatch(removeOneQuestionAndAnswer({id}))} variant='tertiary'>
            Delete
          </Button>
          <Link to={`/${id}`}>Edit</Link>
        </div>
      </div>
      {show && <p>{answer}</p>}
    </div>
  )
}
