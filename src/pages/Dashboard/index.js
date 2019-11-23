import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Question } from './styles';

export default function Dashboard() {
  const [questions, setQuestions] = useState([]);
  const [pagination, setPagination] = useState([]);
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    async function loadQuestions() {
      const response = await api.get('questions', {
        params: {
          limit: 10,
          course: profile.course,
        },
      });

      setQuestions(response.data.questions);
      setPagination(response.data.pagination);
    }
    loadQuestions();
  }, [profile.course]);

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
            <Link to={`/question?id=${question.id}`}>ALTERAR</Link>
          </Question>
        ))}
      </ul>
      <div className="card-footer pb-0 pt-3">
        {pagination.pages && pagination.pages.length && (
          <ul className="pagination">
            {pagination.pages.map(page => (
              <li
                key={page}
                className={`page-item number-item ${
                  pagination.currentPage === page ? 'active' : ''
                }`}
              >
                <Link to={{ search: `?page=${page}` }} className="page-link">
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
