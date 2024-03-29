import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { toast } from 'react-toastify'

import api from '../../../services/api'
import status from './order-status'
import { ProductsImg, ReactSelectStyle } from './styles'

export const Row = ({ row, setOrders, orders }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function setNewStatus(id, status) {
    setIsLoading(true)
    try {
      await api.put(`orders/${id}`, { status })
      toast.success('Pedido atualizado')

      const newOrders = orders.map(order => {
        return order._id === id ? { ...order, status } : order
      })

      setOrders(newOrders)
    } catch (err) {
      console.error(err)
      toast.error('Deu algo de errado')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>
          <ReactSelectStyle
            options={status.filter(status => status.id !== 1)}
            menuPortalTarget={document.body}
            placeholder="Status"
            defaultValue={
              status.find(options => options.value === row.status) || null
            }
            onChange={newStatus => {
              setNewStatus(row.orderId, newStatus.value)
            }}
            isLoading={isLoading}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Pedido
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map(productRow => (
                    <TableRow key={productRow.id}>
                      <TableCell component="th" scope="row">
                        {productRow.quantity}
                      </TableCell>
                      <TableCell>{productRow.name}</TableCell>
                      <TableCell>{productRow.category}</TableCell>
                      <TableCell>
                        <ProductsImg
                          width={150}
                          src={productRow.url}
                          alt="Imagem do produto"
                        ></ProductsImg>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

Row.propTypes = {
  orders: PropTypes.array,
  setOrders: PropTypes.func,
  row: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired
      })
    )
  }).isRequired
}
