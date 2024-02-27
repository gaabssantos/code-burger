import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  box-shadow: 0px 10px 40px 0px #00000008;
  border-radius: 20px;
  padding: 10px;
  width: max-content;

  @media (max-width: 600px) {
    margin: 30px auto;
    width: 80%;
  }

  @media (max-width: 800px) {
    margin: 30px auto;
    width: 80%;
  }
`

export const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 10px;
  border-bottom: 1px solid #b5b5b5;

  p {
    font-size: 16px;
    color: #b5b5b5;
  }

  p:last-child {
    padding-left: 25px;
  }
`

export const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: max-content;
  grid-gap: 10px 15px;
  padding: 10px;

  img {
    border-radius: 10px;
    width: 120px;
  }

  p {
    font-size: 16px;
  }

  div {
    display: flex;
    gap: 10px;
  }

  button {
    background: none;
    border: none;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 20px;
  }
`

export const EmptyCart = styled.p`
  text-align: center;
  font-size: 30px;
  color: #b5b5b5;
  margin: 20px;
  font-style: italic;
`
