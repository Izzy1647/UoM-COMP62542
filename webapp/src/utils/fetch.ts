import { extend, get } from 'lodash'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
export interface IExtraOptions {
  includeCredentials?: boolean
  disableParseJSON?: boolean
  type?: EFetchType
}

export enum EFetchType {
  Text = 'text',
  Blob = 'blob'
}

export function getFetchHeaders() {
  const token = cookies.get('token')
  return {
    // 'content-type': 'application/json',
    Authorization: token ? token : '',
    'X-Csrf-Token': localStorage.getItem('X-Csrf-Token') || ''
  }
}

function internalfetch(
  input: RequestInfo,
  init?: RequestInit,
  extraOptions?: IExtraOptions
): Promise<any> {
  const options = extend(
    {
      includeCredentials: true
    },
    extraOptions
  )

  if (options.includeCredentials) {
    init = extend(
      {
        credentials: 'include',
        headers: getFetchHeaders()
      },
      init
    )
  }

  const type = get(extraOptions, 'type')

  return window.fetch(input, init).then(
    async response => {
      try {
        const result =
          type === EFetchType.Blob
            ? await response.blob()
            : await response.text()
        try {
          if (
            (options.disableParseJSON || type === EFetchType.Blob) &&
            response.ok
          ) {
            return result
          }

          const res = JSON.parse(result as string)
          // if (response.status === 401 && res.Code === 'AccessDenied') {
          //   tokenService.clearToken()
          //   const query = routerStore.query
          //   if (query.otp) {
          //     routerStore.push(formatURL('/404', query))
          //   } else {
          //     gotoSignWithUrl()
          //   }
          // }

          return response.ok
            ? res
            : Promise.reject({ ...res, status: response.status })
        } catch (error) {
          return Promise.reject('Server error, try later')
        }
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    },
    error => {
      if (error.message === 'Failed to fetch') {
        return Promise.reject('Check internet connection')
      }
      return Promise.reject(error.message)
    }
  )
}

export default function fetch(
  url: string,
  options?: RequestInit,
  extraOptions?: IExtraOptions
) {
  return internalfetch(url, options, extraOptions)
}
