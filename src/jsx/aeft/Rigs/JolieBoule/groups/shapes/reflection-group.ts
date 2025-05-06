import { MaxVectorEllipse, MaxVectorGroup, MaxVectorStroke, MaxVectorTrimPath } from "../../../../MaxFrame/MaxShapeLayer";
import {
  MAXORBE_REFLECTION,
  MAXORBE_REFLECTION_PATH,
  MAXORBE_REFLECTION_STROKE,
  MAXORBE_REFLECTION_TRIM,
} from "../../enums/maxOrbeExpressions";
import { REFLECTION } from "../../enums/maxOrbeNames";

export const makeReflectionGroup = (root: PropertyGroup) => {
  const reflectionGroup = MaxVectorGroup.addTo(root, true)
    .new(REFLECTION._)
    .transform("opacity", MAXORBE_REFLECTION.opacity)
    .build();

  MaxVectorEllipse.addTo(reflectionGroup)
    .new(REFLECTION.path)
    .size({ expression: MAXORBE_REFLECTION_PATH.size })
    .position({ expression: MAXORBE_REFLECTION_PATH.position });

  MaxVectorTrimPath.addTo(reflectionGroup)
    .new(REFLECTION.trimPath)
    .start(40)
    .end(60)
    .offset(MAXORBE_REFLECTION_TRIM.offset);

  MaxVectorStroke.addTo(reflectionGroup)
    .new(REFLECTION.stroke)
    .width({ value: 40, expression: MAXORBE_REFLECTION_STROKE.width })
    .color([1, 1, 1, 1])
    .cap("round")
    .taper({ value: 100 }, { value: 100 }, { value: 10 }, { value: 10 });
};
