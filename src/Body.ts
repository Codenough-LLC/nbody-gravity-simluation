import Vector from './Vector'

export default class Body {
  mass: number
  radius: number
  position: Vector
  velocity: Vector
  acceleration: Vector = new Vector(0, 0, 0)
  externalForces: Vector[] = []
  netExternalForce: Vector = new Vector(0, 0, 0)
  pastPositionsLength: number
  pastPositions: Vector[] = []
  maxVelocity: number | undefined

  constructor({ mass, radius, position, velocity, pastPositionsLength, maxVelocity }: {
    mass?: number
    radius?: number
    position: Vector
    velocity: Vector
    pastPositionsLength?: number
    maxVelocity?: number
  }) {
    if (mass === 0) {
      throw new Error('Mass cannot be 0 for a body!')
    }

    this.mass = mass ?? 1000000
    this.radius = radius ?? 0.04
    this.position = position
    this.pastPositionsLength = pastPositionsLength ?? 200
    this.pastPositions.push(position)
    this.velocity = velocity
    this.maxVelocity = maxVelocity
  }

  setExternalForces(externalForces: Vector[]) {
    this.externalForces = externalForces

    this.netExternalForce = this.externalForces.reduce((total, force) => {
      total.x += force.x
      total.y += force.y
      total.z += force.z

      return total
    }, new Vector(0, 0, 0))

    this.acceleration = this.netExternalForce.scaleBy(1 / this.mass)
  }

  moveBodyThroughTime(deltaTime: number) {
    const deltaVelocity = this.acceleration.scaleBy(deltaTime)
    this.velocity = this.velocity.sum(deltaVelocity)
    if (this.maxVelocity && this.velocity.getMagnitude() > this.maxVelocity) {
      this.velocity = this.velocity.scaleTo(this.maxVelocity)
    }
    const deltaPosition = this.velocity.scaleBy(deltaTime)
    this.position = this.position.sum(deltaPosition)
    if (this.pastPositions.length >= this.pastPositionsLength) {
      this.pastPositions.pop()
    }
    this.pastPositions.unshift(this.position)
  }
}
