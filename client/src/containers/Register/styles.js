import styled from 'styled-components'

export const Title = styled.h1`
  color: #575757;
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
`

export const Subtitle = styled.p`
  color: #6a6a6a;
  font-weight: 700;
  line-height: 21px;
  font-size: 14px;
  margin-bottom: 45px;
`

export const Label = styled.label`
  color: #8f8f8f;
  font-weight: 500;
  line-height: 18px;
  font-size: 14px;
  display: block;
  margin-bottom: 25px;
`

export const Input = styled.input`
  display: block;
  width: 80%;
  border: none;
  padding: 5px;

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    width: 200px;
  }

  @media (max-width: 800px) {
    width: 200px;
  }
`

export const InputCheckbox = styled.input`
  margin-right: 20px;
  margin-top: 20px;
`

export const Terms = styled.div`
  display: flex;
`

export const TermsLink = styled.a`
  color: #0091ff;
  cursor: pointer;
  font-size: 13px;
  margin-left: 20px;
  margin-top: 20px;
  &:hover {
    text-decoration: underline;
  }
`

export const SignUp = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
`

export const SignUpTitle = styled.p`
  margin-right: 25px;
`

export const SignUpLink = styled.a`
  color: #0091ff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
