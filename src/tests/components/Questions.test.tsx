import {fireEvent, screen} from "@testing-library/react";
import {Questions} from "../../components/Questions/Questions";
import {renderWithProviders} from "../helpers/test-utils";

it('Should print an array of accordion elements', () => {
  const {container} = renderWithProviders(<Questions/>)
  expect(container).toBeInTheDocument()
  const buttons = screen.getAllByRole('button', {name: /delete/i})
  fireEvent.click(buttons[1])
})


it('should remove one accordion when clicked on the delete button', () => {
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

  const {container} = renderWithProviders(<Questions/>, {preloadedState})
  expect(container).toBeInTheDocument()
  const buttons = screen.getAllByRole('button', {name: /delete/i})
  fireEvent.click(buttons[1])
  expect(screen.getAllByRole('button', {name: /delete/i}).length).toBe(3)
})

it('should return empty div when there are no items in state', () => {
  const preloadedState = {
    questionsAndAnswers: {
      data: [],
      status: null,
    }
  }
  renderWithProviders(<Questions/>, {preloadedState})
  expect(screen.getByTestId('questions')).toBeEmptyDOMElement()
})



