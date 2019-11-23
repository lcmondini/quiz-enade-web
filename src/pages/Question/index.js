import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container } from './styles';

export default function Question(props) {
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

      setQuestions(response.data);
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
      const {
        keyword,
        description,
        correct_answer,
        option_a,
        option_b,
        option_c,
        option_d,
        option_e,
      } = data;

      const { course } = profile;

      const request = {
        id,
        course,
        keyword,
        description,
        correct_answer,
        option_a,
        option_b,
        option_c,
        option_d,
        option_e,
      };

      if (id == null) {
        await api.post('questions', request);
      } else {
        await api.put('questions', request);
      }

      toast.success('Pergunta atualizada com sucesso!');
    } catch (err) {
      console.tron.error(err);
      toast.error('Erro ao atualizar pergunta, confira seus dados!');
    }
  }

  return (
    <Container>
      <Form initialData={question} onSubmit={handleSubmit}>
        <Input name="description" placeholder="Enunciado" multiline />
        <Input name="keyword" placeholder="Palavra-chave" />
        <Input name="correct_answer" placeholder="Alternativa Correta" />

        <hr />

        <Input name="option_a" placeholder="Alternativa A" />
        <Input name="option_b" placeholder="Alternativa B" />
        <Input name="option_c" placeholder="Alternativa C" />
        <Input name="option_d" placeholder="Alternativa D" />
        <Input name="option_e" placeholder="Alternativa E" />

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}

Question.propTypes = {
  location: PropTypes.string.isRequired,
};
