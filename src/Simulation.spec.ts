import Body from './Body'
import Simulation from './Simulation'
import Vector from './Vector'

describe('Simulation', () => {
  it('should call changeCallback', async () => {
    let resolver: (value?: unknown) => void
    const promise = new Promise((resolve) => { resolver = resolve })

    const simulation = new Simulation({
      bodies: [],
      renderInterval: 0,
      changeCallback: () => { resolver() }
    })

    await promise
    simulation.stop()
  })

  it('should move bodies through universe', async () => {
    let resolver: (value?: unknown) => void
    const promise = new Promise((resolve) => { resolver = resolve })

    const startingPositions = [
      new Vector(1, 1, 1),
      new Vector(-1, -1, -1)
    ]

    const simulation = new Simulation({
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
      renderInterval: 0,
      changeCallback: () => { resolver() }
    })

    expect(simulation.bodies).toBe(simulation.universe.bodies)

    await promise
    simulation.stop()

    expect(simulation.bodies[0].position).not.toEqual(startingPositions[0])
    expect(simulation.bodies[1].position).not.toEqual(startingPositions[1])
  })
})
