import HeaderBanner from '../../assets/header-cart.svg'
import { CartItems, CartResume, Header } from '../../components'
import { Container, CartImg, Wrapper } from './styles'

export const Cart = () => {
  return (
    <Container>
      <Header />
      <CartImg src={HeaderBanner} alt="Banner do Carrinho" />
      <Wrapper>
        <CartItems />
        <CartResume />
      </Wrapper>
    </Container>
  )
}
