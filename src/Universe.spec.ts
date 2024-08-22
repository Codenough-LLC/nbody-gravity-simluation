import Body from './Body'
import Universe from './Universe'
import Vector from './Vector'

describe('Universe', () => {
  it('should call changeCallback', async () => {
    let resolver: (value?: unknown) => void
    const promise = new Promise((resolve) => { resolver = resolve })

    const universe = new Universe({
      bodies: [],
      simulationInterval: 0,
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
      simulationInterval: 0,
      changeCallback: () => { resolver() }
    })

    await promise
    universe.stop()

    expect(universe.bodies[0].position).not.toEqual(startingPositions[0])
    expect(universe.bodies[1].position).not.toEqual(startingPositions[1])
  })
})
