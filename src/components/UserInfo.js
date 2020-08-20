export default class UserInfo {
  constructor({ name, job }) {
    this._profileName = name,
    this._profileJob = job
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    };
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = name,
    this._profileJob.textContent = job
  }
}