import fetch from '../utils/fetch'
import { API_PREFIX } from './constants'

/**
 * update student status
 */
export function updateStatus(status: number) {
  return fetch(`${API_PREFIX}/status/update?stauts=${status}`, {
    method: 'POST'
  })
}
