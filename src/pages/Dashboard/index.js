import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Question } from './styles';

export default function Dashboard() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function loadQuestions() {
      const response = await api.get('questions', {
        course: 'Ciência da Computação',
      });

      setQuestions(response.data);
    }
    loadQuestions();
  }, []);

  function handleQuestion() {}

  return (
    <Container>
      <header>
        <Link to="/question">
          <button type="button">Cadastrar nova pergunta</button>
        </Link>
      </header>

      <ul>
        {questions.map(question => (
          <Question key={question.id} onClick={handleQuestion}>
            <strong>{question.description}</strong>
            <span>{question.correct_answer}</span>
            <Link to={`/question/${question.id}`}>ALTERAR</Link>
          </Question>
        ))}
      </ul>
    </Container>
  );
}
