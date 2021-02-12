import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, path, pathOr } from 'ramda'
import { withRouter } from 'react-router-dom'

import ManagerContainer from '../../../containers/User/Manager'
import { getUsers } from '../../../services/usuario'

const Manager = ({ auth, history }) => {
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [total, setTotal] = useState(10)

  const getAllUsers = useCallback(async () => {
    setLoading(true)

    const query = {
      filters: {
        user: {
          specific: {
            username: searchValue,
            modulo: path(['modulo'], auth),
          },
        },
      },
      page: current,
      total: 10,
    }

    try {
      const { data } = await getUsers(query)
      const rows = pathOr([], ['rows'], data)
      const count = pathOr(1, ['count'], data)
      setData(rows.map((row) => ({ ...row, key: row.id })))
      setLoading(false)
      setTotal(count)
    } catch (error) {
      setLoading(false)
    }
  }, [auth, current, searchValue])

  const goToAddUser = () => history.push('/logged/user/add')

  const goToUpdateUser = (user) => {
    history.push(`/logged/user/edit/${user.id}` )
  }

  const handlePaginations = ({ current }) => setCurrent(current)

  const handleSearch = (username) => {
    setSearchValue(username)
    setCurrent(1)
  }

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return (
    <ManagerContainer
      data={data}
      goToAddUser={goToAddUser}
      goToUpdateUser={goToUpdateUser}
      handlePaginations={handlePaginations}
      handleSearch={handleSearch}
      loading={loading}
      pagination={{ total, current }}
    />
  )
}

const mapStateToProps = ({ auth }) => ({
  auth,
})

const enhanced = compose(connect(mapStateToProps), withRouter)

Manager.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default enhanced(Manager)
