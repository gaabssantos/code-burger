import ReactSelect from 'react-select'
import styled from 'styled-components'

export const Container = styled.div`
  background: #efefef;
  min-height: 100vh;
`

export const ProductsImg = styled.img`
  width: 60px;
  border-radius: 5px;
`

export const ReactSelectStyle = styled(ReactSelect)`
  width: 250px;

  .css-13cymwt-control {
    cursor: pointer;
  }
`
export const Menu = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
  margin: 20px 0;
`

export const LinkMenu = styled.a`
  color: '#323D5D';
  cursor: pointer;
  padding-bottom: 10px;
  width: 130px;
  text-align: center;
  font-weight: ${({ $isactivestatus }) => ($isactivestatus ? 'bold' : '400')};
  border-bottom: ${({ $isactivestatus }) =>
    $isactivestatus && '3px solid #9758A6'};
`
