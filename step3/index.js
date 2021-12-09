// title      : OpenJSCAD.org Logo
// author     : Rene K. Mueller
// license    : MIT License
// revision   : 0.003
// tags       : Logo,Intersection,Sphere,Cube
// file       : logo.jscad

const jscad = require('@jscad/modeling')
const { intersect, subtract, union } = jscad.booleans
const { cuboid, sphere } = jscad.primitives

function main() {
   return union(
      subtract(
         cuboid({size: [3, 3, 3]}),
         sphere({radius: 2})
      ),
      intersect(
          sphere({radius: 1.3}),
          cuboid({size: [2.1, 2.1, 2.1]})
      )
   )
}

module.exports = { main }
