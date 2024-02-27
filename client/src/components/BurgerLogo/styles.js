import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px auto;
  width: 70vw;

  @media (max-width: 600px) {
    margin: 25px auto;
  }

  @media (max-width: 800px) {
    margin: 25px auto;
  }
`

export const ContainerImage = styled.div`
  background-color: #9758a6;
  width: 50%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
`

export const Image = styled.img`
  width: 230px;

  @media (max-width: 600px) {
    width: 130px;
  }
`

export const ContainerForm = styled.div`
  background-color: #efefef;
  border-radius: 5px;
  padding: 60px;
  width: 550px;
`
