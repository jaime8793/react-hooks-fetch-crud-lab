import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questionss) => {
        console.log(questionss);
        setQuestions(questionss);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);
    });
  }

  function handleAddQuestion(newQuestion) {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);

  }





  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleAddQuestion={handleAddQuestion}/> : <QuestionList questions={questions} handeDelete={handleDelete}/>}
    </main>
  );
}

export default App;