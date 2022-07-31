import {fireEvent, screen,} from "@testing-library/react";
import {renderWithProviders} from "../helpers/test-utils";
import {Overview} from "../../section/Overview";

describe('the overview section', () => {
  it('should render the questions with the rest of the overview section', () => {
    const preloadedState = {
      questionsAndAnswers: {
        data: [
          {
            id: '1',
            question: 'Question 1',
            answer: 'Answer 1',
          },
          {
            id: '2',
            question: 'Question 2',
            answer: 'Answer 2',
          },
          {
            id: '3',
            question: 'Question 3',
            answer: 'Answer 3',
          },
          {
            id: '4',
            question: 'Question 4',
            answer: 'Answer 4',
          },
        ],
        status: null,
      }
    }
    renderWithProviders(<Overview/>, {preloadedState})
    expect(screen.getByRole('heading', {name: /created question/i})).toBeInTheDocument()
    expect(screen.getByTestId('questions')).toBeInTheDocument()
    expect(screen.getByTestId('action-section')).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: /created a new question/i})).toBeInTheDocument()
    expect(screen.getByTestId('qa-form')).toBeInTheDocument()
  })
  it('should render an error message if there are no questions to show', () => {
    const preloadedState = {
      questionsAndAnswers: {
        data: [],
        status: null,
      }
    }
    renderWithProviders(<Overview/>, {preloadedState})
    expect(screen.getByText(/no questions yet :\-\(/i)).toBeInTheDocument()
  })
  it('should be able to interact with the Sort and Delete buttons', () => {
    renderWithProviders(<Overview/>)
    fireEvent.click(screen.getByRole('button', {name: /sort/i}))
    fireEvent.click(screen.getByRole('button', {name: /remove questions/i}))
  })
})

