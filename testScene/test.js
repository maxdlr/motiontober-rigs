var fingerName = "fingerOne";

var smoothness = parent.effect("finger smoothness")("Slider"); // 0-1
var taper = parent.effect("Taper Amount")("Slider"); // 0–100
var softness = parent.effect("Joint Softness")("Slider") / 100; // 0–1
var tipSegments = Math.max(6, Math.round(smoothness * 2));
var baseSegments = tipSegments;

// === Joint Positions & Widths ===

var joints = [
  content("fingers").content(fingerName).content("joints").content("metacarpal"),
  content("fingers").content(fingerName).content("joints").content("proximal"),
  content("fingers").content(fingerName).content("joints").content("distal"),
  content("fingers").content(fingerName).content("joints").content("end")
];
var points = joints.map(function (j) { return j.transform.position; });

// Apply tapering
var widths = joints.map(function (j, i) {
  var baseWidth = j.content("ellipse").size[0];
  var factor = 1 - (i / (joints.length - 1)) * (taper / 100);
  return baseWidth * factor;
});

// === Vector Helpers ===

function sub(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
function add(a, b) { return [a[0] + b[0], a[1] + b[1]]; }
function scale(v, s) { return [v[0] * s, v[1] * s]; }
function norm(v) {
  var l = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  return l === 0 ? [0, 0] : [v[0] / l, v[1] / l];
}
function perp(v) { return [-v[1], v[0]]; }
function dist(a, b) {
  var dx = b[0] - a[0], dy = b[1] - a[1];
  return Math.sqrt(dx * dx + dy * dy);
}
function angleBetween(a, b) {
  var dot = a[0] * b[0] + a[1] * b[1];
  var det = a[0] * b[1] - a[1] * b[0];
  return Math.atan2(det, dot);
}
function customLinear(val, inMin, inMax, outMin, outMax) {
  val = Math.max(inMin, Math.min(val, inMax));
  return outMin + (val - inMin) * (outMax - outMin) / (inMax - inMin);
}

// === Compute Tangents for Centerline ===

var inTangents = [], outTangents = [];
var bends = []; // Store bend values for each intermediate point

for (var i = 0; i < points.length; i++) {
  if (i === 0) {
    var dir = norm(sub(points[1], points[0]));
    var len = dist(points[0], points[1]) * softness;
    inTangents.push([0, 0]);
    outTangents.push(scale(dir, len));
    bends.push(0); // No bend at the start
  } else if (i === points.length - 1) {
    var dir = norm(sub(points[i], points[i - 1]));
    var len = dist(points[i], points[i - 1]) * softness;
    inTangents.push(scale(dir, -len));
    outTangents.push([0, 0]);
    bends.push(0); // No bend at the end
  } else {
    var prev = norm(sub(points[i], points[i - 1]));
    var next = norm(sub(points[i + 1], points[i]));
    var dir = norm(add(prev, next));

    // Concave/convex weighting via dot product (bend calculation)
    var bend = prev[0] * next[0] + prev[1] * next[1];
    bends.push(bend); // Store the bend value

    var concaveFactor = customLinear(bend, -1, 1, 0.1, 1);
    var len = Math.min(dist(points[i], points[i - 1]), dist(points[i], points[i + 1])) * softness * concaveFactor;
    inTangents.push(scale(dir, -len));
    outTangents.push(scale(dir, len));
  }
}
bends.unshift(0); // Add a bend value for the first point
bends.push(0);  // Add a bend value for the last point

// === Offset Curve Function ===

function offsetPath(side, bend) {
  var newPoints = [], newInTangents = [], newOutTangents = [];

  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    var width = widths[i] / 2;

    var dir;
    if (i === 0) {
      dir = norm(sub(points[1], points[0]));
    } else if (i === points.length - 1) {
      dir = norm(sub(points[i], points[i - 1]));
    } else {
      var prev = norm(sub(p, points[i - 1]));
      var next = norm(sub(points[i + 1], p));
      dir = norm(add(prev, next));
    }

    var perpDir = side === "left" ? perp(dir) : scale(perp(dir), -1);
    var offset = scale(perpDir, width);

    newPoints.push(add(p, offset));

    // Force Near-Zero Tangents on Inside of Bent Knuckles
    if (i > 0 && i < points.length - 1) {
      var tangentLength = Math.min(dist(points[i], points[i - 1]), dist(points[i], points[i + 1])) * softness;
      var smoothnessFactor = customLinear(softness, 0, 1, 1, 1.5);

      if ((side === "left" && bend < -0.3) || (side === "right" && bend > 0.3)) {
        // Force near-zero tangents on the inside
        newInTangents.push([0, 0]);
        newOutTangents.push([0, 0]);
      } else { // Outside or less bent
        newInTangents.push(scale(dir, -tangentLength * smoothnessFactor));
        newOutTangents.push(scale(dir, tangentLength * smoothnessFactor));
      }
    } else {
      newInTangents.push(inTangents[i]);
      newOutTangents.push(outTangents[i]);
    }
  }

  return {
    pts: newPoints,
    inTangents: newInTangents,
    outTangents: newOutTangents
  };
}

