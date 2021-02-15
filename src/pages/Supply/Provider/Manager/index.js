import React, { useCallback, useEffect, useState } from 'react'
import { map } from 'ramda'

import { buildDataSource } from './specs'
import {
    GetProvider,
} from '../../../../services/Suprimentos/fornecedor'
import ManagerContainer from '../../../../containers/Supply/Provider/Manager'

const Manager = ({ history }) => {
  const [dataSource, setDataSource] = useState([])
  const [page, setPage] = useState(1)
  const [queryProvider, setQueryProduct] = useState({})
  const [total, setTotal] = useState(10)
  const [visibleSearch, setVisibleSearch] = useState()

  const getAllProvider = useCallback(() => {
    const { razaoSocial, cnpj, createdAt } = queryProvider
    const query = {
    filters: {
        supProvider: {
          specific: {
            cnpj,
            createdAt: createdAt
            ? {
              end: createdAt[1]._d,
              start: createdAt[0]._d,
            }
            : undefined,
            razaoSocial,
          }
        }
      },
      page,
      paranoid: true,
      required: true,
      total: 10,
    }

    GetProvider(query).then(({ data: { rows, count: total } }) => {
      setDataSource(map(buildDataSource, rows))
      setTotal(total)
    })
  }, [page, queryProvider])

  const handleOnChangeTable = ({ current }) => setPage(current)

  const handleOnClickEdit = (row) => {
    history.push(`edit/${row.id}`)
  }

  const handleOnClickNewProvider = () => {
    history.push('/logged/supply/provider/add')
  }

  const handleProductSearch = (productSearchFormData) => {
    setQueryProduct(productSearchFormData)
  }

  useEffect(() => {
    getAllProvider()
  }, [getAllProvider])

  return (
    <ManagerContainer
      dataSource={dataSource}
      handleOnChangeTable={handleOnChangeTable}
      handleOnClickCloseSearchForm={() => setVisibleSearch(false)}
      handleOnClickEdit={handleOnClickEdit}
      handleOnClickNewProvider={handleOnClickNewProvider}
      handleOnClickOpenSearchForm={() => setVisibleSearch(true)}
      handleOnSearch={handleProductSearch}
      pagination={{ total }}
      visibleSearch={visibleSearch}
    />
  )
}

export default Manager
