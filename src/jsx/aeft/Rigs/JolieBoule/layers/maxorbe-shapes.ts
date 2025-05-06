import { MaxLayer } from "../../../MaxFrame/MaxLayer";
import { MaxVectorEllipse, MaxVectorFill, MaxVectorGroup, MaxVectorRoot } from "../../MaxFrame/MaxShapeLayer";
import { MAXORBE_LAYER, MAXORBE_LEG_ONE, MAXORBE_LEG_TWO } from "../enums/maxOrbeExpressions";
import { Leg1, Leg2, MainShapeLayer } from "../enums/maxOrbeNames";
import { makeBottomBodyGroup } from "../groups/shapes/bottom-body-group";
import { makeDomeGroup } from "../groups/shapes/dome-group";
import { makeOrbeGroup } from "../groups/shapes/orbe-group";
import { makeReflectionGroup } from "../groups/shapes/reflection-group";

export const makeMaxOrbeShapeLayer = (
  controller: Layer,
  comp: CompItem,
): void => {
  const maxOrbe = MaxLayer.new("ShapeLayer", comp, MainShapeLayer)
    .parentTo(controller)
    .setLabelColor("darkGreen")
    .transform("position", { expression: "[0, 0]" })
    .transform("zRotation", { expression: "0" })
    .transform("scale", { expression: "[100, 100]" })
    .transform("anchorPoint", { expression: MAXORBE_LAYER.anchorPoint })
    .build() as ShapeLayer;
  const rootGroup = MaxVectorRoot.new(maxOrbe as ShapeLayer).build();

  makeReflectionGroup(rootGroup);
  makeDomeGroup(rootGroup, false);
  makeOrbeGroup(rootGroup, false);
  makeBottomBodyGroup(rootGroup);
  makeDomeGroup(rootGroup);
  makeOrbeGroup(rootGroup);
  app.executeCommand(2160)
};


export const makeLegs = (controller: Layer, comp: CompItem): void => {

  const leg1 = MaxLayer.new("ShapeLayer", comp, Leg1)
    .parentTo(controller)
    .setAsGuideLayer()
    .setLabelColor("orange")
    .seperatePositionDimensions()
    .transform("xPosition", {
      expression: MAXORBE_LEG_ONE.position.x
    })
    .transform("yPosition", {
      expression: MAXORBE_LEG_ONE.position.y
    })
    .build();

  const leg2 = MaxLayer.new("ShapeLayer", comp, Leg2)
    .parentTo(controller)
    .setAsGuideLayer()
    .setLabelColor("orange")
    .seperatePositionDimensions()
    .transform("xPosition", {
      expression: MAXORBE_LEG_TWO.position.x
    })
    .transform("yPosition", {
      expression: MAXORBE_LEG_TWO.position.y
    })
    .build();

  const legs: ShapeLayer[] = [leg1 as ShapeLayer, leg2 as ShapeLayer];

  for (let i = 0; i < legs.length; i++) {
    const leg = legs[i];
    const root = MaxVectorRoot.new(leg as ShapeLayer).build();
    const group = MaxVectorGroup.addTo(root, true).new("test").build();
    MaxVectorEllipse.addTo(group).new("Leg1").size({ value: [100, 100] }).position({ value: [0, 0] }).build();
    MaxVectorFill.addTo(group).new("Fill").color([0.2, 0.2, 0.2, 1]);
  }
}
