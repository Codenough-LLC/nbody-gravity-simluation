import EventEmitter from 'node:events'
import Universe from './Universe'
import Body from './Body'

export default class Simulation {
  bodies: Body[]
  gravity: number
  collisions: boolean
  deltaTime: number
  renderInterval: number

  universe: Universe
  eventEmitter: EventEmitter
  simulationInterval: NodeJS.Timeout

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
    renderInterval
  }: {
    bodies: Body[]
    gravity?: number
    collisions?: boolean
    deltaTime?: number
    renderInterval?: number
  }) {
    this.bodies = bodies
    this.gravity = gravity ?? 6.674e-11
    this.collisions = collisions ?? false
    this.deltaTime = deltaTime ?? 0.5
    this.renderInterval = renderInterval ?? 10

    this.universe = new Universe({
      bodies: this.bodies,
      gravity: this.gravity,
      collisions: this.collisions,
      deltaTime: this.deltaTime
    })

    this.eventEmitter = new EventEmitter()
    this.simulationInterval = setInterval(() => {
      this.universe.moveBodiesThroughTime()
      this.eventEmitter.emit('deltaTime')
    }, renderInterval)
  }
}
