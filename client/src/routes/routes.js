import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import paths from '../constants/paths'
import { Home, Login, Products, Register, Cart, Admin } from '../containers'
import ListProducts from '../containers/Admin/ListProducts'
import PrivateRoute from './private-route'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route component={Login} path={paths.Login}></Route>
        <Route component={Register} path={paths.Register}></Route>
        <PrivateRoute exact component={Home} path={paths.Home}></PrivateRoute>
        <PrivateRoute component={Products} path={paths.Products}></PrivateRoute>
        <PrivateRoute component={Cart} path={paths.Cart}></PrivateRoute>

        <PrivateRoute
          component={Admin}
          path={paths.Order}
          isAdmin
        ></PrivateRoute>
        <PrivateRoute
          component={Admin}
          path={paths.ProductsAdmin}
          isAdmin
        ></PrivateRoute>
        <PrivateRoute
          component={Admin}
          path={paths.NewProduct}
          isAdmin
        ></PrivateRoute>
        <PrivateRoute
          component={Admin}
          path={paths.EditProduct}
          isAdmin
        ></PrivateRoute>
      </Switch>
    </Router>
  )
}

export default Routes
