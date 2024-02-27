import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import ProductsBanner from '../../assets/products-banner.svg'
import { Header } from '../../components'
import { CardProducts } from '../../components/CardProducts'
import api from '../../services/api'
import { formatCurrency } from '../../utils/NumberFormat'
import {
  Container,
  ProductsImg,
  CategoryButton,
  CategoryMenu,
  ProductsContainer
} from './styles'

export const Products = ({ location: { state } }) => {
  let categoryId = 0
  if (state?.categoryId) {
    categoryId = state.categoryId
  }

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState(categoryId)

  useEffect(() => {
    async function fetch() {
      const { data } = await api.get('categories')

      const newCategories = [{ id: 0, name: 'Todas' }, ...data]

      setCategories(newCategories)
    }

    async function fetchProducts() {
      const { data: allProducts } = await api.get('products')

      const newProducts = allProducts.map(product => {
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })

      setProducts(newProducts)
    }

    fetch()
    fetchProducts()
  }, [])

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products)
    } else {
      const newFilteredProducts = products.filter(
        product => product.category_id === activeCategory
      )
      setFilteredProducts(newFilteredProducts)
    }
  }, [activeCategory, products])

  return (
    <Container>
      <Header page={'products'} />
      <ProductsImg src={ProductsBanner} alt="Banner do CodeBurger" />
      <CategoryMenu>
        {categories.map(category => (
          <CategoryButton
            type="button"
            key={category.id}
            $isactivecategory={activeCategory === category.id}
            onClick={() => {
              setActiveCategory(category.id)
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>
      <ProductsContainer>
        {filteredProducts &&
          filteredProducts.map(product => (
            <CardProducts key={product.id} product={product} />
          ))}
      </ProductsContainer>
    </Container>
  )
}

Products.propTypes = {
  location: PropTypes.object
}
