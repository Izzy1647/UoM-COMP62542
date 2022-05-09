/**
 * The Abstract Class defines a template method that contains a skeleton of some
 * algorithm, composed of calls to (usually) abstract primitive operations.
 *
 * Concrete subclasses should implement these operations, but leave the template
 * method itself intact.
 */

import { API_PREFIX } from '../api/constants'
import fetch from '../utils/fetch'

// RequestTemplateAbstract
export abstract class RequestTemplateAbstractClass {
  url: string
  method: string
  params: any
  requestRes: any

  setRequestRes(res: any) {
    this.requestRes = res
  }

  constructor(url: string, method: string, params: any) {
    this.url = url
    this.method = method
    this.params = params
  }
  /**
   * The template method defines the skeleton of an algorithm.
   */
  public templateMethod(): void {
    this.initCheck()
    this.sendRequest(this.url, this.method, this.params)
    this.loadData()
    this.postRequestOperates()
  }

  /**
   * These operations already have implementations.
   */
  protected initCheck(): void {
    const internetConnection = navigator.onLine
    console.log('internetConnection:', internetConnection)
  }

  protected sendRequest(method: string, url: string, params?: any): void {
    fetch(`${API_PREFIX}/${url}`, {
      method: `${method}`
    }).then(res => {
      this.setRequestRes(res)
    })
  }

  /**
   * These operations have to be implemented in subclasses.
   */
  protected abstract loadData(): void

  protected abstract postRequestOperates(): void
}

/**
 * Concrete classes have to implement all abstract operations of the base class.
 * They can also override some operations with a default implementation.
 */
export class customRequest extends RequestTemplateAbstractClass {
  protected loadData(): void {
    const data = this.requestRes
    localStorage.set('res', data)
  }

  protected postRequestOperates(): void {
    // console.log('post request operations here')
  }
}

/**
 * The client code calls the template method to execute the algorithm. Client
 * code does not have to know the concrete class of an object it works with, as
 * long as it works with objects through the interface of their base class.
 */
export function clientCode(
  requestTemplateAbstractClass: RequestTemplateAbstractClass
) {
  requestTemplateAbstractClass.templateMethod()
}

// clientCode(new customRequest('/longin', 'post', {}))
