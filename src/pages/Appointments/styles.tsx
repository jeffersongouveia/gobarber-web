import styled from 'styled-components'

export const Container = styled.div``

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #F4EDE8;
    width: 90px;

    svg {
      color: #FF9000;
      margin-right: 8px;
    }
  }

  div {
    display: flex;
    align-items: center;
    flex: 1;
    background: #3E3B47;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #FFF;
      font-size: 20px;
    }
  }
`

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    display: flex;
    align-items: center;
    background: #3E3B47;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background: #FF9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #FFF;
    }

    span {
      display: flex;
      align-items: center;
      margin-left: auto;
      color: #999591;

      svg {
        color: #FF9000;
        margin-right: 8px;
      }
    }
  }
`

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #FF9000;
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #FF9000;
      margin: 0 8px;
    }
  }
`

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3E3B47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`
