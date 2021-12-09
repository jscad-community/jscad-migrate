# JSCAD migrate v1 -> v2

This contains a script which can help with migration of JSCAD v1 projects to using the new v2 apis.

## Step 1

Begin with a JSCAD v1 project

```js
function main() {
   return union(
      difference(
         cube({size: 3, center: true}),
         sphere({r:2, center: true})
      ),
      intersection(
          sphere({r: 1.3, center: true}),
          cube({size: 2.1, center: true})
      )
   )
}
```

## Step 2

Add `require` headers and `module.exports` footer to your v1 design. You can now render this design in JSCAD v2.

```diff
+const { difference, intersection, union } = require("./v1shim")
+const { cube, sphere } = require("./v1shim")

function main() {
   return union(
      difference(
         cube({size: 3, center: true}),
         sphere({r:2, center: true})
      ),
      intersection(
          sphere({r: 1.3, center: true}),
          cube({size: 2.1, center: true})
      )
   )
}

+module.exports = { main }
```

Note, you need to drag the entire `step2` directory onto JSCAD to make the include work.

## Step 3

Optionally, migrate individual objects to use v2 apis for cleaner code without the shim.

```diff
-const { difference, intersection, union } = require("./v1shim")
-const { cube, sphere } = require("./v1shim")
+const jscad = require('@jscad/modeling')
+const { intersect, subtract, union } = jscad.booleans
+const { cuboid, sphere } = jscad.primitives

function main() {
   return union(
-      difference(
-         cube({size: 3, center: true}),
-         sphere({r:2, center: true})
-      ),
-      intersection(
-          sphere({r: 1.3, center: true}),
-          cube({size: 2.1, center: true})
+      subtract(
+         cuboid({size: [3, 3, 3]}),
+         sphere({radius: 2})
+      ),
+      intersect(
+          sphere({radius: 1.3}),
+          cuboid({size: [2.1, 2.1, 2.1]})
      )
   )
}

module.exports = { main }
```
