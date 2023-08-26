const listHelper = require('../utils/listhelper')

describe('dummy', () => {
    test('dummy returns one', () => {
      const blogs = []
      const result = listHelper.dummy(blogs)
      expect(result).toBe(1)
    })
})