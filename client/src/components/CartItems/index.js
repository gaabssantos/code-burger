import { useCart } from '../../hooks/CartContext'
import { formatCurrency } from '../../utils/NumberFormat'
import { Container, Header, Body, EmptyCart } from './styles'

export const CartItems = () => {
  const { cartProducts, addCartProduct, removeCartProduct } = useCart()

  return (
    <Container>
      <Header>
        <p></p>
        <p>Itens</p>
        <p>Preço</p>
        <p>Quantidade</p>
        <p>Total</p>
      </Header>
      {cartProducts && cartProducts.length > 0 ? (
        cartProducts.map(product => (
          <Body key={product.key}>
            <img src={product.url} />
            <p>{product.name}</p>
            <p>{formatCurrency(product.price)}</p>
            <div>
              <button onClick={() => removeCartProduct(product.id)}>-</button>
              <p>{product.quantity}</p>
              <button onClick={() => addCartProduct(product.id)}>+</button>
            </div>
            <p>{formatCurrency(product.quantity * product.price)}</p>
          </Body>
        ))
      ) : (
        <EmptyCart>Carrinho vazio</EmptyCart>
      )}
    </Container>
  )
}
