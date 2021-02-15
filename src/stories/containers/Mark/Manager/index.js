import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { commerce } from 'faker'
import { Form } from 'antd'
import filterData from '../../../../utils/filterData'

import ManagerContainer from '../../../../containers/Mark/Manager'

export default {
  title: 'Containers/Marks',
  component: ManagerContainer,
}

const marksList = []

for (let key = 0; key < 100; key++) {
  marksList.push({
    mark: commerce.productName(),
    key,
  })
}

const handleCancelCreateMarkAction = action(
  'cancel create mark, close modal NewMark'
)
const handleOkCreateMarkAction = action('create mark')
const handleOnClickNewMarkAction = action('open modal NewMark')
const handleOnSearchAction = action('Search')

const Template = (args) => {
  const [dataSource, setDataSource] = useState(marksList)
  const [formCreateMark] = Form.useForm()
  const [visibleCreateMark, setVisibleCreateMark] = useState(false)

  const handleCancelCreateMark = (eventClick) => {
    formCreateMark.resetFields()
    handleCancelCreateMarkAction(eventClick)
    setVisibleCreateMark(false)
  }

  const handleOkCreateMark = (markFormData) => {
    handleOkCreateMarkAction(markFormData)
    setVisibleCreateMark(false)
  }

  const handleOnClickNewMark = (eventClick) => {
    handleOnClickNewMarkAction(eventClick)
    setVisibleCreateMark(true)
  }

  const handleOnSearch = (searchValue) => {
    handleOnSearchAction(searchValue)
    setDataSource(filterData({ mark: searchValue }, marksList))
  }

  return (
    <ManagerContainer
      {...args}
      dataSource={dataSource}
      formCreateMark={formCreateMark}
      handleCancelCreateMark={handleCancelCreateMark}
      handleOkCreateMark={handleOkCreateMark}
      handleOnClickNewMark={handleOnClickNewMark}
      handleOnSearch={handleOnSearch}
      visibleCreateMark={visibleCreateMark}
    />
  )
}

export const AddMark = Template.bind({})

AddMark.args ={
  handleChangeTable: action('handle change table') ,
  pagination: { showSizeChanger: false }
}
