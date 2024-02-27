import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  background: #3c3c3c;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.15);
  width: 300px;
  top: 0;
  left: 0;

  hr {
    margin: 70px 15px;
  }
`

export const ItemContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #565656;
  border-radius: 2px;
  margin: 10px;
  padding-left: 20px;

  .icon {
    color: #fff;
    margin-right: 10px;
  }
`

export const ListLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
  color: #fff;
`
