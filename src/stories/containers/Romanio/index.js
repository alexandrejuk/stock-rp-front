import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { commerce, company, name, random } from 'faker'
import { addIndex, adjust, append, filter, find, findIndex, propEq } from 'ramda'

import RomaneioContainer from '../../../containers/Romaneio'

export default {
  title: 'Containers/Romaneio',
  component: RomaneioContainer,
}

const osList = [],
  osPartsArrayReturnInitialValue = [],
  productsWaitingExpeditionInitial = [],
  productsWaitingReturnInitialValue = [],
  technicianList = [{ name: 'LABORATORIO', key: 'LABORATORIO' }]

for (let key = 0; key < 50; key++) {
  const hasOs = random.boolean()
  const serial = random.boolean()

  osList.push({
    key,
    os: key,
    razaoSocial: company.companyName(),
  })

  osPartsArrayReturnInitialValue.push({
    key,
    amount: random.number() % 50,
    missOut: random.number() % 10,
    osPartId: key,
    os: key,
    output: random.number() % 10,
    razaoSocial: company.companyName(),
    return: random.number() % 10,
  })

  productsWaitingExpeditionInitial.push({
    key,
    os: key,
    id: key,
    amount: serial ? 1 : random.number() % 50,
    serialNumber: serial ? random.number().toString() : null,
    produto: commerce.productName(),
    serial: random.boolean(),
  })

  productsWaitingReturnInitialValue.push({
    key,
    id: key,
    os: hasOs ? key : '-',
    amount: serial ? 1 : (random.number() % 50) - hasOs ? 30 : 0,
    produto: commerce.productName(),
    serialNumber: serial ? random.number().toString() : null,
    saida: serial ? 1 : random.number() % 10,
    retorno: serial ? 0 : random.number() % 10,
    perda: serial ? 0 : random.number() % 10,
    serial,
  })

  technicianList.push({
    key,
    name: name.firstName(),
  })
}

const handleCancelModalExpeditionSerialNumberAction = action(
  'Cancel modal expedition serial number'
)
const handleCancelProductReturnAction = action('Cancel product return')
const handleClickArrowAction = action('Click arrow')
const handleClickIconExpeditionSerialNumberAction = action(
  'Click icon expedition serial number'
)
const handleClickPlusIconAction = action('Click plus icon')
const handleOnChangeSerialNumberSearchAction = action(
  'Change serial number search'
)
const handleSearchEquipAction = action('Search Equip waiting expediton')
const handleSubmitFormSearchAction = action('Submit form search')

const Template = (args) => {
  const [productsForExpedition, setProductsForExpedition] = useState([])
  const [productsWaitingExpedition, setProductsWaitingExpedition] = useState(
    productsWaitingExpeditionInitial
  )
  const [rowSelected, setRowSelected] = useState({})
  const [serialNumberSearch, setSerialNumberSearch] = useState('')
  const [serviço, setServiço] = useState('')
  const [
    visibleModalExpeditionProducts,
    setVisibleModalExpeditionProducts,
  ] = useState(false)
  const [
    visibleModalExpeditionSerialNumber,
    setVisibleModalExpeditionSerialNumber,
  ] = useState(false)

  const handleCancelModalExpeditionSerialNumber = () => {
    handleCancelModalExpeditionSerialNumberAction(false)
    setVisibleModalExpeditionSerialNumber(false)
  }

  const handleCancelProductReturn = () => {
    handleCancelProductReturnAction(false)
    setVisibleModalExpeditionProducts(false)
  }

  const handleClickArrow = (props) => {
    handleClickArrowAction(props)

    const index = findIndex(propEq('id', props.id))(productsForExpedition)

    const mapIndexed = addIndex(filter)

    setProductsWaitingExpedition(
      mapIndexed(
        (_, idx) =>
          idx !== findIndex(propEq('id', props.id))(productsWaitingExpedition),
        productsWaitingExpedition
      )
    )

    if (index >= 0) {
      const incremenAmount = (obj) => {
        return { ...obj, amount: obj.amount + props.amount }
      }
      setProductsForExpedition(
        adjust(index, incremenAmount, productsForExpedition)
      )
    } else {
      setProductsForExpedition(
        append({ ...props, serialNumbers: [] }, productsForExpedition)
      )
    }
  }

  const handleClickIconExpeditionSerialNumber = (row) => {
    handleClickIconExpeditionSerialNumberAction(true)
    setRowSelected(row)
    setVisibleModalExpeditionSerialNumber(true)
  }

  const handleClickPlusIcon = () => {
    handleClickPlusIconAction(true)
    setVisibleModalExpeditionProducts(true)
  }

  const handleOnChangeSerialNumberSearch = ({ target }) => {
    handleOnChangeSerialNumberSearchAction(target)
    setSerialNumberSearch(target.value)
  }

  const handleSearchEquip = (serialNumberSearch) => {
    handleSearchEquipAction(serialNumberSearch)

    const index = find(propEq('serialNumber', serialNumberSearch))(
      productsWaitingExpedition
    )

    setSerialNumberSearch('')

    if (!index) return

    handleClickArrow(index)
  }

  const handleSubmitFormSearch = ({ serviço }) => {
    handleSubmitFormSearchAction(serviço)
    setServiço(serviço)
  }

  return (
    <RomaneioContainer
      {...args}
      handleCancelModalExpeditionSerialNumber={
        handleCancelModalExpeditionSerialNumber
      }
      handleCancelProductReturn={handleCancelProductReturn}
      handleClickArrow={handleClickArrow}
      handleClickIconExpeditionSerialNumber={
        handleClickIconExpeditionSerialNumber
      }
      handleClickPlusIcon={handleClickPlusIcon}
      handleOnChangeSerialNumberSearch={handleOnChangeSerialNumberSearch}
      handleSearchEquip={handleSearchEquip}
      handleSubmitFormSearch={handleSubmitFormSearch}
      serialNumberSearch={serialNumberSearch}
      serviço={serviço}
      productsForExpedition={productsForExpedition}
      productsWaitingExpedition={filter(
        ({ amount }) => amount,
        productsWaitingExpedition
      )}
      rowSelected={rowSelected}
      visibleModalExpeditionProducts={visibleModalExpeditionProducts}
      visibleModalExpeditionSerialNumber={visibleModalExpeditionSerialNumber}
    />
  )
}

export const Romaneio = Template.bind({})

Romaneio.args = {
  handleOkModalExpeditionSerialNumber: action(
    'Click ok in modal expedition serial number'
  ),
  handleSubmitCheckList: action('Submit checklist'),
  handleSubmitNewReservaTecnico: action('Submit New Reserva Tecnico'),
  handleSubimtProductReturn: action('Subimt product return'),
  osList: osList,
  osPartsArrayReturn: osPartsArrayReturnInitialValue,
  productsWaitingReturn: productsWaitingReturnInitialValue,
  returnForAssociation: action('Return for association'),
  technicianList: technicianList,
}
