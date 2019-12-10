import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
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

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        {/* Verificar por que está travando
        <AvatarInput name="avatar_id" />
        */}
        <Input name="name" placeholder="Nome completo" />
        <Input type="email" name="email" placeholder="Seu endereço de e-mail" />
        <Select
          name="course"
          placeholder="Curso"
          options={courses}
          style={{ marginBottom: '10px', height: '44px' }}
        />

        <hr />

        <Input type="password" name="olPassword" placeholder="Senha atual" />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Sair do Quiz Enade
      </button>
    </Container>
  );
}
