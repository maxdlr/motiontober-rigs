import { MaxVectorEllipse, MaxVectorGradientFill, MaxVectorGroup } from "../../../../MaxFrame/MaxShapeLayer";
import {
  MAXORBE_ORBE,
  MAXORBE_ORBE_GRADIENT_FILL,
  MAXORBE_ORBE_PATH,
} from "../../enums/maxOrbeExpressions";
import { BOTTOM, TOP } from "../../enums/maxOrbeNames";

export const makeOrbeGroup = (
  root: PropertyGroup,
  isBottom: boolean = true,
) => {
  const orbeGroup = MaxVectorGroup.addTo(root, true)
    .new(isBottom ? BOTTOM.orbe._ : TOP.orbe._)
    .transform(
      "opacity",
      isBottom ? MAXORBE_ORBE.bottomOpacity : MAXORBE_ORBE.topOpacity,
    )
    .transform("position", MAXORBE_ORBE.position)
    .build();

  MaxVectorEllipse.addTo(orbeGroup)
    .new(isBottom ? BOTTOM.orbe.path : TOP.orbe.path)
    .size({
      expression: isBottom
        ? MAXORBE_ORBE_PATH.bottomSize
        : MAXORBE_ORBE_PATH.topSize,
    })
    .position({
      expression: isBottom
        ? MAXORBE_ORBE_PATH.bottomPosition
        : MAXORBE_ORBE_PATH.topPosition,
      value: [0, 0],
    });

  MaxVectorGradientFill.addTo(orbeGroup)
    .new(
      isBottom ? BOTTOM.orbe.gradientFill : TOP.orbe.gradientFill,
    )
    .startPoint(
      isBottom
        ? MAXORBE_ORBE_GRADIENT_FILL.bottomStartPoint
        : MAXORBE_ORBE_GRADIENT_FILL.topStartPoint,
    )
    .endPoint(
      isBottom
        ? MAXORBE_ORBE_GRADIENT_FILL.bottomEndPoint
        : MAXORBE_ORBE_GRADIENT_FILL.topEndPoint,
    )
    .type("radial");
};
