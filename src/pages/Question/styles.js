import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      margin-bottom: 15px;
      align-self: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }

      img {
        height: 250px;
        width: 250px;
        border-radius: 10px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        background: #eee;
      }

      input {
        display: none;
      }
    }

    input,
    textarea {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      height: 132px;
      font-size: 14px;
      font-family: 'Roboto', sans-serif;
      padding: 15px;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #f3c014;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#f3c014')};
      }
    }
  }

  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #e81e1e;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, '#E81E1E')};
    }
  }
`;
