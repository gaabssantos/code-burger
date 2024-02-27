import { SideMenuAdmin } from '../../components/SideMenuAdmin'
import Orders from './Orders'
import { Container } from './styles'

export const Admin = () => {
  return (
    <Container>
      <SideMenuAdmin />
      <Orders />
    </Container>
  )
}
