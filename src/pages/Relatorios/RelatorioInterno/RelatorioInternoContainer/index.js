import React, { Component } from "react";
import { DatePicker, Button, Input, Select, Spin } from "antd";
import { getTecnico } from "../../../../services/tecnico";
import { getTodasOsInterno } from "../../../../services/reservaOs";
import moment from "moment";

const { Option } = Select;

class RelatorioInterno extends Component {
  state = {
    avancado: false,
    os: "",
    rs: "",
    data: "",
    tecnico: "",
    tecnicoArray: [],
    valueDate: { start: "2019/01/01" },
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    mais: {},
    OsArray: {
      rows: [],
    },
  };

  getAllOs = async () => {
    this.setState({
      loading: true,
    });

    const query = {
      filters: {
        technicianReserve: {
          specific: {
            razaoSocial: this.state.rs,
            date: this.state.valueDate,
          },
        },
        technician: {
          specific: {
            name: this.state.tecnico,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    };

    await getTodasOsInterno(query).then((resposta) =>
      this.setState({
        OsArray: resposta.data,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
      })
    );

    this.setState({
      loading: false,
    });
  };

  changePages = (pages) => {
    this.setState(
      {
        page: pages,
      },
      () => {
        this.getAllOs();
      }
    );
  };

  getAllTecnico = async () => {
    await getTecnico().then((resposta) =>
      this.setState({
        tecnicoArray: resposta.data,
      })
    );
  };

  onChangeTecnico = async (value) => {
    await this.setState({
      tecnico: value,
    });

    await this.getAllOs();
  };

  componentDidMount = async () => {
    await this.getAllOs();

    await this.getAllTecnico();
  };

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado,
    });
  };

  onChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });

    await this.getAllOs();
  };

  searchDate = async (e) => {
    if (!e[0] || !e[1]) return;
    await this.setState({
      valueDate: { start: e[0]._d, end: e[1]._d },
    });

    await this.getAllOs();
  };

  formatDateFunct = (date) => {
    moment.locale("pt-br");
    const formatDate = moment(date).format("L");
    const formatHours = moment(date).format("LT");
    const dateformated = `${formatDate} ${formatHours}`;
    return dateformated;
  };

  mais = async (line) => {
    await this.setState({
      mais: {
        [line.id]: !this.state.mais[line.id],
      },
      lineSelected: {
        rows: [line],
      },
    });
  };

  test = () => {
    if (this.state.OsArray.rows.length !== 0) {
      return this.state.OsArray.rows.map((line) => (
        <div className="div-100-Gentrada">
          <div className="div-lines-ROs">
            <div className="cel-mais-cabecalho-ROs">
              <div className="button-mais" onClick={() => this.mais(line)}>
                +
              </div>
            </div>
            <div className="cel-rs-cabecalho-RInt">{line.razaoSocial}</div>
            <div className="cel-tecnico-cabecalho-ROs">{line.technician}</div>
            <div className="cel-data-cabecalho-ROs">{line.formatedDate}</div>
          </div>
          {this.state.mais[line.id] ? (
            <div className="div-100-Rtecnico">
              <div className="div-mais-ROs">
                <div className="div-normal-mais-ROs">
                  <div className="div-produtos-mais-ROs">Produtos</div>
                  <div className="div-output-mais-ROs">Saída</div>
                </div>
              </div>
              {this.state.loading ? (
                <div className="spin">
                  <Spin spinning={this.state.loading} />
                </div>
              ) : (
                this.state.lineSelected.rows.map((line) => (
                  <div className="div-mais-ROs">
                    <div className="div-branco-mais">
                      <div className="div-produtos-mais-ROs">
                        {line.products.map((valor) => (
                          <div className="div-peca">{valor.name}</div>
                        ))}
                      </div>

                      <div className="div-amount-mais-ROs">
                        {line.products.map((valor) => (
                          <div className="div-peca">{valor.amount}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : null}
          <div className=" div-separate1-Gentrada" />
        </div>
      ));
    } else {
      return (
        <div className="div-naotemnada">Não há nenhuma reserva finalizada</div>
      );
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

  render() {
    return (
      <div className="div-card-ROs">
        <div className="linhaTexto-ROs">
          <h1 className="h1-ROs">Relatório técnicos internos</h1>
        </div>

        {this.state.avancado ? (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-ocultar-Rtecnico">
              <Button type="primary" className="button" onClick={this.avancado}>
                Ocultar
              </Button>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-rs-RInt">
                <div className="div-textRs-Os">Razão social:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
                  name="rs"
                  value={this.state.rs}
                  placeholder="Digite o razão social"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
            </div>

            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-data-ROs">
                <div className="div-text-Rtecnico">Data:</div>
                <DatePicker.RangePicker
                  placeholder="Digite a data"
                  format="DD/MM/YYYY"
                  dropdownClassName="poucas"
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                />
              </div>

              <div className="div-tecnico-ROs">
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
                    <Option value="">TODOS</Option>
                    {this.state.tecnicoArray.map((valor) => (
                      <Option value={valor.name}>{valor.name}</Option>
                    ))}
                  </Select>
                )}
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

        <div className="div-cabecalho-ROs">
          <div className="cel-mais-cabecalho-ROs"></div>
          <div className="cel-rs-cabecalho-RInt">Razão social</div>
          <div className="cel-tecnico-cabecalho-ROs">Técnico</div>
          <div className="cel-data-cabecalho-ROs">Data atendimento</div>
        </div>

        <div className=" div-separate-ROs" />
        {this.state.loading ? (
          <div className="spin">
            <Spin spinning={this.state.loading} />
          </div>
        ) : (
          this.test()
        )}

        <div className="footer-ROs">
          <this.Pages />
        </div>
      </div>
    );
  }
}

export default RelatorioInterno;
