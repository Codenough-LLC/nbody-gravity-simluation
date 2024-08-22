import Body from './Body'
import Universe from './Universe'
import Vector from './Vector'

describe('Universe', () => {
  describe('parameter validation', () => {
    it('should throw error if deltaTimeSegments is not a positive integer', () => {
      expect(() => new Universe({
        bodies: [],
        deltaTimeSegments: 0,
        changeCallback: () => {}
      })).toThrow('deltaTimeSegments must be a positive integer')

      expect(() => new Universe({
        bodies: [],
        deltaTimeSegments: -1,
        changeCallback: () => {}
      })).toThrow('deltaTimeSegments must be a positive integer')

      expect(() => new Universe({
        bodies: [],
        deltaTimeSegments: 1.1,
        changeCallback: () => {}
      })).toThrow('deltaTimeSegments must be a positive integer')
    })

    it('should throw error if simulationInterval is not positive', () => {
      expect(() => new Universe({
        bodies: [],
        simulationInterval: 0,
        changeCallback: () => {}
      })).toThrow('simulationInterval must be positive')

      expect(() => new Universe({
        bodies: [],
        simulationInterval: -1,
        changeCallback: () => {}
      })).toThrow('simulationInterval must be positive')
    })
  })

  it('should call changeCallback', async () => {
    let resolver: (value?: unknown) => void
    const promise = new Promise((resolve) => { resolver = resolve })

    const universe = new Universe({
      bodies: [],
      simulationInterval: 1,
      changeCallback: () => { resolver() }
    })

    await promise
    universe.stop()
  })

  it('should move bodies through delta time', async () => {
    let resolver: (value?: unknown) => void
    const promise = new Promise((resolve) => { resolver = resolve })

    const startingPositions = [
      new Vector(1, 1, 1),
      new Vector(-1, -1, -1)
    ]

    const universe = new Universe({
      bodies: [
        new Body({
          position: startingPositions[0],
          velocity: new Vector(0, 0, 0)
        }),
        new Body({
          position: startingPositions[1],
          velocity: new Vector(0, 0, 0)
        })
      ],
      simulationInterval: 1,
      changeCallback: () => { resolver() }
    })

    await promise
    universe.stop()

    expect(universe.bodies[0].position).not.toEqual(startingPositions[0])
    expect(universe.bodies[1].position).not.toEqual(startingPositions[1])
  })
})
