import React, { Component } from "react";
import "./index.css";
import { Select, Button, Input, Spin, InputNumber, DatePicker } from "antd";
import { split } from "ramda";
import moment from "moment";

import { GetSupProduct } from "../../../../services/Suprimentos/product";
import { GetEntrance } from "../../../../services/Suprimentos/entrada";
import { GetOut } from "../../../../services/Suprimentos/saida";

const { Option } = Select;

class GerenciarEstoqueSupPage extends Component {
  state = {
    avancado: true,
    select: "estoque",
    search: "",
    quant: 1,
    loading: false,
    page: 1,
    count: 1,
    show: 1,
    total: 10,
    products: [],
    entradas: [],
    saidas: [],
    produtoSearch: {
      nome: "",
    },
    entradaSearch: {
      data: "",
      produto: "",
      resp: "",
    },
    saidaSearch: {
      data: "",
      produto: "",
      solicitante: "",
      resp: "",
    },
    valueDate: { start: "2019/01/01" },
  };

  componentDidMount = async () => {
    await this.getSupProduct();
    await this.getEntrance();
    await this.getOut();
  };

  getSupProduct = async () => {
    const query = {
      filters: {
        supProduct: {
          specific: {
            name: this.state.produtoSearch.nome,
            // code: this.state.produtoSearch.codigo
            updatedAt: this.state.valueDate,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };
    const { status, data } = await GetSupProduct(query);

    if (status === 200) this.setState({ products: data.rows });
  };

  getEntrance = async () => {
    const query = {
      filters: {
        supEntrance: {
          specific: {
            responsibleUser: this.state.entradaSearch.resp,
            createdAt: this.state.valueDate,
          },
        },
        supProduct: {
          specific: {
            name: this.state.entradaSearch.produto,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };
    const { status, data } = await GetEntrance(query);

    if (status === 200) this.setState({ entradas: data.rows });
  };

  getOut = async () => {
    const query = {
      filters: {
        supOut: {
          specific: {
            solicitante: this.state.saidaSearch.solicitante,
            responsibleUser: this.state.saidaSearch.resp,
            createdAt: this.state.valueDate,
          },
        },
        supProduct: {
          specific: {
            name: this.state.saidaSearch.produto,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };
    const { status, data } = await GetOut(query);

    if (status === 200) this.setState({ saidas: data.rows });
  };

  changePages = async (pages) => {
    await this.setState({
      page: pages,
    });

    switch (this.state.select) {
      case "estoque":
      case "entrada":
        // await this.getEprestimo();
        break;
      case "saida":
        // await this.getAllEquips();
        break;
      default:
    }
  };

  onChange = async (e) => {
    const { name, value } = e.target;

    const nameArry = split(" ", name);

    await this.setState({
      [nameArry[0]]: { ...this.state[nameArry[0]], [nameArry[1]]: value },
    });

    switch (this.state.select) {
      case "estoque":
        await this.getSupProduct();
        break;
      case "entrada":
        await this.getEntrance();
        break;
      case "saida":
        await this.getOut();
        break;
      default:
        break;
    }
  };

  searchDate = async (e) => {
    if (!e[0] || !e[1]) return;
    await this.setState({
      valueDate: { start: e[0]._d, end: e[1]._d },
    });

    switch (this.state.select) {
      case "estoque":
        await this.getSupProduct();
        break;
      case "entrada":
        await this.getEntrance();
        break;
      case "saida":
        await this.getOut();
        break;
      default:
        break;
    }
  };

  Pages = () => (
    <div className="footer-Gentrada100-button">
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

  onChangeQuant = (value) => {
    this.setState({
      quant: value,
    });
  };

  Search = () => {
    switch (this.state.select) {
      case "estoque":
        return (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-linha1-avancado-Rtecnico">
              <div className="cel-produto-cabecalho-gerEst-search">
                <Input
                  placeholder="Nome do produto"
                  style={{ width: "100%" }}
                  name="produtoSearch nome"
                  value={this.state.produtoSearch.nome}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-quant-cabecalho-gerEst-search">
                {/* <InputNumber
                  placeholder="Quant"
                  value={this.state.quant}
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChangeQuant}
                /> */}
              </div>
              <div className="cel-data-cabecalho-gerEst-search">
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
        );
      case "entrada":
        return (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-linha1-avancado-Rtecnico">
              <div className="cel-data-cabecalho-gerEst-search">
                <DatePicker.RangePicker
                  placeholder="Digite a data"
                  format="DD/MM/YYYY"
                  dropdownClassName="poucas"
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                />
              </div>
              <div className="cel-produtoEnt-cabecalho-gerEst-search">
                <Input
                  placeholder="Nome do produto"
                  style={{ width: "100%" }}
                  name="entradaSearch produto"
                  value={this.state.entradaSearch.produto}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-quant-cabecalho-gerEst-search">
                {/* <InputNumber
                  placeholder="Quant"
                  value={this.state.quant}
                  style={{ width: "100%" }}
                  // value={nomeProdutoSearch}
                  onChange={this.onChangeQuant}
                /> */}
              </div>
              <div className="cel-user-cabecalho-gerEst-search">
                <Input
                  placeholder="Usuário"
                  style={{ width: "100%" }}
                  name="entradaSearch resp"
                  value={this.state.entradaSearch.resp}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
        );
      case "saida":
        return (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-linha1-avancado-Rtecnico">
              <div className="cel-data-cabecalho-gerEst-search">
                <DatePicker.RangePicker
                  placeholder="Digite a data"
                  format="DD/MM/YYYY"
                  dropdownClassName="poucas"
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                />
              </div>
              <div className="cel-produtoSai-cabecalho-gerEst-search">
                <Input
                  placeholder="Nome do produto"
                  style={{ width: "100%" }}
                  name="saidaSearch produto"
                  value={this.state.saidaSearch.produto}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-solicitante-cabecalho-gerEst-search">
                <Input
                  placeholder="Solicitante"
                  style={{ width: "100%" }}
                  name="saidaSearch solicitante"
                  value={this.state.saidaSearch.solicitante}
                  onChange={this.onChange}
                />
              </div>
              <div className="cel-user-cabecalho-gerEst-search">
                <Input
                  placeholder="Usuário"
                  style={{ width: "100%" }}
                  name="saidaSearch resp"
                  value={this.state.saidaSearch.resp}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  onChangeSelect = async (value) => {
    await this.setState({
      select: value,
      loading: true,
      page: 1,
      count: 1,
      show: 1,
      total: 10,
    });

    switch (value) {
      case "estoque":
      case "entrada":
        // await this.getEprestimo();
        break;
      case "saida":
        // await this.getAllEquips();
        break;
      default:
    }

    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <div className="div-card-Gentrada">
        <div className="linhaTexto-Gentrada">
          <h1 className="h1-Gentrada">Gerenciar estoque (SUPRIMENTOS)</h1>
        </div>
        <div className="div-select-emprestimo">
          <Select
            value={this.state.select}
            style={{ width: "20%" }}
            onChange={this.onChangeSelect}
          >
            <Option value="estoque">ESTOQUE</Option>
            <Option value="entrada">ENTRADA</Option>
            <Option value="saida">SAÍDA</Option>
          </Select>
          <Button
            type="primary"
            className="button"
            onClick={async () => {
              await this.setState({
                search: !this.state.search,
                avancado: !this.state.avancado,
              });

              switch (this.state.select) {
                case "estoque":
                case "entrada":
                  // await this.getEprestimo();
                  break;
                case "saida":
                  // await this.getAllEquips();
                  break;
                default:
              }
            }}
          >
            {this.state.avancado ? "Avançado" : "Ocultar"}
          </Button>
        </div>

        {this.state.search && <this.Search />}

        {this.state.select === "estoque" && (
          <div className="div-main-emprestimo">
            <div className="div-cabecalho-estoque">
              <div className="cel-produto-cabecalho-gerEst">Produto</div>
              <div className="cel-quant-cabecalho-gerEst">Quant. total</div>
              <div className="cel-data-cabecalho-gerEst">Data atualização</div>

              <div className="cel-acao-cabecalho-gerCad-reservados" />
            </div>
            <div className=" div-separate-Gentrada" />
            {this.state.loading ? (
              <div className="spin">
                <Spin spinning={this.state.loading} />
              </div>
            ) : null}
            {this.state.products.map((product) => (
              <div className="div-cabecalho-estoque">
                <div className="cel-produto-cabecalho-gerEst">
                  {product.name}
                </div>
                <div className="cel-quant-cabecalho-gerEst">
                  {`${product.amount} ${product.unit}`}
                </div>
                <div className="cel-data-cabecalho-gerEst">
                  {moment(product.updatedAt).format("L")}
                </div>

                <div className="cel-acao-cabecalho-gerCad-reservados" />
              </div>
            ))}
            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
        {this.state.select === "entrada" && (
          <div className="div-main-emprestimo">
            <div className="div-cabecalho-estoque">
              <div className="cel-data-cabecalho-gerEst">Data</div>
              <div className="cel-produto-cabecalho-gerEst">Produto</div>
              <div className="cel-quantEnt-cabecalho-gerEst">Quant</div>
              <div className="cel-data-cabecalho-gerEst">Usuário</div>

              <div className="cel-acao-cabecalho-gerCad-reservados" />
            </div>
            <div className=" div-separate-Gentrada" />
            {this.state.loading ? (
              <div className="spin">
                <Spin spinning={this.state.loading} />
              </div>
            ) : null}
            {this.state.entradas.map((entrada) => (
              <div className="div-cabecalho-estoque">
                <div className="cel-data-cabecalho-gerEst">
                  {moment(entrada.createdAt).format("L")}
                </div>
                <div className="cel-produto-cabecalho-gerEst">
                  {entrada.supProduct.name}
                </div>
                <div className="cel-quantEnt-cabecalho-gerEst">
                  {entrada.amount}
                </div>
                <div className="cel-data-cabecalho-gerEst">
                  {entrada.responsibleUser}
                </div>

                <div className="cel-acao-cabecalho-gerCad-reservados" />
              </div>
            ))}
            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
        {this.state.select === "saida" && (
          <div className="div-main-emprestimo">
            <div className="div-cabecalho-estoque">
              <div className="cel-data-cabecalho-gerEst">Data</div>
              <div className="cel-produtoSai-cabecalho-gerEst">Produto</div>
              <div className="cel-solicitante-cabecalho-gerEst">
                Solicitante
              </div>
              <div className="cel-solicitante-cabecalho-gerEst">
                Usuário liber.
              </div>

              <div className="cel-acao-cabecalho-gerCad-reservados" />
            </div>
            <div className=" div-separate-Gentrada" />
            {this.state.loading ? (
              <div className="spin">
                <Spin spinning={this.state.loading} />
              </div>
            ) : null}
            {this.state.saidas.map((saida) => (
              <div className="div-cabecalho-estoque">
                <div className="cel-data-cabecalho-gerEst">
                  {moment(saida.createdAt).format("L")}
                </div>
                <div className="cel-produtoSai-cabecalho-gerEst">
                  {saida.supProduct.name}
                </div>
                <div className="cel-solicitante-cabecalho-gerEst">
                  {saida.solicitante}
                </div>
                <div className="cel-solicitante-cabecalho-gerEst">
                  {saida.responsibleUser}
                </div>

                <div className="cel-acao-cabecalho-gerCad-reservados" />
              </div>
            ))}
            <div className="footer-ROs">
              <this.Pages />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GerenciarEstoqueSupPage;
