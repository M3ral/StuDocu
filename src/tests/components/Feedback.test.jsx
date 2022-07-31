import {screen} from "@testing-library/react";
import {Feedback} from "../../components/Feedback/Feedback";
import {renderWithProviders} from "../helpers/test-utils";

describe('components/Feedback', () => {
    it('should return a sentence informing the user that if there no questions', () => {
        const preloadedState = {
            questionsAndAnswers: {
                data: [],
                status: null,
            }
        }
        renderWithProviders(<Feedback/>, {preloadedState})
        expect(screen.getByText(/here you can find no questions\. feel free to create your own questions!/i)).toBeTruthy()
    })
    it('should return a sentence informing the user with the amount of existing questions', () => {
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
        renderWithProviders(<Feedback/>, {preloadedState})
        expect(screen.getByText(/here you can find 4 questions\. feel free to create your own questions!/i)).toBeInTheDocument()
    })
})
