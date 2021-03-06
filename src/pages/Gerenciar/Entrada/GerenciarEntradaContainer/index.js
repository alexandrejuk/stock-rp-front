import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import "./index.css";
import { Spin, DatePicker, Button, Input, Tooltip, Modal } from "antd";
import { getEntrada, deleteEntrada } from "../../../../services/entrada";
import { redirectValueEntrada } from "../GerenciarEntradaRedux/action";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

class GerenciarEntrada extends Component {
  state = {
    idLine: "",
    modalRemove: false,
    redirect: false,
    avancado: false,
    loading: false,
    usuario: "",
    produto: "",
    data: "",
    entrada: {
      rows: []
    },
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    valueDate: { start: "2019/01/01" }
  };

  removerLinha = line => {
    this.setState({
      modalRemove: true,
      idLine: line
    });
  };

  onChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value,
      page: 1
    });

    await this.getAllEntrada();
  };

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    });
  };

  changePages = pages => {
    this.setState(
      {
        page: pages
      },
      () => {
        this.getAllEntrada();
      }
    );
  };

  getAllEntrada = async () => {
    this.setState({
      loading: true
    });

    const query = {
      filters: {
        name: this.state.produto,
        entrance: {
          specific: {
            responsibleUser: this.state.usuario,
            createdAt: this.state.valueDate
          }
        },
        product: {
          specific: {
            name: this.state.produto,
            modulo: this.props.auth.modulo
          }
        }
      },
      page: this.state.page,
      total: this.state.total
      // order: {
      //   field: 'createdAt',
      //   acendent: true,
      // },
    };

    await getEntrada(query).then(resposta =>
      this.setState({
        entrada: resposta.data,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show
      })
    );

    this.setState({
      loading: false
    });
  };

  redirectEntrada = async entrada => {
    const value = {
      id: entrada.id,
      stockBase: entrada.stockBase,
      amountAdded: entrada.amountAdded,
      razaoSocial: entrada.razaoSocial,
      name: entrada.name,
      companyId: entrada.companyId,
      productId: entrada.productId,
      serial: entrada.serial,
      createdAt: entrada.createdAtNotFormatted,
    };

    await this.props.redirectValueEntrada(value);

    await this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect exact push path to="/logged/entradaDash/dash" />;
    }
  };

  componentDidMount = async () => {
    await this.getAllEntrada();
  };

  searchDate = async e => {
    if (!e[0] || !e[1]) return;
    await this.setState({
      valueDate: { start: e[0]._d, end: e[1]._d }
    });

    await this.getAllEntrada();
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

  test = () => {
    if (this.state.entrada.rows.length !== 0) {
      return this.state.entrada.rows.map(line => (
        <div className="div-100-Gentrada">
          <div className="div-lines-Gentrada">
            <div className="cel-produto-cabecalho-Gentrada">
              <label className="div-table-label-cel-Gentrada">
                {line.name}
              </label>
            </div>
            <div className="cel-quant-cabecalho-Gentrada">
              <label className="div-table-label-cel-Gentrada">
                {line.amountAdded}
              </label>
            </div>
            <div className="cel-usuario-cabecalho-Gentrada">
              <label className="div-table-label-cel-Gentrada">
                {line.responsibleUser}
              </label>
            </div>
            <div className="cel-data-cabecalho-Gentrada">
              <label className="div-table-label-cel-Gentrada">
                {line.createdAt}
              </label>
            </div>
            {this.props.auth.typeAccount === "MOD" ? (
              <div className="cel-edit-cabecalho-Gentrada">
                <Tooltip placement="topLeft" title="Editar">
                  <EditOutlined
                    className="icon-edit"
                    style={{ fontSize: "20px", color: "#08c" }}
                    onClick={() => this.redirectEntrada(line)}
                    theme="outlined"
                  />
                </Tooltip>
                <Tooltip placement="topLeft" title="Remover">
                  <DeleteOutlined
                    className="icon-lixo"
                    onClick={() => this.removerLinha(line.id)}
                  />
                </Tooltip>
              </div>
            ) : null}
          </div>
          <div className=" div-separate1-Gentrada" />
        </div>
      ));
    } else {
      return <div className="div-naotemnada">Não há nenhuma entrada</div>;
    }
  };

  modalRemover = () => (
    <Modal
      title="Confirmação"
      visible={this.state.modalRemove}
      onOk={this.removeOs}
      onCancel={this.handleOk}
      okText="Continuar"
      cancelText="Cancelar"
    >
      <div className="div-textProdutos-GOs">
        Essa entrada será deletada, deseja continuar?
      </div>
    </Modal>
  );

  removeOs = async () => {
    const id = this.state.idLine;

    await deleteEntrada(id);

    await this.getAllEntrada();

    await this.setState({
      modalRemove: false,
      idLine: ""
    });
  };

  handleOk = () => {
    this.setState({
      modalRemove: false,
      idLine: ""
    });
  };

  render() {
    return (
      <div className="div-card-Gentrada">
        <div className="linhaTexto-Gentrada">
          <h1 className="h1-Gentrada">Gerenciar entrada</h1>
        </div>

        {this.state.avancado ? (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-ocultar-Rtecnico">
              <Button type="primary" className="button" onClick={this.avancado}>
                Ocultar
              </Button>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-produto-Gentrada">
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

              <div className="div-usuario-Gentrada">
                <div className="div-text-Rtecnico">Usuário:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
                  name="usuario"
                  value={this.state.usuario}
                  placeholder="Digite o usuário"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className="div-data-Gentrada">
                <div className="div-text-Rtecnico">Data:</div>
                <DatePicker.RangePicker
                  placeholder="Digite a data"
                  format="DD/MM/YYYY"
                  dropdownClassName="poucas"
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="div-avancado-Rtecnico">
            <Button type="primary" className="button" onClick={this.avancado}>
              Avançado
            </Button>
          </div>
        )}

        <div className="div-cabecalho-Gentrada">
          <div className="cel-produto-cabecalho-Gentrada">Produto</div>
          <div className="cel-quant-cabecalho-Gentrada">Qnt.</div>
          <div className="cel-usuario-cabecalho-Gentrada">Usuário</div>
          <div className="cel-data-cabecalho-Gentrada">Data lançamento</div>
          {this.props.auth.typeAccount === "MOD" ? (
            <div className="cel-edit-cabecalho-Gentrada" />
          ) : null}
        </div>
        <div className=" div-separate-Gentrada" />
        {this.state.loading ? (
          <div className="spin">
            <Spin spinning={this.state.loading} />
          </div>
        ) : (
          this.test()
        )}

        <this.Pages />
        <this.modalRemover />

        {this.renderRedirect()}
      </div>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ redirectValueEntrada }, dispach);
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(GerenciarEntrada);
