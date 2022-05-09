export interface IUserData {
  id: string
  studentId: string
  name: string
  status: number
  type: string
  email: string
}

/**
 * Singleton pattern applied
 */
export default class UserDataManager {
  static myInstance: UserDataManager

  // init value
  _userData: IUserData = {
    id: '',
    studentId: '',
    name: '',
    status: -1,
    type: '',
    email: ''
  }

  /**
   * @returns {UserDataManager}
   */
  static getInstance() {
    if (!UserDataManager.myInstance) {
      UserDataManager.myInstance = new UserDataManager()
    }

    return this.myInstance
  }

  /**
   * get user data
   * @returns IUserData
   */
  getUserData(): IUserData {
    return this._userData
  }

  /**
   * set user data after login
   * @param data: IUserData
   */
  setUserData(data: IUserData) {
    this._userData = data
  }
}
