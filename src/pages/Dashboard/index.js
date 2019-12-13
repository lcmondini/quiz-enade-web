import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Question, Update, Delete, Button, Footer } from './styles';

export default function Dashboard() {
  const [questions, setQuestions] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [reload, setReload] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchPage, setSearchPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [keyword, setKeyword] = useState();
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    async function loadQuestions() {
      if (searchPage === 0) {
        setSearchPage(1);
      }
      const response = await api.get('questions', {
        params: {
          limit: 10,
          course: profile.course,
          page: searchPage,
          keyword,
        },
      });

      setReload(false);
      setQuestions(response.data.questions);
      setPagination(response.data.pagination);
      setCurrentPage(response.data.pagination.currentPage);
      setSearchPage(response.data.pagination.currentPage);
      setLastPage(response.data.pagination.endPage);
    }
    loadQuestions();
  }, [currentPage, keyword, profile.course, reload, searchPage]);

  async function handleDelete(id) {
    try {
      await api.delete(`questions/${id}`);

      setReload(true);

      toast.success('Questão excluída com sucesso!');
    } catch (err) {
      toast.error('Erro ao excluir questão, favor verificar!');
    }
  }

  function handlePage(pageNumber) {
    if (
      pageNumber >= pagination.startPage &&
      pageNumber <= pagination.endPage
    ) {
      setCurrentPage(pageNumber);
      setSearchPage(pageNumber);
    }
  }

  function handleKeyword() {
    setKeyword(document.getElementById('keyword').value);
  }

  function handleChange(question) {
    if (question.correct_answer !== null) {
      history.push(`/question?id=${question.id}`);
    } else {
      history.push(`/essay?id=${question.id}`);
    }
  }

  return (
    <Container>
      <header>
        <Link to="/question">
          <button type="button">Cadastrar Multipla Escolha</button>
        </Link>
        <Link to="/essay">
          <button type="button">Cadastrar Discursiva</button>
        </Link>
        <Input
          id="keyword"
          name="keyword"
          placeholder="Palavra-chave filtro"
          onBlur={() => handleKeyword()}
        />
      </header>

      <ul>
        {questions.map(question => (
          <Question key={question.id}>
            <strong>{question.description}</strong>
            <span>{question.keyword}</span>
            <Update type="button" onClick={() => handleChange(question)}>
              ALTERAR
            </Update>
            <Delete type="button" onClick={() => handleDelete(question.id)}>
              EXCLUIR
            </Delete>
          </Question>
        ))}
      </ul>
      <Footer>
        <Button
          type="button"
          onClick={() => handlePage(parseInt(currentPage, 10) - 1)}
        >
          &laquo;
        </Button>
        <strong>{currentPage}</strong>
        <strong>de</strong>
        <strong>{lastPage}</strong>
        <Button
          type="button"
          onClick={() => handlePage(parseInt(currentPage, 10) + 1)}
        >
          &raquo;
        </Button>
      </Footer>
    </Container>
  );
}
