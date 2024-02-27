import styled from 'styled-components'

export const Container = styled.div`
  background: #e5e5e5;
  min-height: calc(100vh - 72px);
`

export const ProductsImg = styled.img`
  width: 100%;
`

export const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 20px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`

export const CategoryButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: ${({ $isactivecategory }) =>
    $isactivecategory && '3px solid #9758A6'};
  padding-bottom: 5px;
  color: ${({ $isactivecategory }) =>
    $isactivecategory ? '#9758A6' : '#9a9a9d'};
  padding-bottom: 5px;
`

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 40px;
  justify-items: center;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 601px) and (max-width: 800px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 801px) and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1001px) and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
`
