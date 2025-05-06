import { MaxShapeLayerMatchNames } from "./ADBE-match-names/MaxShapeLayerMatchNames";
import { ValueAndExpressionSet } from "./MaxTypes";
import { setPropertyValueAndExpression } from "./utils/MaxGeneralUtils";

export const MaxVectorRoot = {
  rootGroup: {} as PropertyGroup,

  new: function (shapeLayer: ShapeLayer) {
    shapeLayer.threeDLayer = false;

    this.rootGroup = shapeLayer.property(
      MaxShapeLayerMatchNames.group.root,
    ) as PropertyGroup;

    return this;
  },

  build: function () {
    return this.rootGroup;
  },
};

export const MaxVectorGroup = {
  parent: {} as PropertyGroup,
  group: {} as PropertyGroup,

  addTo: function (parent: PropertyGroup, isParentRoot: boolean = false) {
    this.parent = isParentRoot
      ? parent
      : (parent.property(
        MaxShapeLayerMatchNames.group.groupContents,
      ) as PropertyGroup);

    return this;
  },

  new: function (name: string) {
    this.group = this.parent.addProperty(
      MaxShapeLayerMatchNames.group.group,
    ) as PropertyGroup;
    this.group.name = name;

    return this;
  },

  transform: function (
    type:
      | "position"
      | "rotation"
      | "scale"
      | "opacity"
      | "skew"
      | "skew-axis"
      | "anchor-point",
    value: number | number[] | string,
  ) {
    const transformGroup = this.group.property(
      MaxShapeLayerMatchNames.vectorTransform.group,
    ) as PropertyGroup;

    const transformProperty = transformGroup.property(
      MaxShapeLayerMatchNames.vectorTransform[type],
    ) as Property;

    if (typeof value === "string") {
      transformProperty.expression = value;
      return this;
    }

    transformProperty.setValue(value);
    return this;
  },

  build: function () {
    return this.group as PropertyGroup;
  },
};

export const MaxVectorEllipse = {
  parent: {} as PropertyGroup,
  ellipse: {} as PropertyGroup,

  addTo: function (parent: PropertyGroup) {
    this.parent = parent.property(
      MaxShapeLayerMatchNames.group.groupContents,
    ) as PropertyGroup;
    return this;
  },

  new: function (name: string) {
    const ellipse = this.parent.addProperty(
      "ADBE Vector Shape - Ellipse",
    ) as PropertyGroup;
    ellipse.name = name;
    this.ellipse = ellipse;
    return this;
  },

  size: function (value: ValueAndExpressionSet) {
    setPropertyValueAndExpression(this.ellipse, MaxShapeLayerMatchNames.vectorEllipse.size, value);
    // const ellipseSize = this.ellipse.property(
    //   MaxShapeLayerMatchNames.vectorEllipse.size,
    // ) as ShapePropertyType;
    //
    // if (value.expression) ellipseSize.expression = value.expression;
    // if (value.value) ellipseSize.setValue(value.value);
    return this;
  },

  position: function (value: ValueAndExpressionSet) {
    setPropertyValueAndExpression(
      this.ellipse,
      MaxShapeLayerMatchNames.vectorEllipse.position,
      value,
    );
    return this;
  },

  build: function (): PropertyGroup {
    return this.ellipse as PropertyGroup;
  },
};

export const MaxVectorRectangle = {
  parent: {} as PropertyGroup,
  rectangle: {} as PropertyGroup,

  addTo: function (parent: PropertyGroup) {
    this.parent = parent.property(
      MaxShapeLayerMatchNames.group.groupContents,
    ) as PropertyGroup;
    return this;
  },

  new: function (name: string) {
    const rectangle = this.parent.addProperty(
      "ADBE Vector Shape - Rect",
    ) as PropertyGroup;
    rectangle.name = name;
    this.rectangle = rectangle;
    return this;
  },

  size: function (value: number[] | string) {
    const rectangleSize = this.rectangle.property(
      "ADBE Vector Rect Size",
    ) as ShapePropertyType;

    if (typeof value === "string") {
      rectangleSize.expression = value;
      return this;
    }

    rectangleSize.setValue(value);
    return this;
  },

  position: function (value: number[] | string) {
    const rectangleSize = this.rectangle.property(
      "ADBE Vector Rect Position",
    ) as ShapePropertyType;

    if (typeof value === "string") {
      rectangleSize.expression = value;
      return this;
    }
    rectangleSize.setValue(value);
    return this;
  },

  roundness: function (value: number | string) {
    const rectangleRoundness = this.rectangle.property(
      "ADBE Vector Rect Roundness",
    ) as ShapePropertyType;

    if (typeof value === "string") {
      rectangleRoundness.expression = value;
      return this;
    }
    rectangleRoundness.setValue(value);
    return this;
  },

  build: function () {
    return this.rectangle as PropertyGroup;
  },
};

