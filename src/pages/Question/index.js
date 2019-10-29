import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

export default function Question() {
  console.tron.error(window.location.pathname);
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch();
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input name="question" placeholder="Enunciado" multiline />
        <Input name="correctAnswer" placeholder="Alternativa Correta" />

        <hr />

        <Input name="optionA" placeholder="Alternativa A" />
        <Input name="optionB" placeholder="Alternativa B" />
        <Input name="optionC" placeholder="Alternativa C" />
        <Input name="optionD" placeholder="Alternativa D" />
        <Input name="optionE" placeholder="Alternativa E" />

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
