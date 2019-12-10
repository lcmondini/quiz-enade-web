import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-lasalle-shield.png';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha dever ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
  course: Yup.string().required('O curso é obrigatório'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const courses = [
    { id: 'Administração', title: 'Administração' },
    {
      id: 'Análise e Desenvolvimento de Sistemas',
      title: 'Análise e Desenvolvimento de Sistemas',
    },
    { id: 'Arquitetura de Urbanismo', title: 'Arquitetura de Urbanismo' },
    { id: 'Ciência da Computação', title: 'Ciência da Computação' },
    { id: 'Ciências Biológicas', title: 'Ciências Biológicas' },
    { id: 'Ciências Contábeis', title: 'Ciências Contábeis' },
    { id: 'Design Gráfico', title: 'Design Gráfico' },
    { id: 'Direito', title: 'Direito' },
    { id: 'Educação Física', title: 'Educação Física' },
    { id: 'Enfermagem', title: 'Enfermagem' },
    { id: 'Engenharia Civil', title: 'Engenharia Civil' },
    { id: 'Engenharia de Produção', title: 'Engenharia de Produção' },
    { id: 'Engenharia Elétrica', title: 'Engenharia Elétrica' },
    { id: 'Engenharia Mecânica', title: 'Engenharia Mecânica' },
    { id: 'Estética e Cosmética', title: 'Estética e Cosmética' },
    { id: 'Fisioterapia', title: 'Fisioterapia' },
    { id: 'Geografia', title: 'Geografia' },
    { id: 'Gestão Comercial', title: 'Gestão Comercial' },
    { id: 'Gestão de Recursos Humanos', title: 'Gestão de Recursos Humanos' },
    { id: 'Gestão Financeira', title: 'Gestão Financeira' },
    { id: 'Gestão Pública', title: 'Gestão Pública' },
    { id: 'História', title: 'História' },
    { id: 'Internet das Coisas', title: 'Internet das Coisas' },
    { id: 'Letras - Língua Inglesa', title: 'Letras - Língua Inglesa' },
    { id: 'Letras - Língua Portuguesa', title: 'Letras - Língua Portuguesa' },
    { id: 'Logística', title: 'Logística' },
    { id: 'Marketing', title: 'Marketing' },
    { id: 'Matemática', title: 'Matemática' },
    { id: 'Nutrição', title: 'Nutrição' },
    { id: 'Pedagogia', title: 'Pedagogia' },
    { id: 'Processos Gerencias', title: 'Processos Gerencias' },
    { id: 'Psicologia', title: 'Psicologia' },
    { id: 'Química', title: 'Química' },
    { id: 'Relações Internacionais', title: 'Relações Internacionais' },
    { id: 'Serviço Social', title: 'Serviço Social' },
    { id: 'Teologia', title: 'Teologia' },
  ];

  function handleSubmit({ name, course, email, password }) {
    dispatch(signUpRequest(name, course, email, password));
  }

  return (
    <>
      <img src={logo} alt="Lasalle" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Select
          name="course"
          placeholder="Curso"
          options={courses}
          style={{ marginBottom: '10px', height: '44px' }}
        />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