export const MaxVectorFill = {
  parent: {} as PropertyGroup,
  group: {} as PropertyGroup,

  addTo: function (parent: PropertyGroup) {
    this.parent = parent.property(
      MaxShapeLayerMatchNames.group.groupContents,
    ) as PropertyGroup;
    return this;
  },

  new: function (name?: string) {
    this.group = this.parent.addProperty(
      "ADBE Vector Graphic - Fill",
    ) as PropertyGroup;
    if (name) this.group.name = name;
    return this;
  },

  color: function (color: number[] | string) {
    const fillColor = this.group.property(
      "ADBE Vector Fill Color",
    ) as ShapePropertyType;

    if (typeof color === "string") {
      fillColor.expression = color;
      return this;
    }

    fillColor.setValue(color);
    return this;
  },

  opacity: function (opacity: number | string) {
    const fillOpacity = this.group.property(
      "ADBE Vector Fill Opacity",
    ) as ShapePropertyType;

    if (typeof opacity === "string") {
      fillOpacity.expression = opacity;
      return this;
    }

    fillOpacity.setValue(opacity);
    return this;
  },

  build: function () {
    return this.group;
  },
};

export const MaxVectorStroke = {
  parent: {} as PropertyGroup,
  group: {} as PropertyGroup,

  addTo: function (parent: PropertyGroup) {
    this.parent = parent.property(
      MaxShapeLayerMatchNames.group.groupContents,
    ) as PropertyGroup;
    return this;
  },

  new: function (name?: string) {
    this.group = this.parent.addProperty(
      MaxShapeLayerMatchNames.vectorStroke.group,
    ) as PropertyGroup;
    if (name) this.group.name = name;

    return this;
  },

  color: function (color: number[] | string) {
    const strokeColor = this.group.property(
      MaxShapeLayerMatchNames.vectorStroke.color,
    ) as ShapePropertyType;

    if (typeof color === "string") {
      strokeColor.expression = color;
      return this;
    }
    strokeColor.setValue(color);
    return this;
  },

  width: function (width: ValueAndExpressionSet) {
    // const strokeWidth = this.group.property(
    //   "ADBE Vector Stroke Width",
    // ) as ShapePropertyType;

    setPropertyValueAndExpression(
      this.group,
      MaxShapeLayerMatchNames.vectorStroke.width,
      width
    );

    // if (typeof width === "string") {
    //   strokeWidth.expression = width;
    //   return this;
    // }
    // strokeWidth.setValue(width);
    return this;
  },

  cap: function (type: "butt" | "round" | "projecting") {
    const caps = {
      butt: 1,
      round: 2,
      projecting: 3,
    };

    const strokeCap = this.group.property(
      "ADBE Vector Stroke Line Cap",
    ) as ShapePropertyType;
    strokeCap.setValue(caps[type]);
    return this;
  },

  join: function (type: "miter" | "round" | "bevel") {
    const joins = {
      miter: 1,
      round: 2,
      bevel: 3,
    };

    const strokeJoin = this.group.property(
      "ADBE Vector Stroke Line Join",
    ) as ShapePropertyType;
    strokeJoin.setValue(joins[type]);
    return this;
  },

  taper: function (
    startLength?: ValueAndExpressionSet,
    endLength?: ValueAndExpressionSet,
    startWidth?: ValueAndExpressionSet,
    endWidth?: ValueAndExpressionSet,
    startEase?: ValueAndExpressionSet,
    endEase?: ValueAndExpressionSet,
  ) {
    const strokeTaper = this.group.property(
      MaxShapeLayerMatchNames.vectorTaper.group,
    ) as PropertyGroup;

    if (startLength !== undefined) {
      setPropertyValueAndExpression(
        strokeTaper,
        MaxShapeLayerMatchNames.vectorTaper.startLength,
        startLength,
      );
    }

    if (endLength !== undefined) {
      setPropertyValueAndExpression(
        strokeTaper,
        MaxShapeLayerMatchNames.vectorTaper.endLength,
        endLength,
      );
    }

    if (startWidth !== undefined) {
      setPropertyValueAndExpression(
        strokeTaper,
        MaxShapeLayerMatchNames.vectorTaper.startWidth,
        startWidth,
      );
    }

    if (endWidth !== undefined) {
      setPropertyValueAndExpression(
        strokeTaper,
        MaxShapeLayerMatchNames.vectorTaper.endWidth,
        endWidth,
      );
    }

    if (startEase !== undefined) {
      setPropertyValueAndExpression(
        strokeTaper,
        MaxShapeLayerMatchNames.vectorTaper.startEase,
        startEase,
      );
    }

    if (endEase !== undefined) {
      setPropertyValueAndExpression(
        strokeTaper,
        MaxShapeLayerMatchNames.vectorTaper.endEase,
        endEase,
      );
    }

    return this;
  },

  //todo: taper() & dashes()

  build: function () {
    return this.group;
  },
};

