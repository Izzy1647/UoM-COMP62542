import fetch from '../utils/fetch'
import { API_PREFIX } from './constants'

/**
 * get enroll list
 */
export function getEnrollList(type: string, id: string) {
  return fetch(`${API_PREFIX}/admin/optcourses?${type}=${id}`, {
    method: 'GET'
  })
}

/**
 * opt student out from a course
 */
export function optStudentOut(studentId: string, courseId: string) {
  return fetch(
    `${API_PREFIX}/admin/optcourses?studentId=${studentId}&courseId=${courseId}`,
    {
      method: 'DELETE'
    }
  )
}
