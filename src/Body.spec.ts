import Body from "./Body"
import Vector from "./Vector"

describe('Body', () => {
  describe('moveBodyThroughTime', () => {
    it('should move body through delta time', () => {
      const body = new Body({
        position: new Vector(0, 0, 0),
        velocity: new Vector(1, 2, -3)
      })

      body.moveBodyThroughTime(1)

      expect(body.velocity).toEqual(new Vector(1, 2, -3))
    })
  })
})
