import React from 'react';
import {PageLayout} from "./components/PageLayout/PageLayout";
import {Feedback} from "./components/Feedback/Feedback";
import {Route, Routes} from "react-router-dom";
import {UpdateQaA} from "./components/QaAForm/UpdateQaA";
import {Overview} from "./section/Overview";

function App() {
  return (
    <PageLayout
      header={
        <h1>The awesome Q/A tool</h1>
      }
      content={
        <Routes>
          <Route path="/" element={
            <Overview/>
          }/>
          <Route path=":qaId" element={
            <UpdateQaA/>
          }/>
        </Routes>
      }
      sidebar={<Feedback/>}
    />
  )
}

export default App;
