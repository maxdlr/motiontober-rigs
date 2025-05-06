import { MaxVectorEllipse, MaxVectorFill, MaxVectorGroup, MaxVectorMergePath, MaxVectorRectangle } from "../../../../MaxFrame/MaxShapeLayer";
import {
  MAXORBE_BOTTOM_DOME_FRONT,
  MAXORBE_BOTTOM_DOME_MAIN_BODY,
  MAXORBE_BOTTOM_DOME_MAIN_MASK,
  MAXORBE_DOME,
  MAXORBE_DOME_FILL_COLOR,
} from "../../enums/maxOrbeExpressions";
import { BOTTOM, TOP } from "../../enums/maxOrbeNames";

export const makeDomeGroup = (
  root: PropertyGroup,
  isBottom: boolean = true,
) => {
  const body = MaxVectorGroup.addTo(root, true)
    .new(isBottom ? BOTTOM.dome._ : TOP.dome._)
    .transform(
      "opacity",
      isBottom ? MAXORBE_DOME.bottomOpacity : MAXORBE_DOME.topOpacity,
    )
    .build();

  MaxVectorEllipse.addTo(body)
    .new(BOTTOM.dome.front)
    .size({ expression: MAXORBE_BOTTOM_DOME_FRONT.size })
    .position({ expression: MAXORBE_BOTTOM_DOME_FRONT.position });

  const main = MaxVectorGroup.addTo(body).new(BOTTOM.dome.main._).build();
  MaxVectorEllipse.addTo(main)
    .new(BOTTOM.dome.main.body)
    .size({ expression: MAXORBE_BOTTOM_DOME_MAIN_BODY.size })
    .position({ expression: MAXORBE_BOTTOM_DOME_MAIN_BODY.position });
  MaxVectorRectangle.addTo(main)
    .new(BOTTOM.dome.main.mask)
    .size(MAXORBE_BOTTOM_DOME_MAIN_MASK.size)
    .position(MAXORBE_BOTTOM_DOME_MAIN_MASK.position);
  MaxVectorMergePath.addTo(main)
    .new(BOTTOM.dome.main.mergePaths)
    .mode("subtract");

  MaxVectorMergePath.addTo(body).new(BOTTOM.dome.mergePaths).mode("add");
  MaxVectorFill.addTo(body)
    .new(BOTTOM.dome.fill)
    .color(MAXORBE_DOME_FILL_COLOR.color)
    .opacity(MAXORBE_DOME_FILL_COLOR.opacity);
};
