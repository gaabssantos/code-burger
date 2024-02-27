import { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { useHistory } from 'react-router-dom'

import Offers from '../../assets/offers.png'
import { useCart } from '../../hooks/CartContext'
import api from '../../services/api'
import { formatCurrency } from '../../utils/NumberFormat'
import {
  Container,
  CategoryImage,
  ContainerItems,
  Image,
  Button
} from './styles'

export const OffersCarousel = () => {
  const [offers, setOffers] = useState([])
  const { putProductInCart } = useCart()
  const { push } = useHistory()

  useEffect(() => {
    async function fetch() {
      const { data } = await api.get('products')

      const productOffers = data
        .filter(product => product.offer)
        .map(product => {
          return {
            ...product,
            formatedPrice: formatCurrency(product.price)
          }
        })

      setOffers(productOffers)
    }

    fetch()
  }, [])

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 }
  ]

  return (
    <Container>
      <CategoryImage src={Offers} alt="Imagem de Oferta" />
      <Carousel
        itemsToShow={4}
        style={{ width: '90%' }}
        breakPoints={breakPoints}
      >
        {offers.map(product => (
          <ContainerItems key={product.id}>
            <Image src={product.url} alt="Foto do produto" />
            <p>{product.name}</p>
            <p>{product.formatedPrice}</p>
            <Button
              onClick={() => {
                putProductInCart(product)
                push('/carrinho')
              }}
            >
              Peça agora
            </Button>
          </ContainerItems>
        ))}
      </Carousel>
    </Container>
  )
}
