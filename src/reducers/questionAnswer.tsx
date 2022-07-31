import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRootState} from "../store";

export interface NewQuestionAndAnswer {
  question: string
  answer: string
}

export interface NewQuestionAndAnswerAction extends NewQuestionAndAnswer {
}

export interface removeOneAndAnswerAction {
  id: string
}

export interface UpdateQuestionAndAnswerAction extends QuestionAndAnswer {
}

export interface QuestionAndAnswer {
  id: string
  question: string
  answer: string
}

export interface QuestionAnswerSlice {
  data: QuestionAndAnswer[]
  status: string | null
}

const initialState: QuestionAnswerSlice = {
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

export const addNew = createAsyncThunk('questionAnswer/addNew', (newQaA: NewQuestionAndAnswer) => {
  return new Promise(resolve => setTimeout(resolve, 5000, newQaA)) as Promise<NewQuestionAndAnswerAction>
})

const questionAndAnswerSlice = createSlice({
  name: 'questionAnswer',
  initialState,
  reducers: {
    addQuestionAndAnswer(state, action: PayloadAction<NewQuestionAndAnswerAction>) {
      const {question, answer} = action.payload
      state.data = [
        ...state.data,
        {
          id: new Date().valueOf().toString(),
          question, answer
        }
      ]
    },
    removeAllQuestionAndAnswers(state) {
      state.data = []
    },
    removeOneQuestionAndAnswer(state, action: PayloadAction<removeOneAndAnswerAction>) {
      const {id} = action.payload
      state.data = state.data.filter(({id: _id}) => _id !== id)
    },
    updateQuestionAndAnswer(state, action: PayloadAction<UpdateQuestionAndAnswerAction>) {
      const {id, question, answer} = action.payload

      const index = state.data.findIndex(({id: _id}) => _id === id)
      state.data[index] =
        {
          id,
          question,
          answer
        }
    },
    sortQuestions(state) {
      state.data = state.data.sort((a, b) => a.question.localeCompare(b.question))
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addNew.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(addNew.fulfilled, (state, action) => {
      const {question, answer} = action.payload
      state.data = [
        ...state.data,
        {
          id: new Date().valueOf().toString(),
          question,
          answer
        }
      ]
      state.status = 'completed'
    })
  }
})

export const totalQaAItems = createSelector(
  (state: IRootState) => state.questionsAndAnswers.data,
  (items) => items.length)

export const isLoading = createSelector(
  (state: IRootState) => state.questionsAndAnswers.status,
  (status) => status === 'loading')

export const {
  addQuestionAndAnswer,
  removeAllQuestionAndAnswers,
  removeOneQuestionAndAnswer,
  updateQuestionAndAnswer,
  sortQuestions,
} = questionAndAnswerSlice.actions


export default questionAndAnswerSlice.reducer
