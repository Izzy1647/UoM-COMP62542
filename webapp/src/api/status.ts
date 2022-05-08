import fetch from '../utils/fetch'
import { API_PREFIX } from './constants'

/**
 * update student status
 */
export function updateStatus(status: number) {
  return fetch(`${API_PREFIX}/status/update?status=${status}`, {
    method: 'POST'
  })
}

/**
 * get student status
 */
export function getStatus() {
  return fetch(`${API_PREFIX}/status`, {
    method: 'GET'
  })
}
