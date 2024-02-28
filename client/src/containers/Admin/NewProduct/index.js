import { useEffect } from 'react'

import api from '../../../services/api'

const NewProduct = () => {
  useEffect(() => {
    async function fetchOrders() {
      const { data } = await api.get('products')
    }

    fetchOrders()
  }, [])

  return (
    <div>
      <h1>Olá, NewProduct</h1>
    </div>
  )
}

export default NewProduct
