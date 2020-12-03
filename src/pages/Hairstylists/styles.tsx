import styled, { css } from 'styled-components'
import { shade } from 'polished'

import colors from '../../styles/colors'

interface HairStylistProps {
  selected: boolean
}

interface TimeOptionsHourProps {
  available: boolean
  selected: boolean
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const ListHairStylists = styled.section`
  width: 100%;
  max-width: 650px;

  h1 {
    margin-bottom: 60px;
  }
`

export const HairStylist = styled.div<HairStylistProps>`
  display: flex;
  align-items: center;

  border-radius: 10px;
  padding: 16px 26px;

  cursor: pointer;
  transition: border-color 0.2s;

  background: ${colors.darkGrey};
  border: 2px solid ${(props) => (props.selected ? colors.orange : shade(0.1, colors.darkGrey))};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  & + div {
    margin-top: 24px;
  }

  &:hover {
    background: ${shade(0.1, colors.darkGrey)};
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

export const CreateAppointment = styled.div`
  max-width: 380px;

  section {
    margin-bottom: 32px;
  }
`

export const Title = styled.h2`
  color: ${colors.white};
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 35px;
`

export const TimeOptions = styled.div`
  h6 {
    color: ${colors.lightGrey};
    font-size: 14px;
    font-weight: 600;
    margin: 12px 0;
  }

  li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
`

export const TimeOptionsHour = styled.ul<TimeOptionsHourProps>`
  display: flex;
  justify-content: center;

  font-size: 14px;
  font-weight: 600;

  width: 65px;
  padding: 11px;
  margin: 0 8px 8px 0;

  background: ${colors.darkGrey};
  border-radius: 10px;
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.1, colors.darkGrey)};
  }

  ${(props) => props.selected && css`
    background: ${colors.orange};
    color: ${colors.inputs};

    &:hover {
      background: ${shade(0.2, colors.orange)};
    }
  `}

  ${(props) => !props.available && css`
    background: ${colors.background};
    border-color: ${colors.background};
    color: ${colors.hardGrey};
    cursor: not-allowed;

    &:hover {
      background: ${colors.background};
    }
  `}
`

export const Submit = styled.button`
  display: block;
  font-size: 16px;
  font-weight: bold;
  background: #FF9000;
  color: ${colors.background};
  border: none;
  border-radius: 10px;

  padding: 0 18px;
  margin: 24px auto 0;
  height: 50px;

  transition: color 0.2s;

  &:hover {
    background: ${shade(0.2, '#FF9000')};
  }
`
