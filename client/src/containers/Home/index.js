import HeaderBanner from '../../assets/header-banner.svg'
import { CategoryCarousel, OffersCarousel, Header } from '../../components'
import { Container, HomeImg } from './styles'

export const Home = () => {
  return (
    <Container>
      <Header page={'home'} />
      <HomeImg src={HeaderBanner} alt="Banner do CodeBurger" />
      <CategoryCarousel />
      <OffersCarousel />
    </Container>
  )
}
