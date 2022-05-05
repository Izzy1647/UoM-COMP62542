import fetch from '../utils/fetch'
import { API_PREFIX } from './constants'
export interface ISignInParam {
  studentId: string
}

/**
 * get all activities to display in calendar
 */
export function getActivities() {
  return fetch(`${API_PREFIX}/activities`, {
    method: 'GET'
  })
}

/**
 * add a new activity
 */
export function addActivity(param: FormData) {
  return fetch(`${API_PREFIX}/activities`, {
    method: 'POST',
    body: param
  })
}
