import styled from 'styled-components'
import { shade } from 'polished'

import colors from '../../styles/colors'

export const Container = styled.button`
  background: #ff9000;
  color: ${colors.background};
  font-weight: 500;

  border-radius: 10px;
  border: 0;
  padding: 0 16px;

  height: 56px;
  width: 100%;
  margin-top: 24px;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#FF9000')};
  }
`
