import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { useCart } from '../../hooks/CartContext'
import { Button } from '../Button'
import { Container, Image, ProductName, ProductPrice } from './styles'

export const CardProducts = ({ product }) => {
  const { putProductInCart } = useCart()
  const { push } = useHistory()

  return (
    <Container>
      <Image src={product.url} alt="Imagem do produto" />
      <div>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.formatedPrice}</ProductPrice>
        <Button
          onClick={() => {
            putProductInCart(product)
            push('/carrinho')
          }}
        >
          Adicionar
        </Button>
      </div>
    </Container>
  )
}

CardProducts.propTypes = {
  product: PropTypes.object
}
