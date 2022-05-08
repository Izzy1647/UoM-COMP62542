import fetch from '../utils/fetch'
import { API_PREFIX } from './constants'

/**
 * get all optcourses
 */
export function getOptCourses() {
  return fetch(`${API_PREFIX}/optcourses`, {
    method: 'GET'
  })
}

/**
 * enroll in a course
 */
export function enroll(courseId: string) {
  return fetch(`${API_PREFIX}/optcourses?courseId=${courseId}`, {
    method: 'POST'
  })
}

/**
 * optout a course
 */
 export function optout(courseId: string) {
  return fetch(`${API_PREFIX}/optcourses?courseId=${courseId}`, {
    method: 'DELETE'
  })
}
