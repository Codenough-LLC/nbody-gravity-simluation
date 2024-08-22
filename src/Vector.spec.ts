import Vector from "./Vector"

describe('Vector', () => {
  describe('constructor', () => {
    it('should create object with 3d coords', () => {
      expect(new Vector(3.2, -2.1, 1)).toEqual({ x: 3.2, y: -2.1, z: 1 })
    })
  })

  describe('sum', () => {
    it('should add vectors', () => {
      expect(new Vector(2, 4, 6).sum(new Vector(-1, -2, -10))).toEqual(new Vector(1, 2, -4))
    })
  })

  describe('diff', () => {
    it('should subtract vectors', () => {
      expect(new Vector(2, 4, 6).diff(new Vector(-1, -2, -10))).toEqual(new Vector(3, 6, 16))
    })
  })

  describe('dotProduct', () => {
    it('should dot multiply vectors', () => {
      expect(new Vector(2, 4, 6).dotProduct(new Vector(-1, -2, -10))).toEqual(-70)
    })
  })

  describe('product', () => {
    it('should multiply vectors', () => {
      expect(new Vector(2, 4, 6).product(new Vector(-1, -2, -10))).toEqual(new Vector(-2, -8, -60))
    })
  })

  describe('projection', () => {
    it('should return projection of vector in direction', () => {
      expect(new Vector(1, 1, 1).projection(new Vector(1, 0, 0)))
        .toEqual(new Vector(expect.closeTo(1), expect.closeTo(0), expect.closeTo(0)))

      expect(new Vector(1, 1, 1).projection(new Vector(0, 0, -1)))
        .toEqual(new Vector(expect.closeTo(0), expect.closeTo(0), expect.closeTo(1)))

      expect(new Vector(1, 1, 1).projection(new Vector(3, 2, 1)))
        .toEqual(new Vector(expect.closeTo(1.29), expect.closeTo(0.86), expect.closeTo(0.43)))

        expect(new Vector(1, 1, 1).projection(new Vector(-1, -1, -1)))
        .toEqual(new Vector(expect.closeTo(1), expect.closeTo(1), expect.closeTo(1)))
    })
  })

  describe('distance', () => {
    it('should calculate distance between vectors', () => {
      expect(new Vector(2, 4, -6).distance(new Vector(2, 4, -6))).toEqual(0)
      expect(new Vector(2, 4, 6).distance(new Vector(3, 4, 6))).toEqual(1)
      expect(new Vector(2, 4, 6).distance(new Vector(3, 5, 7))).toBeCloseTo(1.73)
    })
  })

  describe('unitDirection', () => {
    it('should get unit direction vector', () => {
      expect(new Vector(2, 4, -6).unitDirection(new Vector(2, 4, -6))).toEqual(new Vector(0, 0, 0))
      expect(new Vector(2, 4, -6).unitDirection(new Vector(1, 2, -3)))
        .toEqual(new Vector(expect.closeTo(-0.27), expect.closeTo(-0.53), expect.closeTo(0.8)))
    })
  })

  describe('getMagnitude', () => {
    it('should get magnitude of vector', () => {
      expect(new Vector(0, 0, 0).getMagnitude()).toEqual(0)
      expect(new Vector(1, 0, 0).getMagnitude()).toEqual(1)
      expect(new Vector(0, 0, -1).getMagnitude()).toEqual(1)
      expect(new Vector(1, 1, -1).getMagnitude()).toBeCloseTo(1.73)
      expect(new Vector(-1, 1000, -1).getMagnitude()).toBeCloseTo(1000)
    })
  })

  describe('scaleBy', () => {
    it('should scale vector by factor', () => {
      expect(new Vector(1, 2, 3).scaleBy(3)).toEqual(new Vector(3, 6, 9))
      expect(new Vector(1, -2, 3).scaleBy(-1)).toEqual(new Vector(-1, 2, -3))
    })
  })

  describe('scaleTo', () => {
    it('should scale vector to factor', () => {
      expect(new Vector(1, 2, 3).scaleTo(3))
        .toEqual(new Vector(expect.closeTo(0.8), expect.closeTo(1.6), expect.closeTo(2.41)))
      expect(() => new Vector(1, -2, 3).scaleTo(-1)).toThrow(new Error('magnitude must be positive'))
    })
  })
})
