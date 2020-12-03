import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  position: relative;

  span {
    position: absolute;
    width: 160px;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    background: #ff9000;
    color: ${colors.background};
    padding: 8px;
    border-radius: 4px;

    font-size: 14px;
    font-weight: 500;

    visibility: hidden;
    opacity: 0;
    transition: opacity 0.4s;

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);

      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
    }
  }

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`
