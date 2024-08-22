import Universe from './Universe'
import Body from './Body'

export default class Simulation {
  bodies: Body[]
  gravity: number
  collisions: boolean
  deltaTime: number
  renderInterval: number

  universe: Universe
  simulationInterval: NodeJS.Timeout
  changeCallback: () => void

  constructor({
    /** orbital bodies in the simulation */
    bodies,
    /** gravitational strength */
    gravity,
    /** should bodies collide? (elastically) */
    collisions,
    /** simulation time elapsed between iterations */
    deltaTime,
    /** computer time between iterations */
    renderInterval,
    /** callback fired when simulation state changes */
    changeCallback
  }: {
    bodies: Body[]
    gravity?: number
    collisions?: boolean
    deltaTime?: number
    renderInterval?: number
    changeCallback: () => void
  }) {
    this.bodies = bodies
    this.gravity = gravity ?? 6.674e-11
    this.collisions = collisions ?? false
    this.deltaTime = deltaTime ?? 0.5
    this.renderInterval = renderInterval ?? 10
    this.changeCallback = changeCallback

    this.universe = new Universe({
      bodies: this.bodies,
      gravity: this.gravity,
      collisions: this.collisions,
      deltaTime: this.deltaTime
    })

    this.start()
  }

  /** start simulation */
  start() {
    clearInterval(this.simulationInterval)
    this.simulationInterval = setInterval(() => {
      this.universe.moveBodiesThroughTime()
      this.changeCallback()
    }, this.renderInterval)
  }

  /** stop simulation */
  stop() {
    clearInterval(this.simulationInterval)
  }
}
