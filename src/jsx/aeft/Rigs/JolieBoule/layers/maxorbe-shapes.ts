import { MaxLayer } from "../../../MaxFrame/MaxLayer";
import { MaxVectorRoot } from "../../../MaxFrame/MaxShapeLayer";
import { MAXORBE_LAYER } from "../enums/maxOrbeExpressions";
import { MainShapeLayer } from "../enums/maxOrbeNames";
import { makeBottomBodyGroup } from "../groups/shapes/bottom-body-group";
import { makeDomeGroup } from "../groups/shapes/dome-group";
import { makeOrbeGroup } from "../groups/shapes/orbe-group";
import { makeReflectionGroup } from "../groups/shapes/reflection-group";

export const makeJolieBouleShapeLayer = (
  controller: Layer,
  comp: CompItem,
): ShapeLayer => {
  const jolieboule = MaxLayer.new("ShapeLayer", comp, MainShapeLayer)
    .parentTo(controller)
    .setLabelColor("darkGreen")
    .transform("position", { expression: "[0, 0]" })
    .transform("zRotation", { expression: "0" })
    .transform("scale", { expression: "[100, 100]" })
    .transform("anchorPoint", { expression: MAXORBE_LAYER.anchorPoint })
    .build() as ShapeLayer;
  const rootGroup = MaxVectorRoot.new(jolieboule as ShapeLayer).build();

  makeReflectionGroup(rootGroup);
  makeDomeGroup(rootGroup, false);
  makeOrbeGroup(rootGroup, false);
  makeBottomBodyGroup(rootGroup);
  makeDomeGroup(rootGroup);
  makeOrbeGroup(rootGroup);

  return jolieboule;
};


