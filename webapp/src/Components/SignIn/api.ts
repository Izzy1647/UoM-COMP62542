import fetch from '../../utils/fetch'
// import { API_PREFIX } from '../constants'

export interface ISignInParam {
  studentId: string
}

/**
 * student signin
 */
export function login(param: ISignInParam) {
  const { studentId } = param
  return fetch(`/login`, {
    method: 'POST',
    body: JSON.stringify({ studentId })
  })
}
