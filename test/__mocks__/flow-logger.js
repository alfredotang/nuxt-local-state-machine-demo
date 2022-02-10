export default (list, name, callbacks = []) => {
  const log = function () {
    list.push([name, ...arguments])
  }
  const mock = jest.fn(log)

  callbacks.forEach(callback => {
    mock.mockImplementationOnce(function () {
      log(...arguments)
      return callback()
    })
  })

  return mock
}
