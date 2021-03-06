import React, { Component } from "react";
import "./index.css";
import {
  Button,
  Select,
  Input,
  Modal,
  Tooltip,
  InputNumber,
  Spin,
  message,
  DatePicker,
} from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// import * as R from 'ramda'

import { getTecnico } from "../../../../services/tecnico";
// import { baixaReservaOs } from '../../../../services/reservaOs';
import { getKit, baixasKitOut } from "../../../../services/kit";
import { getOsByOs } from "../../../../services/reservaOs";

import {
  ArrowRightOutlined,
  AlertOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Option } = Select;

class ReservaKit extends Component {
  state = {
    valueDate: { start: "2019/01/01" },
    modalBaixa: false,
    produtoSelecionado: {
      products: {},
    },
    os: "",
    avancado: false,
    produto: "",
    data: "",
    teste: NaN,
    teste1: 1,
    totalModal: 0,
    incluidos: 0,
    liberados: 0,
    perdas: 0,
    tecnicoArray: [],
    kitArray: {
      rows: [],
    },
    tecnico: "Não selecionado",
    redirect: false,
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    message: {
      Os: "",
    },
    fieldFalha: {
      Os: false,
    },
  };

  aviso = () => {
    message.warning("Finalize ou cancele a expedição!");
  };

  changePages = (pages) => {
    this.setState(
      {
        page: pages,
      },
      () => {
        this.getAllKit();
      }
    );
  };

  messageError = () => {
    message.error("Essa OS não consta no nosso sistema ou já foi liberado");
  };

  messageErrorKit = () => {
    message.error("É necessário informar a Os");
  };

  getAllKit = async () => {
    this.setState({
      loading: true,
    });

    const query = {
      filters: {
        technician: {
          specific: {
            name: this.state.tecnico,
          },
        },
        product: {
          specific: {
            name: this.state.produto,
          },
        },
        kitParts: {
          specific: {
            updatedAt: this.state.valueDate,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };

    await getKit(query).then((resposta) =>
      this.setState({
        kitArray: resposta.data,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
      })
    );

    this.setState({
      loading: false,
    });
  };

  closeModal = () => {
    this.setState({
      modalBaixa: false,
      os: "",
      incluidos: 0,
      liberados: 0,
      perdas: 0,
      teste: 0,
      teste1: 1,
    });
  };

  saveTargetNewKitOut = async () => {
    if (!(this.state.os === "" && this.state.liberados.toString() !== "0")) {
      const values = {
        reposicao: this.state.incluidos.toString(),
        expedicao: this.state.liberados.toString(),
        perda: this.state.perdas.toString(),
        os: this.state.os,
        kitPartId: this.state.produtoSelecionado.products.kitPartId,
      };

      const resposta = await baixasKitOut(values);

      if (resposta.status === 422) {
        this.setState({
          messageError: true,
          fieldFalha: resposta.data.fields[0].field,
          message: resposta.data.fields[0].message,
        });
        await this.error(
          resposta.data.fields[0].field.message
            ? resposta.data.fields[0].message.message
            : "A reserva não foi efetuada"
        );
        this.setState({
          os: "",
          incluidos: 0,
          liberados: 0,
          perdas: 0,
          messageError: false,
        });
      }
      if (resposta.status === 200) {
        this.setState({
          modalBaixa: false,
          os: "",
          incluidos: 0,
          liberados: 0,
          perdas: 0,
          messageSuccess: true,
        });
        await this.success();
        this.setState({
          messageSuccess: false,
        });

        await this.getAllKit();
      }
    } else {
      await this.messageErrorKit();
    }
  };

  success = () => {
    message.success("A reserva foi efetuada");
  };

  error = (value) => {
    message.error(value);
  };

  handleOkModalPeca = async () => {
    await this.setState({
      modalBaixa: false,
      produtoSelecionado: {
        products: {},
      },
      teste: NaN,
      teste1: 1,
    });
  };

  openModalDetalhes = async (valor) => {
    await this.setState({
      modalBaixa: true,
      produtoSelecionado: {
        products: valor,
      },
      totalModal: parseInt(valor.amount, 10),
      teste: parseInt(valor.amount, 10),
    });
  };

  onChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });

    await this.getAllKit();
  };

