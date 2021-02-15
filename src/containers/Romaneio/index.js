import React, { useState } from 'react'
import { equals, filter, length, map } from 'ramda'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
  Typography,
} from 'antd'
import { ScanOutlined } from '@ant-design/icons'

import ModalExpeditionSerialNumber from './Components/ModalExpeditionSerialNumber'
import ModalSemNumeroSerie from './Components/ModalSemNumeroSerie'
import {
  columns,
  columnsProductsWaitingReturnWithOs,
  columnsProductsWaitingReturnWithOutOs,
  columnsWaitingExpedition,
} from './utils/columns'

const { Option } = Select
const { Search } = Input
const { Title } = Typography

const OutputContainer = ({
  handleClickArrow,
  handleOnChangeSerialNumberSearch,
  handleSearchEquip,
  handleSubmitNewReservaTecnico,
  productsForExpedition,
  productsWaitingExpedition,
  serialNumberSearch,
}) => (
  <>
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Search
          allowClear
          enterButton={<ScanOutlined />}
          onChange={handleOnChangeSerialNumberSearch}
          onSearch={handleSearchEquip}
          placeholder="insira o sumero de série a ser liberado"
          value={serialNumberSearch}
        />
      </Col>
    </Row>

    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Table
          columns={columnsWaitingExpedition(handleClickArrow)}
          dataSource={filter(
            ({ amount }) => amount > 0,
            productsWaitingExpedition
          )}
        />
      </Col>
    </Row>

    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Table
          columns={[
            ...columns,
            {
              title: 'Número de Série',
              dataIndex: 'serialNumber',
            },
          ]}
          dataSource={productsForExpedition}
        />
      </Col>
    </Row>

    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Button type="primary" onClick={handleSubmitNewReservaTecnico}>
          Enviar
        </Button>
      </Col>
    </Row>
  </>
)

const TableChecklist = ({
  checkList,
  handleSubmitCheckList,
  productsWaitingReturn,
  returnForAssociation,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  return (
    <>
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <Table
            columns={columnsProductsWaitingReturnWithOs({
              returnForAssociation,
              selectedRowKeys: [],
            })}
            dataSource={checkList}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
            }}
          />
        </Col>
      </Row>
      <Button
        disabled={
          !equals(
            length(filter(({ os }) => os !== '-', productsWaitingReturn)),
            length(selectedRowKeys)
          )
        }
        type="primary"
        onClick={() => {
          handleSubmitCheckList(checkList)
        }}
      >
        Enviar
      </Button>
    </>
  )
}

const Romaneio = ({
  handleCancelModalExpeditionSerialNumber,
  handleCancelProductReturn,
  handleClickArrow,
  handleClickIconExpeditionSerialNumber,
  handleClickPlusIcon,
  handleOkModalExpeditionSerialNumber,
  handleOnChangeSerialNumberSearch,
  handleSearchEquip,
  handleSubmitCheckList,
  handleSubmitFormSearch,
  handleSubmitNewReservaTecnico,
  handleSubimtProductReturn,
  osList,
  osPartsArrayReturn,
  productsForExpedition,
  productsWaitingExpedition,
  productsWaitingReturn,
  returnForAssociation,
  rowSelected,
  serialNumberSearch,
  serviço,
  technicianList,
  visibleModalExpeditionProducts,
  visibleModalExpeditionSerialNumber,
}) => {
  const checkList = map(
    (item) => {
      return {
        ...item,
        perda: item.prevAction === 'perda' ? 1 : item.missOut || 0,
        retorno: item.prevAction === 'retorno' ? 1 : item.return || 0,
        saida: item.prevAction === 'saida' ? 1 : item.output || 0,
      }
    },
    filter(({ os }) => os !== '-', productsWaitingReturn)
  )

  const ReturnContainer = () => (
    <>
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <Table
            columns={columnsProductsWaitingReturnWithOutOs({
              handleClickIconExpeditionSerialNumber,
              handleClickPlusIcon,
            })}
            dataSource={filter(
              ({ os, amount }) => os === '-' && amount > 0,
              productsWaitingReturn
            )}
          />
        </Col>
      </Row>

      <TableChecklist
        checkList={checkList}
        handleSubmitCheckList={handleSubmitCheckList}
        productsWaitingReturn={productsWaitingReturn}
        returnForAssociation={returnForAssociation}
      />
    </>
  )

  return (
    <>
      <ModalExpeditionSerialNumber
        handleCancel={handleCancelModalExpeditionSerialNumber}
        visible={visibleModalExpeditionSerialNumber}
        osList={osList}
        handleOk={handleOkModalExpeditionSerialNumber}
        rowSelected={rowSelected}
      />
      <ModalSemNumeroSerie
        visible={visibleModalExpeditionProducts}
        list={osPartsArrayReturn}
        handleSubimt={handleSubimtProductReturn}
        handleCancel={handleCancelProductReturn}
      />
      <Row justify="center">
        <Col>
          <Title level={3}>Romaneio</Title>
        </Col>
      </Row>

      <Form name="searchList" layout="vertical" onFinish={handleSubmitFormSearch}>
        <Row gutter={20}>
          <Col span={7}>
            <Form.Item
              name="serviço"
              label="Serviço:"
              rules={[{ required: true }]}
            >
              <Select placeholder="Selecione um serviço">
                <Option value="saida">Saída</Option>
                <Option value="retorno">Retorno</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name="technician"
              label="Técnico: "
              rules={[{ required: true }]}
            >
              <Select placeholder="Selecione um técnico">
                {map(
                  ({ key, name }) => (
                    <Option key={key} value={name}>
                      {name}
                    </Option>
                  ),
                  technicianList
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.technician !== currentValues.technician
              }
            >
              {({ getFieldValue }) => {
                return (
                  <Form.Item
                    name="date"
                    label="Data: "
                    rules={[
                      {
                        required: getFieldValue('technician') !== 'LABORATORIO',
                      },
                    ]}
                  >
                    <DatePicker
                      inputReadOnly
                      placeholder="Selecione uma data"
                      disabled={getFieldValue('technician') === 'LABORATORIO'}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                )
              }}
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                Buscar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {serviço === 'saida' && (
        <OutputContainer
          handleClickArrow={handleClickArrow}
          handleOnChangeSerialNumberSearch={handleOnChangeSerialNumberSearch}
          handleSearchEquip={handleSearchEquip}
          handleSubmitNewReservaTecnico={handleSubmitNewReservaTecnico}
          productsForExpedition={productsForExpedition}
          productsWaitingExpedition={productsWaitingExpedition}
          serialNumberSearch={serialNumberSearch}
        />
      )}

      {serviço === 'retorno' && <ReturnContainer />}
    </>
  )
}

export default Romaneio
