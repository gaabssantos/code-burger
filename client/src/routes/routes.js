import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import { Home, Login, Products, Register, Cart, Admin } from '../containers'
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
        <PrivateRoute isAdmin component={Admin} path="/pedidos"></PrivateRoute>
      </Switch>
    </Router>
  )
}

export default Routes