  onChangeOs = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado,
    });
  };

  getAllTecnico = async () => {
    const query = {
      external: true,
    };

    await getTecnico(query).then((resposta) =>
      this.setState({
        tecnicoArray: resposta.data,
      })
    );
  };

  componentDidMount = async () => {
    await this.getAllTecnico();

    if (this.state.tecnicoArray.length !== 0) {
      await this.setState({
        tecnico: this.state.tecnicoArray[0].name,
      });
    }

    await this.getAllKit();
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (!this.props.auth.addKitOut) {
      return <Redirect to="/logged/dash" />;
    }

    if (this.state.redirect) {
      return <Redirect push to="/logged/reservaKitAdd/add" />;
    }
  };

  onChangeTecnico = async (value) => {
    await this.setState({
      tecnico: value,
    });

    await this.getAllKit();
  };

  onChangeModal = (value) => {
    this.setState({
      teste: value,
    });
  };

  onChangeModal1 = (value) => {
    this.setState({
      teste1: value,
    });
  };

  retornar = async () => {
    const menos =
      parseInt(this.state.produtoSelecionado.products.amount, 10) +
      this.state.teste1;

    this.setState({
      produtoSelecionado: {
        products: {
          ...this.state.produtoSelecionado.products,
          amount: menos,
        },
      },
      totalModal: menos,
      incluidos: this.state.incluidos + this.state.teste1,
      teste1: 1,
    });
  };

  perda = async () => {
    const menos =
      parseInt(this.state.produtoSelecionado.products.amount, 10) -
      this.state.teste;

    this.setState({
      produtoSelecionado: {
        products: {
          ...this.state.produtoSelecionado.products,
          amount: menos,
        },
      },
      totalModal: menos,
      perdas: this.state.perdas + this.state.teste,
      teste: 1,
    });
  };

  liberar = async () => {
    if (this.state.os === "") {
      return this.messageErrorKit();
    }

    const menos =
      parseInt(this.state.produtoSelecionado.products.amount, 10) -
      this.state.teste;

    this.setState({
      produtoSelecionado: {
        products: {
          ...this.state.produtoSelecionado.products,
          amount: menos,
        },
      },
      totalModal: menos,
      liberados: this.state.liberados + this.state.teste,
      teste: 1,
    });
  };

  searchDate = async (e) => {
    if (!e[0] || !e[1]) return;
    await this.setState({
      valueDate: { start: e[0]._d, end: e[1]._d },
    });
    await this.getAllKit();
  };

  getOs = async () => {
    const os = await getOsByOs(this.state.os);

    if (os.status === 200) {
      if (os.data.razaoSocial) {
        await this.setState({
          fieldFalha: {
            Os: false,
          },
          message: {
            Os: "",
          },
        });
      } else {
        this.setState(
          {
            fieldFalha: {
              Os: true,
            },
            os: "",
          },
          this.messageError()
        );
      }
    }
  };

  Pages = () => (
    <div className="footer-Gentrada-button">
      {Math.ceil(this.state.count / this.state.total) >= 5 &&
      Math.ceil(this.state.count / this.state.total) - this.state.page < 1 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 4)}
        >
          {this.state.page - 4}
        </Button>
      ) : null}
      {Math.ceil(this.state.count / this.state.total) >= 4 &&
      Math.ceil(this.state.count / this.state.total) - this.state.page < 2 &&
      this.state.page > 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 3)}
        >
          {this.state.page - 3}
        </Button>
      ) : null}
      {this.state.page >= 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 2)}
        >
          {this.state.page - 2}
        </Button>
      ) : null}
      {this.state.page >= 2 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 1)}
        >
          {this.state.page - 1}
        </Button>
      ) : null}
      <div className="div-teste">{this.state.page}</div>
      {this.state.page < this.state.count / this.state.total ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 1)}
        >
          {this.state.page + 1}
        </Button>
      ) : null}
      {this.state.page + 1 < this.state.count / this.state.total ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 2)}
        >
          {this.state.page + 2}
        </Button>
      ) : null}
      {this.state.page + 2 < this.state.count / this.state.total &&
      this.state.page < 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 3)}
        >
          {this.state.page + 3}
        </Button>
      ) : null}
      {this.state.page + 3 < this.state.count / this.state.total &&
      this.state.page < 2 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 4)}
        >
          {this.state.page + 4}
        </Button>
      ) : null}
    </div>
  );

  modalDetalhesLinha = () => (
    <Modal
      title="Detalhes do atendimento"
      visible={this.state.modalBaixa}
      onCancel={this.aviso}
      footer={
        <div>
          <Button type="primary" onClick={this.closeModal}>
            Cancelar
          </Button>
          <Button type="primary" onClick={this.saveTargetNewKitOut}>
            Finalizar
          </Button>
        </div>
      }
    >
      <div className="div-space-modal">
        <div className="div-textProdutos-Rtecnico">Produtos reservados</div>
        <div className="div-os-modal">
          <Input
            onChange={this.onChangeOs}
            value={this.state.os}
            name="os"
            placeholder="Os"
            onBlur={this.getOs}
          />
        </div>
      </div>
      <div className="div-body-modal">
        <div className="div-text-modal">
          <div className="div-produtos-modal-kit">Produtos</div>
          <div className="div-quant-modal">Quant.</div>
          <div className="div-acoes-modal-kit">Ações</div>
        </div>
        <div className="div-separate-modal" />
        <div className="div-text-modal">
          <div className="div-produtos-modal-kit">
            {this.state.produtoSelecionado.products.name}
          </div>
          <div className="div-quant-modal">
            <InputNumber
              min={1}
              max={this.state.produtoSelecionado.products.amount}
              defaultValue={this.state.teste}
              style={{ width: "90%" }}
              value={this.state.teste}
              onChange={this.onChangeModal}
            />
          </div>
          <div className="div-acoes-modal-kit">
            <Tooltip placement="top" title="Liberar">
              <Button
                type="primary"
                className="button-liberar"
                onClick={this.liberar}
              >
                <ArrowRightOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Perda">
              <Button
                type="primary"
                className="button-remove-entrada"
                onClick={this.perda}
              >
                <AlertOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="div-text-modal">
          <div className="div-produtos-modal-kit"></div>
          <div className="div-quant-modal">
            <InputNumber
              min={1}
              max={this.state.produtoSelecionado.products.quantMax}
              defaultValue={this.state.teste1}
              style={{ width: "90%" }}
              value={this.state.teste1}
              onChange={this.onChangeModal1}
            />
          </div>
          <div className="div-acoes-modalMais-kit">
            <Tooltip placement="top" title="Adicionar">
              <Button type="primary" className="button" onClick={this.retornar}>
                <PlusOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="div-total-modal">
          <div className="div-baixo">Total:</div>
          <div className="div-baixo">Incluídos:</div>
          <div className="div-baixo">Liberados:</div>
          <div className="div-baixo">Perdas:</div>
        </div>
        <div className="div-total-modal2">
          <div className="div-baixo2">{this.state.totalModal}</div>
          <div className="div-baixo2">{this.state.incluidos}</div>
          <div className="div-baixo2">{this.state.liberados}</div>
          <div className="div-baixo2">{this.state.perdas}</div>
        </div>
      </div>
    </Modal>
  );

  test = () => {
    if (this.state.kitArray.rows.length !== 0) {
      return this.state.kitArray.rows.map((line) => (
        <div className="div-100-Gentrada">
          <div className="div-lines1-kit">
            <div className="cel-produto-cabecalho-kit">{line.name}</div>
            <div className="cel-quant-cabecalho-kit">{line.amount}</div>
            <div className="cel-data-cabecalho-kit">{line.updatedAt}</div>
            <div className="cel-acoes-cabecalho-kit">
              <Button
                className="button"
                type="primary"
                onClick={() => this.openModalDetalhes(line)}
              >
                <EditOutlined />
              </Button>
            </div>
            <this.modalDetalhesLinha />
          </div>
          <div className="div-separate1-kit"></div>
        </div>
      ));
    } else {
      return (
        <div className="div-naotemnada">
          Não há nenhuma reserva finalizada até o momento
        </div>
      );
    }
  };

  render() {
    return (
      <div className="div-card-kit">
        <div className="linhaTexto-kit">
          <h1 className="h1-kit">Kit do técnico</h1>
        </div>

        {this.state.avancado ? (
          <div className="div-avancado-buttons-kit">
            <div className="div-button-avancado-kit">
              {this.renderRedirect()}
              {this.props.auth.addKit ? (
                <Button
                  className="button"
                  type="primary"
                  onClick={this.setRedirect}
                >
                  Gerenciar kit
                </Button>
              ) : null}
              <Button className="button" type="primary" onClick={this.avancado}>
                Ocultar
              </Button>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-produto-Rtecnico">
                <div className="div-text-Os">Produto:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
                  name="produto"
                  value={this.state.produto}
                  placeholder="Digite o nome do produto"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className="div-data-kit">
                <div className="div-text-Rtecnico">Data:</div>
                {/* <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='data'
                  value={this.state.data}
                  placeholder="Digite a data"
                  onChange={this.onChange}
                  allowClear
                /> */}
                <DatePicker.RangePicker
                  placeholder="Digite a data"
                  format="DD/MM/YYYY"
                  dropdownClassName="poucas"
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                  // className='input-100'
                  // style={{ width: '100%' }}
                  // name='data'
                  // value={this.state.data}
                  // placeholder="Digite a data"
                  // onChange={this.onChange}
                  // allowClear
                />
              </div>

              <div className="div-tecnico1-kit">
                <div className="div-text-Rtecnico">Técnico:</div>
                {this.state.tecnicoArray.length === 0 ? (
                  <Select
                    value="Nenhum tecnico cadastrado"
                    style={{ width: "100%" }}
                  ></Select>
                ) : (
                  <Select
                    value={this.state.tecnico}
                    style={{ width: "100%" }}
                    onChange={this.onChangeTecnico}
                  >
                    {this.state.tecnicoArray.map((valor) => (
                      <Option value={valor.name}>{valor.name}</Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="div-avancado-buttons-kit">
            <div className="div-button-avancado-kit">
              {this.renderRedirect()}
              {this.props.auth.addKit ? (
                <Button
                  className="button"
                  type="primary"
                  onClick={this.setRedirect}
                >
                  Gerenciar kit
                </Button>
              ) : null}
              <Button type="primary" className="button" onClick={this.avancado}>
                Avançado
              </Button>
            </div>
          </div>
        )}
        <div className="div-cabecalho-kit">
          <div className="cel-produto-cabecalho-kit">Produto</div>
          <div className="cel-quant-cabecalho-kit">Qnt.</div>
          <div className="cel-data-cabecalho-kit">Data lançamento</div>
          <div className="cel-acoes-cabecalho-kit">Ações</div>
        </div>

        <div className=" div-separate-kit"></div>
        {this.state.loading ? (
          <div className="spin">
            <Spin spinning={this.state.loading} />
          </div>
        ) : (
          this.test()
        )}

        <this.Pages />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ReservaKit);
