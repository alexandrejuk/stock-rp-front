import React, { Component } from "react";
import { Input, Select, Card, Checkbox, Switch, Button, message } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import {
  getTypeAccount,
  getResourcesByTypeAccount,
  updateUsuario,
} from "../../../../services/usuario";

const { Option } = Select;

class GerenciarUsuario extends Component {
  state = {
    redirect: false,
    user: this.props.usuarioUpdateValue.username,
    checkboxAble: this.props.usuarioUpdateValue.customized,
    permission: {
      addUser: this.props.usuarioUpdateValue.resource.addUser,
      addTypeAccount: this.props.usuarioUpdateValue.resource.addTypeAccount,
      responsibleUser: "modrp",
      addTec: this.props.usuarioUpdateValue.resource.addTec,
      addCar: this.props.usuarioUpdateValue.resource.addCar,
      addMark: this.props.usuarioUpdateValue.resource.addMark,
      addType: this.props.usuarioUpdateValue.resource.addType,
      addProd: this.props.usuarioUpdateValue.resource.addProd,
      addFonr: this.props.usuarioUpdateValue.resource.addFonr,
      addEntr: this.props.usuarioUpdateValue.resource.addEntr,
      addKit: this.props.usuarioUpdateValue.resource.addKit,
      addKitOut: this.props.usuarioUpdateValue.resource.addKitOut,
      addOutPut: this.props.usuarioUpdateValue.resource.addOutPut,
      addROs: this.props.usuarioUpdateValue.resource.addROs,
      addRML: this.props.usuarioUpdateValue.resource.addRML,
      gerROs: this.props.usuarioUpdateValue.resource.gerROs,
      delROs: this.props.usuarioUpdateValue.resource.delROs,
      updateRos: this.props.usuarioUpdateValue.resource.updateRos,
      tecnico: this.props.usuarioUpdateValue.resource.tecnico,
      suprimento: this.props.usuarioUpdateValue.resource.suprimento,
    },
    typeAccountArray: [],
    typeName: this.props.usuarioUpdateValue.typeName,
  };

