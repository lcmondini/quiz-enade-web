import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';

import { Container } from './styles';

const schema = Yup.object().shape({
  description: Yup.string().required('A descrição é obrigatória'),
  keyword: Yup.string().required('A palavra-chave é obrigatória'),
});

export default function Essay(props) {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState([]);
  const profile = useSelector(state => state.user.profile);

  const { location } = props;
  const { search } = location;
  const params = new URLSearchParams(search);
  const id = params.get('id');

  useEffect(() => {
    async function loadQuestions() {
      const response = await api.get('questions', {
        params: {
          id,
          course: 'Ciência da Computação',
        },
      });

      setQuestions(response.data.questions);
    }
    loadQuestions();
  }, [id]);

  useEffect(() => {
    function loadQuestion() {
      setQuestion({ ...questions[0] });

      if (id == null) {
        setQuestion({});
      }
    }
    loadQuestion();
  }, [id, questions]);

  async function handleSubmit(data) {
    try {
      const { keyword, description } = data;

      const { course } = profile;

      const request = {
        id,
        course,
        keyword,
        description,
      };

      if (id == null) {
        await api.post('questions', request);
      } else {
        await api.put('questions', request);
      }

      toast.success('Questão atualizada com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar questão, confira seus dados!');
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={question} onSubmit={handleSubmit}>
        <Input name="description" placeholder="Enunciado" multiline />
        <Input name="keyword" placeholder="Palavra-chave" />

        <hr />

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}

Essay.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};
