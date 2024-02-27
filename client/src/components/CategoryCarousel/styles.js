import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 35px 0;
  align-items: center;

  .rec.rec-arrow {
    background-color: #9758a6;
    color: #efefef;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .rec.rec-arrow:hover {
    border: 2px solid #9758a6;
    background-color: #efefef;
    color: #9758a6;
  }

  .rec.rec-arrow:disabled {
    border: none;
    background-color: #bebebf;
    color: #efefef;
  }
`

export const CategoryImage = styled.img``

export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
`

export const Image = styled.img`
  width: 200px;
  display: block;
  border-radius: 10px;
`

export const Button = styled(Link)`
  margin-top: 16px;

  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: #fff;
  background-color: #9758a6;
  font-size: 18px;
  box-shadow: 0px 20px 40px 0px #9758a63d;
  height: 50px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }
`