  redirectGerenciarCadastros = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect push to="/logged/gerenciarProduto/dash" />;
    }
  };

  success = () => {
    message.success("Novo usuário cadastrado");
  };

  error = () => {
    message.error("Usuário não cadastrado");
  };

  getAllTypeAccount = async () => {
    const query = {
      filters: {
        typeAccount: {
          specific: {
            stock: true,
          },
        },
      },
    };

    await getTypeAccount(query).then((resposta) =>
      this.setState({
        typeAccountArray: resposta.data.rows,
      })
    );
  };

  componentDidMount = async () => {
    await this.getAllTypeAccount();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangePermission = (e) => {
    this.setState({
      permission: {
        ...this.state.permission,
        [e.target.name]: e.target.checked,
      },
    });
  };

  onChangeAble = async () => {
    await this.setState({
      checkboxAble: !this.state.checkboxAble,
    });

    if (!this.state.checkboxAble) {
      await this.handleChange(this.state.typeName);
    }
  };

  handleChange = async (value) => {
    await this.setState({
      typeName: value,
      checkboxAble: false,
    });

    const query = {
      filters: {
        typeAccount: {
          specific: {
            typeName: value,
          },
        },
      },
    };

    await getResourcesByTypeAccount(query).then((resposta) =>
      this.setState({
        permission: {
          addUser: resposta.data.addUser,
          addAccessories: resposta.data.addAccessories,
          addTypeAccount: resposta.data.addTypeAccount,
          addTec: resposta.data.addTec,
          addCar: resposta.data.addCar,
          addMark: resposta.data.addMark,
          addType: resposta.data.addType,
          addProd: resposta.data.addProd,
          addFonr: resposta.data.addFonr,
          addEntr: resposta.data.addEntr,
          addKit: resposta.data.addKit,
          addKitOut: resposta.data.addKitOut,
          addOutPut: resposta.data.addOutPut,
          addROs: resposta.data.addROs,
          addRML: resposta.data.addRML,
          gerROs: resposta.data.gerROs,
          delROs: resposta.data.delROs,
          updateRos: resposta.data.updateRos,
          tecnico: resposta.data.tecnico,
          addAnalyze: resposta.data.addAnalyze,
          addCompany: resposta.data.addCompany,
          addEntry: resposta.data.addEntry,
          addEquip: resposta.data.addEquip,
          addEquipType: resposta.data.addEquipType,
          addPart: resposta.data.addPart,
          suprimento: resposta.data.suprimento,
        },
      })
    );
  };

  saveTargetUpdateUser = async () => {
    this.setState({
      loading: true,
    });

    const values = {
      id: this.props.usuarioUpdateValue.id,
      username: this.state.user,
      typeName: this.state.typeName,
      customized: this.state.checkboxAble,
      addUser: this.state.permission.addUser,
      addTypeAccount: this.state.permission.addTypeAccount,
      responsibleUser: "modrp",
      addTec: this.state.permission.addTec,
      addCar: this.state.permission.addCar,
      addMark: this.state.permission.addMark,
      addType: this.state.permission.addType,
      addProd: this.state.permission.addProd,
      addFonr: this.state.permission.addFonr,
      addEntr: this.state.permission.addEntr,
      addKit: this.state.permission.addKit,
      addKitOut: this.state.permission.addKitOut,
      addOutPut: this.state.permission.addOutPut,
      addROs: this.state.permission.addROs,
      addRML: this.state.permission.addRML,
      gerROs: this.state.permission.gerROs,
      delROs: this.state.permission.delROs,
      updateRos: this.state.permission.updateRos,
      tecnico: this.state.permission.tecnico,
      addAnalyze: this.state.permission.addAnalyze,
      addCompany: this.state.permission.addCompany,
      addEntry: this.state.permission.addEntry,
      addEquip: this.state.permission.addEquip,
      addEquipType: this.state.permission.addEquipType,
      addPart: this.state.permission.addPart,
      addAccessories: this.state.permission.addAccessories,
      suprimento: this.state.permission.suprimento,
    };

    const resposta = await updateUsuario(values);

    if (resposta.status === 422) {
      this.setState({
        messageError: true,
      });
      await this.error();
      this.setState({
        loading: false,
        messageError: false,
      });
    }
    if (resposta.status === 200) {
      await this.success();
      this.setState({
        loading: false,
        messageSuccess: false,
      });
    }
  };

  render() {
    return (
      <div className="div-card-usuario">
        <div className="linhaTexto-GOs">
          <div className="div-nome-40">
            <div>
              <ArrowLeftOutlined
                onClick={() => this.redirectGerenciarCadastros()}
              />
            </div>
            {this.renderRedirect()}
          </div>
          <div className="div-nome-60">
            <h1 className="h1-Os">Atualizar usuário</h1>
          </div>
        </div>

        <div className="linha-usuario">
          <div className="div-usuario-usuario">
            <div className="div-text-usuario">Usuário:</div>
            <Input
              readOnly
              className="input-100"
              placeholder="Digite o nome do usuário"
              name="user"
              value={this.state.user}
              onChange={this.onChange}
            />
          </div>

          <div className="div-tipo-usuario">
            <div className="div-textTipo-usuario">Tipo de conta:</div>
            {this.state.typeAccountArray.length !== 0 ? (
              <Select
                value={this.state.typeName}
                style={{ width: "100%" }}
                onChange={this.handleChange}
              >
                {this.state.typeAccountArray.map((valor) => (
                  <Option value={valor.typeName}>{valor.typeName}</Option>
                ))}
              </Select>
            ) : (
              <Select value="Nenhum tipo de conta cadastrado"></Select>
            )}
          </div>
        </div>

        <div className="linha-usuario">
          <div className="div-able-usuario">
            <div className="div-textAble-usuario">Habilitar customização: </div>
            <Switch
              checked={this.state.checkboxAble}
              onChange={this.onChangeAble}
            />
          </div>
        </div>

        <div className="linha1-usuario">
          <div className="div-cardInfo-usuario">
            <Card className="card-usuario">
              {this.state.checkboxAble === false ? (
                <div className="div-flex-usuario">
                  <div className="checkbox-card-tipo">
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addUser}
                      name="addUser"
                      disabled
                    >
                      Adicionar usuário
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addTypeAccount}
                      name="addTypeAccount"
                      disabled
                    >
                      Adicionar tipo de conta
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addTec}
                      name="addTec"
                      disabled
                    >
                      Adicionar técnico
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addCar}
                      name="addCar"
                      disabled
                    >
                      Adicionar carro
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addMark}
                      name="addMark"
                      disabled
                    >
                      Adicionar marca do carro
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addType}
                      name="addType"
                      disabled
                    >
                      Adicionar tipo de equipamento
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addProd}
                      name="addProd"
                      disabled
                    >
                      Adicionar produto
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addFonr}
                      name="addFonr"
                      disabled
                    >
                      Adicionar fornecedor
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addEntr}
                      name="addEntr"
                      disabled
                    >
                      Adicionar entrada
                    </Checkbox>
                  </div>
                  <div className="checkbox-card-tipo" disabled>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addKit}
                      name="addKit"
                      disabled
                    >
                      Gerenciar kit do técnico
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addKitOut}
                      name="addKitOut"
                      disabled
                    >
                      Baixa no kit do técnico
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addOutPut}
                      name="addOutPut"
                      disabled
                    >
                      Baixa na Os
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addROs}
                      name="addROs"
                      disabled
                    >
                      Adicionar reserva por Os
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addRML}
                      name="addRML"
                      disabled
                    >
                      Adicionar reserva por mercado livre
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.gerROs}
                      name="gerROs"
                      disabled
                    >
                      Gerenciar reserva Os
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.delROs}
                      name="delROs"
                      disabled
                    >
                      Deletar reserva por Os
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.updateRos}
                      name="updateRos"
                      disabled
                    >
                      Atualizar reserva por Os
                    </Checkbox>
                  </div>
                </div>
              ) : (
                <div className="div-flex-usuario">
                  <div className="checkbox-card-tipo">
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.suprimento}
                      name="suprimento"
                    >
                      Página de suprimentos
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addUser}
                      name="addUser"
                    >
                      Adicionar usuário
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addTypeAccount}
                      name="addTypeAccount"
                    >
                      Adicionar tipo de conta
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addTec}
                      name="addTec"
                    >
                      Adicionar técnico
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addCar}
                      name="addCar"
                    >
                      Adicionar carro
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addMark}
                      name="addMark"
                    >
                      Adicionar marca do carro
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addType}
                      name="addType"
                    >
                      Adicionar tipo de equipamento
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addProd}
                      name="addProd"
                    >
                      Adicionar produto
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addFonr}
                      name="addFonr"
                    >
                      Adicionar fornecedor
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addEntr}
                      name="addEntr"
                    >
                      Adicionar entrada
                    </Checkbox>
                  </div>
                  <div className="checkbox-card-tipo">
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addKit}
                      name="addKit"
                    >
                      Gerenciar kit do técnico
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addKitOut}
                      name="addKitOut"
                    >
                      Baixa no kit do técnico
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addOutPut}
                      name="addOutPut"
                    >
                      Baixa na Os
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addROs}
                      name="addROs"
                    >
                      Adicionar reserva por Os
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.addRML}
                      name="addRML"
                    >
                      Adicionar reserva por mercado livre
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.gerROs}
                      name="gerROs"
                    >
                      Gerenciar reserva Os
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.delROs}
                      name="delROs"
                    >
                      Deletar reserva por Os
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangePermission}
                      checked={this.state.permission.updateRos}
                      name="updateRos"
                    >
                      Atualizar reserva por Os
                    </Checkbox>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        {this.state.user !== "" ? (
          <div className="div-button-tipo">
            <Button
              type="primary"
              className="button"
              onClick={this.saveTargetUpdateUser}
              loading={this.state.loading}
            >
              Atualizar
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    usuarioUpdateValue: state.usuarioUpdateValue,
  };
}

export default connect(mapStateToProps)(GerenciarUsuario);
