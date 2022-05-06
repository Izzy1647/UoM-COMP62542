import fetch from '../utils/fetch'
import { API_PREFIX } from './constants'
export interface ISignInParam {
  studentId: string
}

export enum EActivityType {
  Meeting = 'meeting',
  Tutorial = 'tutorial'
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
export function postActivity(
  activityName: string,
  type: EActivityType,
  time: string
) {
  return fetch(
    `${API_PREFIX}/activities?type=${type}&activityName=${activityName}&time=${time}`,
    {
      method: 'POST'
    }
  )
}
