import Vector from './Vector'
import Body from './Body'

export default class Universe {
  bodies: Body[]
  gravity: number
  collisions: boolean
  deltaTime: number
  deltaTimeSegments: number
  simulationInterval: number
  changeCallback: (() => void) | undefined
  private internalInterval: NodeJS.Timeout

  /**
   * @param universe definition of the universe
   * @param universe.bodies orbital bodies in the simulation
   * @param universe.gravity gravitational strength
   * @param universe.collisions should bodies collide? (elastically)
   * @param universe.deltaTime simulation time elapsed between iterations
   * @param universe.deltaTimeSegments number of segments in which to split the simlation time delta for more precise calculations
   * @param universe.simulationInterval computer time between iterations
   * @param universe.changeCallback callback fired when simulation state changes
   */
  constructor({
    bodies,
    gravity,
    collisions,
    deltaTime,
    deltaTimeSegments,
    simulationInterval,
    changeCallback
  }: {
    bodies: Body[]
    gravity?: number
    collisions?: boolean
    deltaTime?: number
    deltaTimeSegments?: number,
    simulationInterval?: number
    changeCallback?: () => void
  }) {
    this.bodies = bodies
    this.gravity = gravity ?? 6.674e-11
    this.collisions = collisions ?? false
    this.deltaTime = deltaTime ?? 0.5
    this.deltaTimeSegments = deltaTimeSegments ?? 1
    this.simulationInterval = simulationInterval ?? 10
    this.changeCallback = changeCallback

    if (this.deltaTimeSegments % 1 || this.deltaTimeSegments < 1) {
      throw new Error('deltaTimeSegments must be a positive integer')
    }

    if (this.simulationInterval <= 0) {
      throw new Error('simulationInterval must be positive')
    }

    this.start()
  }

  /** start simulation */
  start() {
    clearInterval(this.internalInterval)
    this.internalInterval = setInterval(() => {
      this.moveBodiesThroughTime()
      this.changeCallback?.()
    }, this.simulationInterval)
  }

  /** stop simulation */
  stop() {
    clearInterval(this.internalInterval)
  }

  private calculateGravitationalForces = () => {
    const bodyForces: Vector[][] = Array.from({ length: this.bodies.length }, () => [])
    this.bodies.forEach((body1, index1) => {
      this.bodies.slice(index1 + 1).forEach((body2, index2) => {
        const gravityBetweenBodies =
          (this.gravity
            * (body1.mass * body2.mass)
            / body1.position.distance(body2.position)) || Infinity

        bodyForces[index1].push(body1.position.unitDirection(body2.position).scaleBy(gravityBetweenBodies))
        bodyForces[index2 + index1 + 1].push(body2.position.unitDirection(body1.position).scaleBy(gravityBetweenBodies))
      })

      body1.setExternalForces(bodyForces[index1])
    })
  }

  private bounceCollisions = (body1: Body, index1: number) => {
    this.bodies.forEach((body2, index2) => {
      if (index1 !== index2) {
        const distanceBetweenBodies = body2.position.distance(body1.position)
        if (distanceBetweenBodies < body1.radius + body2.radius) {
          body2.position = body1.position.sum(body1.position.unitDirection(body2.position).scaleTo((body1.radius + body2.radius)))

          const collisionVelocity1 = body1.velocity.projection(body1.position.unitDirection(body2.position))
          const collisionVelocity2 = body2.velocity.projection(body2.position.unitDirection(body1.position))

          const parallelVelocity1 = body1.velocity.diff(collisionVelocity1)
          const parallelVelocity2 = body2.velocity.diff(collisionVelocity2)

          const preCollisionSpeed1 = collisionVelocity1.getMagnitude()
          const preCollisionSpeed2 = collisionVelocity2.getMagnitude()
          const postCollisionSpeed1 =
            ((body1.mass - body2.mass) / (body1.mass + body2.mass)) * preCollisionSpeed1
            + ((2 * body2.mass) / (body1.mass + body2.mass)) * preCollisionSpeed2
          const postCollisionSpeed2 = -1 * (preCollisionSpeed1 + postCollisionSpeed1 - preCollisionSpeed2)

          body1.velocity = parallelVelocity1.sum(collisionVelocity1.scaleTo(postCollisionSpeed1))
          body2.velocity = parallelVelocity2.sum(collisionVelocity2.scaleTo(postCollisionSpeed2))
        }
      }
    })
  }

  private moveBodiesThroughTime = () => {
    this.calculateGravitationalForces()
    this.bodies.forEach((body, index) => {
      const deltaTimePerSegment = this.deltaTime / this.deltaTimeSegments

      for (let i = 0; i < this.deltaTimeSegments; i++) {
        body.moveBodyThroughTime(deltaTimePerSegment)
        if (this.collisions) this.bounceCollisions(body, index)
      }
    })
  }

  getCenterOfMass = () => {
    const totalMass = this.bodies.reduce((agg, { mass }) => agg + mass, 0)
    return this.bodies.reduce((agg, { mass, position }) => {
      return agg.sum(position.scaleBy((mass / totalMass)))
    }, new Vector(0, 0, 0))
  }
}
