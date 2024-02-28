import LogoutIcon from '@mui/icons-material/Logout'

import paths from '../../constants/paths'
import { useUser } from '../../hooks/UserContext'
import list from './menu-list'
import { Container, ItemContainer, ListLink } from './styles'

export const SideMenuAdmin = () => {
  const { logoutUser } = useUser()

  return (
    <Container>
      <hr />
      {list.map(lst => (
        <ItemContainer key={lst.id} isActive={true}>
          <lst.icon className="icon" />
          <ListLink to={lst.link}>{lst.label}</ListLink>
        </ItemContainer>
      ))}
      <hr />
      <ItemContainer
        style={{ position: 'absolute', bottom: '30px' }}
        isActive={false}
      >
        <LogoutIcon style={{ color: '#fff' }} />
        <ListLink to={paths.Login} onClick={logoutUser}>
          Sair
        </ListLink>
      </ItemContainer>
    </Container>
  )
}
