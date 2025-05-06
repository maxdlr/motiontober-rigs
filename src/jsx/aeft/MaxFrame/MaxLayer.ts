import { MaxAvLayerMatchNames } from "./ADBE-match-names/MaxAvLayerMatchNames";
import { ValueAndExpressionSet } from "./MaxTypes";
import { setPropertyValueAndExpression } from "./utils/MaxGeneralUtils";

export const MaxLayer = {
  layer: {} as Layer,

  new: function (type: "ShapeLayer" | "Null", comp: CompItem, name: string) {
    switch (type) {
      case "ShapeLayer":
        this.layer = comp.layers.addShape() as ShapeLayer;
        break;
      case "Null":
        this.layer = comp.layers.addNull() as Layer;
        break;
      default:
        throw new Error("Please specify the layer type to create");
    }

    this.layer.name = name;
    return this;
  },

  setAsGuideLayer: function () {
    (this.layer as AVLayer).guideLayer = true;
    return this;
  },

  setLabelColor: function (color: "none"
    | "red"
    | "yellow"
    | "aqua"
    | "pink"
    | "lavender"
    | "peach"
    | "seaFoam"
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "brown"
    | "fuchsia"
    | "cyan"
    | "sandStone"
    | "darkGreen") {

    const colorMap = {
      none: 0,
      red: 1,
      yellow: 2,
      aqua: 3,
      pink: 4,
      lavender: 5,
      peach: 6,
      seaFoam: 7,
      blue: 8,
      green: 9,
      purple: 10,
      orange: 11,
      brown: 12,
      fuchsia: 13,
      cyan: 14,
      sandStone: 15,
      darkGreen: 16
    }

    this.layer.label = colorMap[color];
    return this;
  },

  seperatePositionDimensions: function (): MaxLayer {
    const positionProperty = this.layer.property("Position") as PropertyGroup;
    positionProperty.dimensionsSeparated = true;
    return this;
  },

  parentTo: function (parentLayer: Layer, withJump: boolean = false) {
    if (withJump) {
      this.layer.setParentWithJump(parentLayer);
      return this;
    }

    this.layer.parent = parentLayer;
    return this;
  },

  transform: function (
    type:
      | "anchorPoint"
      | "position"
      | "xPosition"
      | "yPosition"
      | "zPosition"
      | "scale"
      | "orientation"
      | "xRotation"
      | "yRotation"
      | "zRotation"
      | "opacity",
    value: ValueAndExpressionSet,
  ) {
    const transformGroup = this.layer.property(
      MaxAvLayerMatchNames.transform.group,
    ) as PropertyGroup;

    setPropertyValueAndExpression(
      transformGroup,
      MaxAvLayerMatchNames.transform[type],
      value);

    return this;
  },

  build: function () {
    return this.layer;
  },
};
