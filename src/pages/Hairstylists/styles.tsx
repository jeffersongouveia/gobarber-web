import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 650px;

  h1 {
    margin-bottom: 60px;
  }
`

export const Hairstylist = styled.div`
  display: flex;
  align-items: center;

  background: ${colors.darkGrey};
  border: 2px solid ${colors.darkGrey};
  border-radius: 10px;
  padding: 16px 26px;

  cursor: pointer;
  transition: border-color 0.2s;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  & + div {
    margin-top: 24px;
  }

  &:hover {
    border: 2px solid ${colors.orange};
  }
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;

  width: 100%;
`

export const Name = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.white};
`

export const Availability = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;
  color: ${colors.lightGrey};

  svg {
    color: ${colors.orange};
    margin-right: 8px;
  }

  div {
    display: flex;
    align-items: center;
  }

  strong {
    font-size: 16px;
    margin: 0 6px;
  }
`
