import {configureStore} from '@reduxjs/toolkit'
import questionAndAnswerReducer from '../reducers/questionAnswer'


/*
  if I had to add more reducers, I'd create an index.ts inside reducers folder
  and combine de reducers before passing them to the store.
  Since we only need one for this case, I'm going to pass it directly to the configureStore
*/
const store = configureStore({
  reducer: {
    questionsAndAnswers: questionAndAnswerReducer
  }
})


export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
