import { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'

import Category from '../../assets/categories.png'
import api from '../../services/api'
import {
  Container,
  CategoryImage,
  ContainerItems,
  Image,
  Button
} from './styles'

export const CategoryCarousel = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    async function fetch() {
      const { data } = await api.get('categories')

      setCategories(data)
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
      <CategoryImage src={Category} alt="Imagem de Categoria" />
      <Carousel
        itemsToShow={4}
        style={{ width: '90%' }}
        breakPoints={breakPoints}
      >
        {categories.map(category => (
          <ContainerItems key={category.id}>
            <Image src={category.url} alt="Foto da categoria" />
            <Button
              to={{
                pathname: '/produtos',
                state: { categoryId: category.id }
              }}
            >
              {category.name}
            </Button>
          </ContainerItems>
        ))}
      </Carousel>
    </Container>
  )
}
