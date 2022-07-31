import questionAnswer, {
  addNew,
  addQuestionAndAnswer,
  QuestionAnswerSlice,
  removeAllQuestionAndAnswers,
  removeOneQuestionAndAnswer,
  sortQuestions,
  updateQuestionAndAnswer
} from "../../reducers/questionAnswer";
import {configureStore} from "@reduxjs/toolkit";

describe('reducers/questionAnswer', function () {
  it('should return the initial state', function () {
    expect(questionAnswer(undefined, {type: undefined})).toMatchInlineSnapshot(`
Object {
  "data": Array [
    Object {
      "answer": "Answer",
      "id": "1",
      "question": "Question 3",
    },
    Object {
      "answer": "Answer",
      "id": "2",
      "question": "Question 2",
    },
    Object {
      "answer": "Answer",
      "id": "3",
      "question": "Question",
    },
  ],
  "status": null,
}
`)
  });
  it('should handle a new Q&A being added to an empty list', function () {
    const previousState: QuestionAnswerSlice = {data: [], status: null}
    const mockProp = {
      question: 'Is this a question?',
      answer: 'Yes'
    }
    expect(questionAnswer(previousState, addQuestionAndAnswer(mockProp))).toMatchSnapshot({
      data: [
        {
          id: expect.any(String),
          question: 'Is this a question?',
          answer: 'Yes'
        }
      ],
      status: null
    }, "add new question");
  })

  it('should handle all the Q&A being deleted', function () {
    const previousState: QuestionAnswerSlice = {
      data: [
        {
          id: '1',
          question: 'Question 3',
          answer: 'Answer',
        },
        {
          id: '2',
          question: 'Question 2',
          answer: 'Answer',
        },
        {
          id: '3',
          question: 'Question',
          answer: 'Answer',
        },
      ],
      status: null,
    }
    expect(questionAnswer(previousState, removeAllQuestionAndAnswers())).toMatchObject({data: [], status: null})
  });
  it('should handle one Q&A being deleted', function () {
    const previousState: QuestionAnswerSlice = {
      data: [
        {
          id: '1',
          question: 'Question 3',
          answer: 'Answer',
        },
        {
          id: '2',
          question: 'Question 2',
          answer: 'Answer',
        },
        {
          id: '3',
          question: 'Question',
          answer: 'Answer',
        },
      ],
      status: null,
    }
    const expectedState: QuestionAnswerSlice = {
      data: [
        {
          id: '2',
          question: 'Question 2',
          answer: 'Answer',
        },
        {
          id: '3',
          question: 'Question',
          answer: 'Answer',
        },
      ],
      status: null,
    }
    expect(questionAnswer(previousState, removeOneQuestionAndAnswer({id: '1'}))).toEqual(expectedState)
  });
  it('should handle one Q&A being updated', function () {
    const previousState: QuestionAnswerSlice = {
      data: [
        {
          id: '1',
          question: 'Question 3',
          answer: 'Answer',
        },
        {
          id: '2',
          question: 'Question 2',
          answer: 'Answer',
        },
        {
          id: '3',
          question: 'Question',
          answer: 'Answer',
        },
      ],
      status: null,
    }
    const updatedQA = {
      id: '2',
      question: 'Was this question updated?',
      answer: 'Yes',
    }
    const expectedState: QuestionAnswerSlice = {
      data: [
        {
          id: '1',
          question: 'Question 3',
          answer: 'Answer',
        },
        updatedQA,
        {
          id: '3',
          question: 'Question',
          answer: 'Answer',
        },
      ],
      status: null,
    }
    expect(questionAnswer(previousState, updateQuestionAndAnswer(updatedQA))).toEqual(expectedState)
  });
  it('should handle questions being sorted', function () {
    const previousState: QuestionAnswerSlice = {
      data: [
        {
          id: '1',
          question: 'Question 3',
          answer: 'Answer',
        },
        {
          id: '2',
          question: 'Question 2',
          answer: 'Answer',
        },
        {
          id: '3',
          question: 'Question',
          answer: 'Answer',
        },
      ],
      status: null,
    }
    const expectedState: QuestionAnswerSlice = {
      data: [
        {
          id: '3',
          question: 'Question',
          answer: 'Answer',
        },
        {
          id: '2',
          question: 'Question 2',
          answer: 'Answer',
        },
        {
          id: '1',
          question: 'Question 3',
          answer: 'Answer',
        },
      ],
      status: null,
    }
    expect(questionAnswer(previousState, sortQuestions())).toEqual(expectedState)
  });
  it('should handle a new Q&A being added asynchronously', async () => {
    const previousState: QuestionAnswerSlice = {
      data: [
        {
          id: '1',
          question: 'Question 3',
          answer: 'Answer',
        },
        {
          id: '2',
          question: 'Question 2',
          answer: 'Answer',
        },
        {
          id: '3',
          question: 'Question',
          answer: 'Answer',
        },
      ],
      status: null,
    }
    const store = configureStore({
      reducer: function (state = previousState, action) {
        switch (action.type) {
          case 'questionAnswer/addNew/fulfilled': {
            const {question, answer} = action.payload
            return {
              ...state,
              data: [
                ...state.data,
                {
                  id: '4',
                  question,
                  answer
                }
              ]
            }
          }
          default:
            return state;
        }
      },
    });
    const mockProps = {
      question: 'Is this a question?',
      answer: 'Yes'
    }
    await store.dispatch(addNew(mockProps));
    const state = store.getState();
    expect(state).toEqual({
      data: [
        ...previousState.data,
        {
          id: '4',
          question: 'Is this a question?',
          answer: 'Yes'
        }
      ],
      status: null
    });
  }, 10000)
});