// === Left and Right Sides ===
var left = offsetPath("left", bends);
var right = offsetPath("right", bends);

// === Tip Arc ===

var tipPoints = [], tipInTangents = [], tipOutTangents = [];

var tipCenter = points[points.length - 1];
var tipRadius = widths[widths.length - 1] / 2;
var tipDir = norm(sub(points[points.length - 1], points[points.length - 2]));
var tipPerp = perp(tipDir);
var arcLen = 4 / 3 * Math.tan(Math.PI / (2 * tipSegments));

for (var i = 0; i <= tipSegments; i++) {
  var angle = Math.PI * i / tipSegments;
  var x = Math.cos(angle) * tipRadius;
  var y = Math.sin(angle) * tipRadius;

  var pt = [
    tipCenter[0] + x * tipPerp[0] + y * tipDir[0],
    tipCenter[1] + x * tipPerp[1] + y * tipDir[1]
  ];
  tipPoints.push(pt);

  var tanDir = [-Math.sin(angle), Math.cos(angle)];
  var tangent = scale([
    tanDir[0] * tipPerp[0] + tanDir[1] * tipDir[0],
    tanDir[0] * tipPerp[1] + tanDir[1] * tipDir[1]
  ], tipRadius * arcLen);

  tipInTangents.push(scale(tangent, -1));
  tipOutTangents.push(tangent);
}

// === Base Arc ===

var basePoints = [], baseInTangents = [], baseOutTangents = [];

var baseCenter = points[0];
var baseRadius = widths[0] / 2;
var baseDir = norm(sub(points[1], points[0]));
var basePerp = perp(baseDir);
var baseArcLen = 4 / 3 * Math.tan(Math.PI / (2 * baseSegments));

for (var i = 0; i <= baseSegments; i++) {
  var angle = Math.PI + Math.PI * i / baseSegments;
  var x = Math.cos(angle) * baseRadius;
  var y = Math.sin(angle) * baseRadius;

  var pt = [
    baseCenter[0] + x * basePerp[0] + y * baseDir[0],
    baseCenter[1] + x * basePerp[1] + y * baseDir[1]
  ];
  basePoints.push(pt);

  var tanDir = [-Math.sin(angle), Math.cos(angle)];
  var tangent = scale([
    tanDir[0] * basePerp[0] + tanDir[1] * baseDir[0],
    tanDir[0] * basePerp[1] + tanDir[1] * baseDir[1]
  ], baseRadius * baseArcLen);

  baseInTangents.push(scale(tangent, -1));
  baseOutTangents.push(tangent);
}

// === Combine All Points ===

var finalPts = basePoints
  .slice(0, -1)
  .concat(left.pts)
  .concat(tipPoints.slice(1, -1))
  .concat(right.pts.reverse());

var finalInTangents = baseInTangents
  .slice(0, -1)
  .concat(left.inTangents)
  .concat(tipInTangents.slice(1, -1))
  .concat(right.outTangents.reverse());

var finalOutTangents = baseOutTangents
  .slice(0, -1)
  .concat(left.outTangents)
  .concat(tipOutTangents.slice(1, -1))
  .concat(right.inTangents.reverse());

// === Close Path ===

finalPts.push(finalPts[0]);
finalInTangents.push([0, 0]);
finalOutTangents.push([0, 0]);

// === Create Path ===

createPath(finalPts, finalInTangents, finalOutTangents, true);
