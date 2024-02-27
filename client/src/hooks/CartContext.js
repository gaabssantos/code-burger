import PropTypes from 'prop-types'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  const updateLocalStorage = async products => {
    await localStorage.setItem('codeburger:cartInfo', JSON.stringify(products))
  }

  const putProductInCart = async product => {
    const cartIndex = cartProducts.findIndex(prd => prd.id === product.id)

    let newCartProducts = []
    if (cartIndex >= 0) {
      newCartProducts = cartProducts

      newCartProducts[cartIndex].quantity =
        newCartProducts[cartIndex].quantity + 1

      setCartProducts(newCartProducts)
    } else {
      product.quantity = 1
      newCartProducts = [...cartProducts, product]
      setCartProducts(newCartProducts)
    }

    updateLocalStorage(newCartProducts)
  }

  const deleteCartProducts = async productId => {
    const newCart = cartProducts.filter(product => product.id !== productId)
    setCartProducts(newCart)
    updateLocalStorage(newCart)
  }

  const addCartProduct = async productId => {
    const newCart = cartProducts.map(product => {
      return product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    })

    setCartProducts(newCart)

    updateLocalStorage(newCart)
  }

  const removeCartProduct = async productId => {
    const cartIndex = cartProducts.findIndex(prd => prd.id === productId)

    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map(product => {
        return product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      })
      setCartProducts(newCart)
      updateLocalStorage(newCart)
    } else {
      deleteCartProducts(productId)
    }
  }

  useEffect(() => {
    async function loadCartData() {
      const clientCartData = await JSON.parse(
        localStorage.getItem('codeburger:cartInfo')
      )

      if (clientCartData) {
        setCartProducts(clientCartData)
      }
    }

    loadCartData()
  }, [])

  return (
    <CartContext.Provider
      value={{
        putProductInCart,
        addCartProduct,
        removeCartProduct,
        cartProducts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used with CartContext')
  }

  return context
}

CartProvider.propTypes = {
  children: PropTypes.node
}
