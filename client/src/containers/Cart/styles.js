import styled from 'styled-components'

export const Container = styled.div`
  background-color: #e5e5e5;
  min-height: calc(100vh - 72px);
`

export const CartImg = styled.img`
  width: 100%;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 30px 0;

  @media (max-width: 600px) {
    display: block;
  }

  @media (max-width: 800px) {
    display: block;
  }
`
