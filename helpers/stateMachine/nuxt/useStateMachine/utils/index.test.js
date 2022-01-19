import { connectContext } from '.'

describe('connectContext', () => {
  describe('target is not defined or empty', () => {
    const mockContext = {}
    const expectResult = {}
    it('object', () => {
      expect(connectContext({}, mockContext)).toEqual(expectResult)
    })
    it('null', () => {
      expect(connectContext(null, mockContext)).toEqual(expectResult)
    })
    it('undefined', () => {
      expect(connectContext(undefined, mockContext)).toEqual(expectResult)
    })
  })

  it('target', () => {
    const target = {
      name: 'hello',
      sayHello() {
        return this.name
      },
    }
    const mockContext = {
      name: 'world',
    }
    const expectResult = 'world'

    expect(connectContext(target, mockContext).sayHello()).toBe(expectResult)
  })
})
