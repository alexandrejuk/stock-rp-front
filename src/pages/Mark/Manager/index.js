import React, { useCallback, useEffect, useState } from 'react'
import { applySpec, pathOr, map } from 'ramda'
import { Form, message } from 'antd'

import ManagerContainer from '../../../containers/Mark/Manager'
import {
  getMarca as getAllMarksService,
  newMarca as newMark,
} from '../../../services/produto'

const Manager = () => {
  const [dataSource, setDataSource] = useState([])
  const [formCreateMark] = Form.useForm()
  const [searchValue, setSearchValue] = useState('')
  const [visibleCreateMark, setVisibleCreateMark] = useState(false)

  const addKey = (array, key) => {
    return map((data) => {
      return { ...data, key: data[key] }
    }, array)
  }

  const getAllMarks = useCallback(() => {
    const query = {
      filters: {
        mark: {
          specific: {
            mark: searchValue,
          },
        },
      },
    }

    getAllMarksService(query).then(({ data }) => setDataSource((addKey(data, 'mark'))))
  }, [searchValue])

  const handleCancelCreateMark = () => {
    formCreateMark.resetFields()
    setVisibleCreateMark(false)
  }

  const handleOkCreateMark = async (markFormData) => {
    const buildNewMark = applySpec({
      mark: pathOr('', ['mark']),
      responsibleUser: pathOr('modrp', ['responsibleUser']),
    })

    try {
      const { status } = await newMark(buildNewMark(markFormData))

      if (status !== 200 && status !== 201 && status !== 204) {
        throw new Error('422 Unprocessable Entity!')
      }
      message.success('Marca cadastrada com sucesso')
      handleCancelCreateMark()
      getAllMarks()
    } catch (err) {
      message.error('Erro ao cadastrar marca')
      console.log(err)
    }
  }

  useEffect(() => {
    getAllMarks()
  }, [getAllMarks])

  return (
    <ManagerContainer
      dataSource={dataSource}
      formCreateMark={formCreateMark}
      handleCancelCreateMark={handleCancelCreateMark}
      handleOkCreateMark={handleOkCreateMark}
      handleOnClickNewMark={() => setVisibleCreateMark(true)}
      handleOnSearch={(searchValue) => setSearchValue(searchValue)}
      visibleCreateMark={visibleCreateMark}
    />
  )
}

export default Manager
