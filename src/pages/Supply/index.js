import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SupplyEntryRoutes from './Entry'
import SupplyManufacurerRoutes from './Manufacurer'
import SupplyOutputRoutes from './Output'
import SupplyProductRoutes from './Product'
import SupplyStockRoutes from './Stock'
import SupplyManagerProviderRoutes from './Provider/Manager'
import SupplyProviderRoutes from './Provider/Register'

const SupplyRoutes = () => (
  <Switch>
    <Route component={SupplyEntryRoutes} path="/logged/supply/entry" />
    <Route
      component={SupplyManufacurerRoutes}
      path="/logged/supply/manufacurer"
    />
    <Route component={SupplyOutputRoutes} path="/logged/supply/output" />
    <Route component={SupplyProductRoutes} path="/logged/supply/product" />
    <Route component={SupplyStockRoutes} path="/logged/supply/stock" />
    <Route component={SupplyManagerProviderRoutes} path="/logged/supply/provider/manager" />
    <Route component={SupplyProviderRoutes} path="/logged/supply/provider/add" />
  </Switch>
)

export default SupplyRoutes
