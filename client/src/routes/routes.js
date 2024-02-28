import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import { Home, Login, Products, Register, Cart, Admin } from '../containers'
import ListProducts from '../containers/Admin/ListProducts'
import PrivateRoute from './private-route'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route component={Login} path="/login"></Route>
        <Route component={Register} path="/register"></Route>
        <PrivateRoute exact component={Home} path="/"></PrivateRoute>
        <PrivateRoute component={Products} path="/produtos"></PrivateRoute>
        <PrivateRoute component={Cart} path="/carrinho"></PrivateRoute>

        <PrivateRoute component={Admin} path="/pedidos" isAdmin></PrivateRoute>
        <PrivateRoute
          component={ListProducts}
          path="/listar"
          isAdmin
        ></PrivateRoute>
      </Switch>
    </Router>
  )
}

export default Routes
