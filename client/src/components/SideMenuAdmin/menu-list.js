import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import paths from '../../constants/paths'

const list = [
  {
    id: 1,
    label: 'Pedidos',
    link: paths.Order,
    icon: ShoppingBagIcon
  },
  {
    id: 2,
    label: 'Listar Produtos',
    link: paths.ProductsAdmin,
    icon: ShoppingCartIcon
  },
  {
    id: 3,
    label: 'Novo produto',
    link: paths.NewProduct,
    icon: AddShoppingCartIcon
  }
]

export default list
