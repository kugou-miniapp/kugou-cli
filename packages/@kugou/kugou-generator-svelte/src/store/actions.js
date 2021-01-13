const REQUEST_USER = Symbol('REQUEST_USER')
const RECEIVE_USER = Symbol('RECEIVE_USER')

const requestUser = () => ({
  type: REQUEST_USER
})

const receiveUser = data => ({
  type: RECEIVE_USER,
  user: data
})

export {
  REQUEST_USER,
  RECEIVE_USER,
  requestUser,
  receiveUser
}
