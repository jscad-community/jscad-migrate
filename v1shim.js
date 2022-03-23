const { intersect, subtract, union } = require('@jscad/modeling').booleans
const { colorize, colorNameToRgb } = require('@jscad/modeling').colors
const { cuboid, cylinder, cylinderElliptic, polygon, roundedCuboid, sphere } = require('@jscad/modeling').primitives
const { extrudeLinear } = require('@jscad/modeling').extrusions
const { rotate, translate } = require('@jscad/modeling').transforms
const { degToRad } = require('@jscad/modeling').utils

module.exports = {
  color: (color, obj) => {
    if (typeof color === "string") {
      return colorize(colorNameToRgb(color), obj)
    } else {
      return colorize(color, obj)
    }
  },
  cube: (opt) => {
    if (Number.isFinite(opt.size)) {
      opt.size = [opt.size, opt.size, opt.size]
    }
    if (opt.center === undefined) {
      opt.center = [opt.size[0] / 2, opt.size[1] / 2, opt.size[2] / 2]
    } else if (opt.center === true) {
      delete opt.center
    }
    if (opt.radius) {
      opt.roundRadius = opt.radius
      if (opt.fn) {
        opt.segments = opt.fn
      }
      return roundedCuboid(opt)
    } else {
      return cuboid(opt)
    }
  },
  cylinder: (opt) => {
    const rot = [0, 0, 0]
    const center = [0, 0, 0]
    if (opt.start && opt.end) {
      center[0] = (opt.start[0] + opt.end[0]) / 2
      center[1] = (opt.start[1] + opt.end[1]) / 2
      center[2] = (opt.start[2] + opt.end[2]) / 2
      const dx = opt.end[0] - opt.start[0]
      const dy = opt.end[1] - opt.start[1]
      const dz = opt.end[2] - opt.start[2]
      opt.height = Math.hypot(dx, dy, dz)
      rot[0] = Math.asin(-dy / opt.height)
      rot[1] = Math.atan2(dx / opt.height, dz / opt.height)
    }
    if (opt.fn) {
      opt.segments = opt.fn
    }
    if (opt.r) {
      opt.radius = opt.r
    }
    if (opt.r1 === 0) {
      opt.r1 = 0.01
    }
    if (opt.r2 === 0) {
      opt.r2 = 0.01
    }
    if (opt.r1 && opt.r2) {
      opt.startRadius = [opt.r1, opt.r1]
      opt.endRadius = [opt.r2, opt.r2]
      return translate(center, rotate(rot, cylinderElliptic(opt)))
    } else {
      return translate(center, rotate(rot, cylinder(opt)))
    }
  },
  difference: subtract,
  intersection: intersect,
  linear_extrude: extrudeLinear,
  polygon: (opt) => {
    if (Array.isArray(opt)) {
      return polygon({points: opt})
    } else {
      return polygon(opt)
    }
  },
  rotate: (r, obj) => rotate(r.map(degToRad), obj),
  sphere: (opt) => {
    if (opt.center === undefined) {
      opt.center = [opt.size[0] / 2, opt.size[1] / 2, opt.size[2] / 2]
    } else if (opt.center === true) {
      delete opt.center
    }
    if (opt.r) {
      opt.radius = opt.r
    }
    return sphere(opt)
  },
  translate: translate,
  union: union
}
