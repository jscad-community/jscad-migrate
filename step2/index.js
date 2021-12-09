// title      : OpenJSCAD.org Logo
// author     : Rene K. Mueller
// license    : MIT License
// revision   : 0.003
// tags       : Logo,Intersection,Sphere,Cube
// file       : logo.jscad

const { difference, intersection, union } = require("./v1shim")
const { cube, sphere } = require("./v1shim")

function main() {
   return union(
      difference(
         cube({size: 3, center: true}),
         sphere({r: 2, center: true})
      ),
      intersection(
          sphere({r: 1.3, center: true}),
          cube({size: 2.1, center: true})
      )
   )
}

module.exports = { main }
