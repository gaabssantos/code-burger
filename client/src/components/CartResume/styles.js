import styled from 'styled-components'

export const ContainerItems = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .container-top {
    display: grid;
    grid-template-areas:
      'title title'
      'items items-price'
      'delivery-tax delivery-tax-price';
    grid-gap: 10px 50px;

    .title {
      grid-area: title;
      margin-bottom: 20px;
    }

    .items {
      grid-area: items;
    }

    .items-price {
      grid-area: items-price;
    }

    .delivery-tax {
      grid-area: delivery-tax;
    }

    .delivery-tax-price {
      grid-area: delivery-tax-price;
    }
  }

  .container-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 24px;
    margin-top: 50px;
  }

  @media (max-width: 600px) {
    margin: 30px auto;
    width: 80%;
  }

  @media (max-width: 800px) {
    margin: 30px auto;
    width: 80%;
  }
`

export const Container = styled.div`
  .button-cart-resume {
    width: 100%;
    margin-top: 30px;

    @media (max-width: 600px) {
      width: 80%;
      margin: 0 45px;
    }

    @media (max-width: 800px) {
      width: 75%;
      margin: 0 80px;
    }
  }
`
