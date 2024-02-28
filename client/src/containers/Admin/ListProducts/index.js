import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'

import api from '../../../services/api'
import { formatCurrency } from '../../../utils/NumberFormat'
import { Container, Image, EditButton } from './styles'

const ListProducts = () => {
  const [products, setProducts] = useState([])

  const [nameSort, setNameSort] = useState(false)
  const [priceSort, setPriceSort] = useState(false)
  const [offerSort, setOfferSort] = useState(false)

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await api.get('products')

      setProducts(data)
    }

    fetchOrders()
  }, [])

  const sortProducts = product => {
    if (product === 'name') {
      if (!nameSort) {
        const nameSort = products.sort((a, b) => a.name.localeCompare(b.name))
        setProducts([...nameSort])
        setPriceSort(false)
        setOfferSort(false)
        setNameSort(true)
      } else {
        const nameSort = products.sort((a, b) => b.name.localeCompare(a.name))
        setProducts([...nameSort])
        setNameSort(false)
      }
    } else if (product === 'price') {
      if (!priceSort) {
        const priceSort = products.sort((a, b) => a.price - b.price)
        setProducts([...priceSort])
        setNameSort(false)
        setOfferSort(false)
        setPriceSort(true)
      } else {
        const priceSort = products.sort((a, b) => b.price - a.price)
        setProducts([...priceSort])
        setPriceSort(false)
      }
    } else if (product === 'offer') {
      if (!offerSort) {
        const offerSort = products.sort((a, b) => !a.offer - !b.offer)
        setProducts([...offerSort])
        setNameSort(false)
        setPriceSort(false)
        setOfferSort(true)
      } else {
        const offerSort = products.sort((a, b) => !b.offer - !a.offer)
        setProducts([...offerSort])
        setOfferSort(false)
      }
    }
  }

  const arrowSort = (sort, product) => {
    if (sort === 'asc') {
      return (
        <ArrowUpwardIcon
          style={{
            position: 'absolute',
            marginLeft: '10px',
            cursor: 'pointer'
          }}
          onClick={() => sortProducts(product)}
        />
      )
    } else {
      return (
        <ArrowDownwardIcon
          style={{
            position: 'absolute',
            marginLeft: '10px',
            cursor: 'pointer'
          }}
          onClick={() => sortProducts(product)}
        />
      )
    }
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Nome
                {!nameSort
                  ? arrowSort('dec', 'name')
                  : arrowSort('asc', 'name')}
              </TableCell>
              <TableCell>
                Preço
                {!priceSort
                  ? arrowSort('dec', 'price')
                  : arrowSort('asc', 'price')}
              </TableCell>
              <TableCell align="center">
                Produto em Oferta
                {!offerSort
                  ? arrowSort('dec', 'offer')
                  : arrowSort('asc', 'offer')}
              </TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow
                key={product.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell align="center">
                  {product.offer ? (
                    <CheckIcon style={{ color: 'green' }} />
                  ) : (
                    <ClearIcon style={{ color: 'red' }} />
                  )}
                </TableCell>
                <TableCell>
                  <Image src={product.url} alt="Imagem do produto"></Image>
                </TableCell>
                <TableCell>
                  <EditButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ListProducts