export const MaxVectorGradientFill = {
  parent: {} as PropertyGroup,
  group: {} as ShapePropertyType,

  addTo: function (parent: PropertyGroup) {
    this.parent = parent.property(
      MaxShapeLayerMatchNames.group.groupContents,
    ) as PropertyGroup;
    return this;
  },

  new: function (name: string) {
    this.group = this.parent.addProperty(
      "ADBE Vector Graphic - G-Fill",
    ) as ShapePropertyType;
    if (name) this.group.name = name;

    return this;
  },

  type: function (type: "linear" | "radial") {
    const gradType = this.group.property(
      "ADBE Vector Grad Type",
    ) as ShapePropertyType;
    const gradTypes = {
      linear: 1,
      radial: 2,
    };
    gradType.setValue(gradTypes[type]);
    return this;
  },

  startPoint: function (startPoint: number[] | string) {
    const startPt = this.group.property(
      "ADBE Vector Grad Start Pt",
    ) as ShapePropertyType;

    if (typeof startPoint === "string") {
      startPt.expression = startPoint;
      return this;
    }

    startPt.setValue(startPoint);
    return this;
  },

  endPoint: function (endPoint: number[] | string) {
    const endPt = this.group.property(
      "ADBE Vector Grad End Pt",
    ) as ShapePropertyType;

    if (typeof endPoint === "string") {
      endPt.expression = endPoint;
      return this;
    }

    endPt.setValue(endPoint);
    return this;
  },

  highlight: function (length: number, angle: number) {
    const highlightLength = this.group.property(
      "ADBE Vector Grad HiLite Length",
    ) as ShapePropertyType;
    highlightLength.setValue(length);

    const highlightAngle = this.group.property(
      "ADBE Vector Grad HiLite Angle",
    ) as ShapePropertyType;
    highlightAngle.setValue(angle);

    return this;
  },

  build: function () {
    return this.group;
  },
};

export const MaxVectorMergePath = {
  parent: {} as PropertyGroup,
  group: {} as ShapePropertyType,

  addTo: function (parent: PropertyGroup) {
    this.parent = parent.property(
      MaxShapeLayerMatchNames.group.groupContents,
    ) as PropertyGroup;
    return this;
  },

  new: function (name: string) {
    this.group = this.parent.addProperty(
      "ADBE Vector Filter - Merge",
    ) as ShapePropertyType;
    if (name) this.group.name = name;

    return this;
  },

  mode: function (
    mode: "merge" | "add" | "subtract" | "intersect" | "exclude-intersections",
  ) {
    const mergePathMode = this.group.property(
      "ADBE Vector Merge Type",
    ) as ShapePropertyType;

    const modes = {
      merge: 1,
      add: 2,
      subtract: 3,
      intersect: 4,
      "exclude-intersections": 5,
    };
    mergePathMode.setValue(modes[mode]);
    return this;
  },

  build: function () {
    return this.group;
  },
};

export const MaxVectorTrimPath = {
  parent: {} as PropertyGroup,
  group: {} as ShapePropertyType,

  addTo: function (parent: PropertyGroup) {
    this.parent = parent.property(
      MaxShapeLayerMatchNames.group.groupContents,
    ) as PropertyGroup;
    return this;
  },

  new: function (name: string) {
    this.group = this.parent.addProperty(
      "ADBE Vector Filter - Trim",
    ) as ShapePropertyType;
    if (name) this.group.name = name;
    return this;
  },

  start: function (percentage: number | string) {
    const startGroup = this.group.property(
      "ADBE Vector Trim Start",
    ) as ShapePropertyType;

    if (typeof percentage === "string") {
      startGroup.expression = percentage;
      return this;
    }

    startGroup.setValue(percentage);
    return this;
  },

  end: function (percentage: number | string) {
    const endGroup = this.group.property(
      "ADBE Vector Trim End",
    ) as ShapePropertyType;

    if (typeof percentage === "string") {
      endGroup.expression = percentage;
      return this;
    }

    endGroup.setValue(percentage);
    return this;
  },

  offset: function (offset: number | string) {
    const offsetGroup = this.group.property(
      "ADBE Vector Trim Offset",
    ) as ShapePropertyType;

    if (typeof offset === "string") {
      offsetGroup.expression = offset;
      return this;
    }

    offsetGroup.setValue(offset);
    return this;
  },

  type: function (type: "simultaneously" | "individually") {
    const typeGroup = this.group.property(
      "ADBE Vector Trim Type",
    ) as ShapePropertyType;

    const types = {
      simultaneously: 1,
      individually: 2,
    };

    typeGroup.setValue(types[type]);
    return this;
  },
  build: function () {
    return this.group;
  },
};
