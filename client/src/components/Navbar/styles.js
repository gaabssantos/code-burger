import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 80px;
`

export const Informations = styled.div`
  display: flex;
`

export const InformationsText = styled.p`
  margin-right: 20px;
  cursor: ${props => props.link && 'pointer'};

  &:hover {
    text-decoration: ${props => props.link && 'underline'};
  }
`
