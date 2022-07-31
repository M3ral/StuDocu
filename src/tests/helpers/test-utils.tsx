import React, {PropsWithChildren} from 'react'
import type {RenderOptions} from '@testing-library/react'
import {render} from '@testing-library/react'
import type {PreloadedState} from '@reduxjs/toolkit'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import {BrowserRouter as Router,} from "react-router-dom"
import {IRootState} from '../../store'

import questionAndAnswerReducer from "../../reducers/questionAnswer";
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<IRootState>
  store?: any
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
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
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({reducer: {questionsAndAnswers: questionAndAnswerReducer}, preloadedState}),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    return <Router>
      <Provider store={store}>{children}</Provider>
    </Router>
  }

  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}
