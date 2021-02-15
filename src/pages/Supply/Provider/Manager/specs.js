import { applySpec, pathOr, pipe } from 'ramda'
import moment from 'moment'

export const buildDataSource = applySpec({
    cnpj: pathOr('', ['cnpj']),
    createdAt: pipe(pathOr('', ['createdAt']), (date) => moment(date).format('L')),
    key: pathOr('', ['id']),
    id: pathOr('', ['id']),
    razaoSocial: pathOr('', ['razaoSocial']),
})
