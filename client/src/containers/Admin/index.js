import PropTypes from 'prop-types'

import { SideMenuAdmin } from '../../components/SideMenuAdmin'
import paths from '../../constants/paths'
import ListProducts from './ListProducts'
import NewProduct from './NewProduct'
import Orders from './Orders'
import { Container, ContainerItems } from './styles'

export const Admin = ({ match: { path } }) => {
  return (
    <Container>
      <SideMenuAdmin path={path} />
      <ContainerItems>
        {path === paths.Order && <Orders />}
        {path === paths.ProductsAdmin && <ListProducts />}
        {path === paths.NewProduct && <NewProduct />}
      </ContainerItems>
    </Container>
  )
}

Admin.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string
  })
}
