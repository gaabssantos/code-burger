import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useCart } from '../../hooks/CartContext'
import api from '../../services/api'
import { formatCurrency } from '../../utils/NumberFormat'
import { Button } from '../Button'
import { Container, ContainerItems } from './styles'

export const CartResume = () => {
  const [finalPrice, setFinalPrice] = useState(0)
  const [deliveryTax, setDeliveryTax] = useState(5)

  const { cartProducts } = useCart()

  useEffect(() => {
    const sumAllItems = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc
    }, 0)
    setFinalPrice(sumAllItems)
  }, [cartProducts, deliveryTax])

  const submitOrder = async () => {
    const order = cartProducts.map(product => {
      return { id: product.id, quantity: product.quantity }
    })

    await api.post('orders', {
      products: order
    })

    toast.success('Pedido feito com sucesso!')
  }

  return (
    <Container>
      <ContainerItems>
        <div className="container-top">
          <h2 className="title">Resumo do pedido</h2>
          <p className="items">Itens</p>
          <p className="items-price">{formatCurrency(finalPrice)}</p>
          <p className="delivery-tax">Taxa de entrega</p>
          <p className="delivery-tax-price">{formatCurrency(deliveryTax)}</p>
        </div>
        <div className="container-bottom">
          <p>Total</p>
          <p>{formatCurrency(finalPrice + deliveryTax)}</p>
        </div>
      </ContainerItems>
      <Button className="button-cart-resume" onClick={submitOrder}>
        Finalizar pedido
      </Button>
    </Container>
  )
}
