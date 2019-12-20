import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, useField } from '@rocketseat/unform';
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

  const { defaultValue, registerField } = useField('image');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef();

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
      const image_id = file;

      const request = {
        id,
        course,
        keyword,
        description,
        image_id,
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

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'image_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]); // eslint-disable-line

  useEffect(() => {
    if (question.image !== undefined && question.image !== null) {
      setFile(question.image.id);
      setPreview(question.image.url);
    }
  }, [question]); // eslint-disable-line

  async function handleChangeImage(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const id_image = response.data.id;
    const { url } = response.data;

    setFile(id_image);
    setPreview(url);
  }

  return (
    <Container>
      <Form schema={schema} initialData={question} onSubmit={handleSubmit}>
        <label htmlFor="image">
          <img
            src={
              preview ||
              'https://api.adorable.io/avatars/285/abott@adorable.png'
            }
            alt=""
          />

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            data-file={file}
            onChange={handleChangeImage}
            ref={ref}
          />
        </label>

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
