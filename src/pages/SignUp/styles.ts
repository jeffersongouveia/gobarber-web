import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import signUpBackground from '../../assets/sign-up-background.png'

export const Container = styled.div`
  display: flex;
  align-items: stretch;

  height: 100vh;
`

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      display: block;
      color: #f4ede8;
      margin-top: 24px;
      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#F4EDE8')};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;

    color: #f4ede8;
    margin-top: 24px;
    text-decoration: none;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#F4EDE8')};
    }

    svg {
      margin-right: 16px;
    }
  }
`

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  margin-bottom: 40px;

  button {
    background: transparent;
    border: 0;

    color: #f4ede8;
    font-size: 16px;
    font-weight: 500;

    padding-bottom: 8px;
    border-bottom: 2px solid transparent;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }

  & .selected {
    border-bottom: 2px solid #ff9000;
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`
