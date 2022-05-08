import fetch from '../utils/fetch'
import { API_PREFIX } from './constants'

/**
 * get newsletter list
 */
export function getNewsletters() {
  return fetch(`${API_PREFIX}/subscribe`, {
    method: 'GET'
  })
}

/**
 * subscribe a newsletter
 */
export function subscribe(newsletterId: string) {
  return fetch(`${API_PREFIX}/subscribe?newsletterId=${newsletterId}`, {
    method: 'POST'
  })
}
