import list from './menu-list'
import { Container, ItemContainer, ListLink } from './styles'

export const SideMenuAdmin = () => {
  return (
    <Container>
      <hr />
      {list.map(lst => (
        <ItemContainer key={lst.id}>
          <lst.icon className="icon" />
          <ListLink to={lst.link}>{lst.label}</ListLink>
        </ItemContainer>
      ))}
      <hr />
    </Container>
  )
}
