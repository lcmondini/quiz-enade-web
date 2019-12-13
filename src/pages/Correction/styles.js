import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;

    button {
      width: 200px;
      margin: 10px 0 0;
      height: 44px;
      background: #f3c014;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#f3c014')};
      }
    }

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 10px 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 15px;
    margin-top: 10px;
  }
`;

export const Question = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  max-width: 600px;
  word-wrap: break-word;

  strong {
    display: block;
    color: #02509e;
    font-size: 20px;
    font-weight: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 550px;
    white-space: nowrap;
  }

  span {
    display: block;
    margin-top: 3px;
    color: #666;
    padding-bottom: 10px;
  }

  a {
    font-weight: bold;
    color: #02509e;
  }
`;

export const Button = styled.button`
  border: none;
  background-color: inherit;
  padding-left: 14px;
  font-weight: bold;
  color: #e81e1e;
  cursor: pointer;
  display: inline-block;
`;

export const Footer = styled.div`
  display: inline-block;
  align-self: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;

  strong {
    float: left;
    padding: 16px 32px;
    text-decoration: none;
  }

  button {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    float: left;
    padding: 16px 32px;
    text-decoration: none;
  }
`;
