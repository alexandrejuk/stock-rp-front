import React from 'react'
import { compose, filter, map } from 'ramda'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import AddKitRoute from './Gerenciar/Kit'
import CadastroProdutosSupRoute from './Suprimentos/Cad.Produtos'
import Dash from './Dash'
import EditarFornecedorSupRoute from './Suprimentos/Edit.Fornecedor'
import EntradaSupRoute from './Suprimentos/Entrada'
import Entry from './Entry'
import ECommerce from './ECommerce'
import GerenciarCadastrosSupRoute from './Suprimentos/Ger.Cadastros'
import GerenciarEstoqueSupRoute from './Suprimentos/Ger.Estoque'
import Loan from './Loan'
import Mark from './Mark'
import Os from './Os'
import Profile from './Profile'
import Product from './Product'
import ProductType from './ProductType'
import Provider from './Provider'
import Reception from './Reception'
import Reports from './Reports'
import Romaneio from './Romaneio'
import SaidaSupRoute from './Suprimentos/Saida'
import Stock from './Stock'
import Supply from './Supply'
import TechnicianRoute from './Technician'
import TypeAcconuntRoute from './TypeAcconunt'
import User from './User'

const routeList = ({ auth }) => [
  {
    component: AddKitRoute,
    exact: false,
    path: '/logged/reservaKitAdd',
    permission: true,
  },
  {
    component: CadastroProdutosSupRoute,
    exact: false,
    path: '/logged/cadastroProdutosSup',
    permission: auth.permissions.suprimento,
  },
  {
    component: Dash,
    exact: true,
    path: '/logged/dash',
    permission: true,
  },
  {
    component: EditarFornecedorSupRoute,
    exact: false,
    path: '/logged/fornecedorSup/atualizar',
    permission: auth.permissions.suprimento,
  },
  {
    component: EntradaSupRoute,
    exact: false,
    path: '/logged/entradaSup',
    permission: auth.permissions.suprimento,
  },
  {
    component: Entry,
    exact: false,
    path: '/logged/entry',
    permission: true,
  },
  {
    component: ECommerce,
    exact: false,
    path: '/logged/E-Commerce',
    permission: true,
  },
  {
    component: GerenciarCadastrosSupRoute,
    exact: false,
    path: '/logged/gerenciarCadastrosSup',
    permission: auth.permissions.suprimento,
  },
  {
    component: GerenciarEstoqueSupRoute,
    exact: false,
    path: '/logged/gerenciarEstoqueSup',
    permission: auth.permissions.suprimento,
  },
  {
    component: Loan,
    exact: true,
    path: '/logged/loan',
    permission: true,
  },
  {
    component: Mark,
    exact: false,
    path: '/logged/mark',
    permission: true,
  },
  {
    component: Os,
    exact: false,
    path: '/logged/Os',
    permission: true,
  },
  {
    component: Profile,
    exact: false,
    path: '/logged/profile',
    permission: true,
  },
  {
    component: Product,
    exact: false,
    path: '/logged/product',
    permission: true,
  },
  {
    component: ProductType,
    exact: false,
    path: '/logged/productType',
    permission: true,
  },
  {
    component: Provider,
    exact: false,
    path: '/logged/provider',
    permission: true,
  },
  {
    component: Reception,
    exact: false,
    path: '/logged/reception',
    permission: true,
  },
  {
    component: Reports,
    exact: false,
    path: '/logged/reports',
    permission: true,
  },
  {
    component: Romaneio,
    exact: true,
    path: '/logged/romaneio',
    permission: true,
  },
  {
    component: SaidaSupRoute,
    exact: false,
    path: '/logged/saidaSup',
    permission: auth.permissions.suprimento,
  },
  {
    component: Stock,
    exact: false,
    path: '/logged/stock/manager',
    permission: true,
  },
  {
    component: Supply,
    exact: false,
    path: '/logged/supply',
    permission: auth.permissions.suprimento,
  },
  {
    component: TechnicianRoute,
    exact: false,
    path: '/logged/technician',
    permission: true,
  },
  {
    component: TypeAcconuntRoute,
    exact: false,
    path: '/logged/typeAccount',
    permission: true,
  },
  {
    component: User,
    exact: false,
    path: '/logged/user',
    permission: true,
  },
]

const renderRoute = ({ component, exact, path }) => (
  <Route component={component} exact={exact} key={path} path={path} />
)

const PagesRoute = ({auth}) => (
  <Switch>
    {map(
      renderRoute,
      filter(({ permission }) => permission, routeList({auth}))
    )}
    <Redirect to="/logged/dash" />
  </Switch>
)

const mapStateToProps = ({ auth }) => ({ auth })

const enhanced = compose(connect(mapStateToProps))

export default enhanced(PagesRoute)
