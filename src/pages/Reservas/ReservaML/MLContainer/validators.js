import * as cnpjLib from "@fnando/cnpj";
import * as cpfLib from "@fnando/cpf";

export const masks = (nome, valor) => {
  
  if (nome === 'cpfOuCnpj') {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 14)

    if (value.length === 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    else if (value.length === 14) {
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    }

    return {
      nome,
      valor: value,
    }
  } else if (nome === 'telefone') {
      let value = valor
      value = value.replace(/\D/ig, '')
      value = value.slice(0, 11)


      if (value.length > 2 && value.length <= 6) {
        value = value.replace(/(\d{2})(\d{4})?/, '($1) $2')
      }
      if (value.length > 6 && value.length < 11) {
        value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3')
      }
      if (value.length === 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3')
      }

      return {
        nome,
        valor: value,
      }
    }else if (nome === 'codigo'){
      let value = valor
      value = value.replace(/\W/ig, '')
      value = value.slice(0, 13)


      return {
        nome,
        valor: value,
      }
    }else if (nome === 'cep'){
      let value = valor
      value = value.replace(/\D/ig, '')
      value = value.slice(0, 8)


      if (value.length > 5) {
        value = value.replace(/(\d{5})(\d{3})?/, '$1-$2')
      }

      return {
        nome,
        valor: value,
      }
    } else if (nome === 'estado') {
        let value = valor
        value = value.replace(/\W|\d/g, '')
        value = value.slice(0, 2)
        value = value.toUpperCase(0, 2)
  
        return {
          nome,
          valor: value,
        }
      } else if (nome === 'numero') {
      let value = valor
      value = value.replace(/\D/ig, '')

      return {
        nome,
        valor: value,
      } 
    } else {
      return {
        nome,
        valor,
      }
    }
}

export const validators = (nome, valor, state) => {
  const { fieldFalha, message } = state
  
  if (nome === 'cpfOuCnpj') {
    if (!cnpjLib.isValid(valor) && !cpfLib.isValid(valor)) {
      if (valor.length === 14) message.cpfOuCnpj = 'Cpf inválido.'
      else if (valor.length === 18) message.cpfOuCnpj = 'Cnpj inválido.'
      else message.cpfOuCnpj = 'Número incompleto.'
      fieldFalha.cpfOuCnpj = true
  
    } else {
      fieldFalha.cpfOuCnpj = false
      message.cpfOuCnpj = ''
    }
  
    return {
      fieldFalha,
      message
    }
  }else if (nome === 'codigo') {
    if (valor === '') {
      message.codigo = 'É obrigatório.'
      fieldFalha.codigo = true
    } else fieldFalha.codigo = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'razaoSocial') {
    if (valor === '') {
      message.razaoSocial = 'É obrigatório.'
      fieldFalha.razaoSocial = true
    } else fieldFalha.razaoSocial = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'estado') {
    if (valor === '') {
      message.estado = 'É obrigatório.'
      fieldFalha.estado = true
    } else fieldFalha.estado = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'cidade') {
    if (valor === '') {
      message.cidade = 'É obrigatório.'
      fieldFalha.cidade = true
    } else fieldFalha.cidade = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'bairro') {
    if (valor === '') {
      message.bairro = 'É obrigatório.'
      fieldFalha.bairro = true
    } else fieldFalha.bairro = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'rua') {
    if (valor === '') {
      message.rua = 'É obrigatório.'
      fieldFalha.rua = true
    } else fieldFalha.rua = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'numero') {
    if (valor === '') {
      message.numero = 'É obrigatório.'
      fieldFalha.numero = true
    } else fieldFalha.numero = false

    return {
      fieldFalha,
      message
    }
  } else {
    return {
      fieldFalha,
      message
    }
  }
}
