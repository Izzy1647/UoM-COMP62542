import fetch from "../utils/fetch"
import { API_PREFIX } from "./constants"
export interface ISignInParam {
  studentId: string
}

/**
 * student signin
 */
export function login(param: FormData) {
  return fetch(`${API_PREFIX}/login`, {
    method: 'POST',
    body: param
  })
}
