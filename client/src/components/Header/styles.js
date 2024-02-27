import styled from 'styled-components'

export const Container = styled.div`
  background-color: #e5e5e5;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    color: #555555;
    margin-right: 30px;
  }

  .logout {
    color: #9758a6;
  }
`

export const Links = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const Informations = styled.div`
  display: flex;
  justify-content: end;
  width: 80%;
`

export const Line = styled.div`
  height: 45px;
  border: 0.5px solid #bababa;
  opacity: 0.2;
  margin-right: 30px;
`
