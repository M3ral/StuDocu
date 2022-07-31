import {fireEvent, screen} from "@testing-library/react";
import {renderWithProviders} from "../helpers/test-utils";
import {NewQaA} from "../../components/QaAForm/NewQaA";
import userEvent from "@testing-library/user-event";

describe('components/QaAForm/NewQaA', () => {
  it('should allow the user to add new Q&A', async () => {
    renderWithProviders(<NewQaA/>)
    const newQuestionAndAnswer = {
      question: 'Is this a new question?',
      answer: 'Yes, I think so'
    }
    const question = screen.getByRole('textbox', {name: 'question'})
    const answer = screen.getByRole('textbox', {name: /answer/i})
    const submitButton = screen.getByRole('button', {
      name: /create question/i
    })
    expect(question).toBeInTheDocument()
    expect(answer).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    const user = userEvent.setup()

    await user.type(question, newQuestionAndAnswer.question)
    expect(question).toHaveValue(newQuestionAndAnswer.question)

    await user.type(answer, newQuestionAndAnswer.answer)
    expect(answer).toHaveValue(newQuestionAndAnswer.answer)
    expect(submitButton).not.toBeDisabled()
    fireEvent.click(submitButton)
  });
});
