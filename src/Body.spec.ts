import Body from "./Body"
import Vector from "./Vector"

describe('Body', () => {
  describe('setExternalForces', () => {
    it('should get net force and set acceleration', () => {
      const body = new Body({
        position: new Vector(0, 0, 0),
        velocity: new Vector(1, 2, -3),
        mass: 10
      })

      body.setExternalForces([
        new Vector(1, 1, 1),
        new Vector(1, -1, 0)
      ])

      expect(body.acceleration).toEqual(new Vector(0.2, 0, 0.1))
    })
  })

  describe('moveBodyThroughTime', () => {
    it('should move body through delta time', () => {
      const body = new Body({
        position: new Vector(0, 0, 0),
        velocity: new Vector(1, 2, -3),
        mass: 1
      })
      body.setExternalForces([new Vector(1, 2, 3)])

      expect(body.position).toEqual(new Vector(0, 0, 0))
      body.moveBodyThroughTime(2)
      expect(body.position).toEqual(new Vector(6, 12, 6))
      body.moveBodyThroughTime(1)
      expect(body.position).toEqual(new Vector(10, 20, 12))
      body.moveBodyThroughTime(1)
      expect(body.position).toEqual(new Vector(15, 30, 21))
    })
  })
})
