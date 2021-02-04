import { combineReducers } from "redux";

import { login, auth } from "../pages/Login/LoginRedux/reduce";
import { osUpdateValue } from "../pages/Gerenciar/Os/OsRedux/reduce";
import {
  produtoUpdateValue,
  fornecedorUpdateValue,
  usuarioUpdateValue,
  tecnicoUpdateValue
} from "../pages/Gerenciar/Produto/ProdutoRedux/reduce";
import { providerUpdateValue } from "../pages/Suprimentos/Edit.Fornecedor/Redux/reduce";

const appReducer = combineReducers({
  login,
  auth,
  osUpdateValue,
  produtoUpdateValue,
  fornecedorUpdateValue,
  usuarioUpdateValue,
  tecnicoUpdateValue,
  providerUpdateValue
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_AUTH") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
