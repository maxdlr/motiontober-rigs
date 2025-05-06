import { MaxVectorEllipse, MaxVectorFill, MaxVectorGradientFill, MaxVectorGroup, MaxVectorMergePath, MaxVectorRectangle, MaxVectorStroke } from "../../../../MaxFrame/MaxShapeLayer";
import {
  MAXORBE_BODY_BOTTOM_BACK,
  MAXORBE_BODY_BOTTOM_MAIN_BODY,
  MAXORBE_BODY_BOTTOM_MAIN_BODY_MASK,
  MAXORBE_BOTTOM_BODY_STROKE,
  MAXORBE_BOTTOM_BODY_TOP,
  MAXORBE_BOTTOM_BODY_TOP_HOLE,
  MAXORBE_BOTTOM_BODY_TOP_MAIN,
} from "../../enums/maxOrbeExpressions";
import { BODY, BOTTOM } from "../../enums/maxOrbeNames";

export const makeBottomBodyGroup = (root: PropertyGroup) => {
  const body = MaxVectorGroup.addTo(root, true).new(BOTTOM.body).build();
  buildTop(body);
  buildBottom(body);
  MaxVectorStroke.addTo(body)
    .new(BODY._)
    .color(MAXORBE_BOTTOM_BODY_STROKE.color)
    .width({ expression: MAXORBE_BOTTOM_BODY_STROKE.width })
    .cap("round")
    .join("round")
    .build();
};

const buildBottom = (parent: PropertyGroup) => {
  const bodyBottom = MaxVectorGroup.addTo(parent).new(BODY.bottom._).build();
  MaxVectorEllipse.addTo(bodyBottom)
    .new(BODY.bottom.back)
    .size({ expression: MAXORBE_BODY_BOTTOM_BACK.size })
    .position({ expression: MAXORBE_BODY_BOTTOM_BACK.position });

  const main = MaxVectorGroup.addTo(bodyBottom)
    .new(BODY.bottom.main)
    .build();

  MaxVectorEllipse.addTo(main)
    .new(BODY.bottom.body._)
    .size({ expression: MAXORBE_BODY_BOTTOM_MAIN_BODY.size })
    .position({ expression: MAXORBE_BODY_BOTTOM_MAIN_BODY.position });

  MaxVectorRectangle.addTo(main)
    .new(BODY.bottom.body.mask)
    .size(MAXORBE_BODY_BOTTOM_MAIN_BODY_MASK.size)
    .position(MAXORBE_BODY_BOTTOM_MAIN_BODY_MASK.position);

  MaxVectorMergePath.addTo(main)
    .new(BODY.bottom.body.mask)
    .mode("subtract");

  MaxVectorMergePath.addTo(bodyBottom)
    .new(BODY.bottom.merge)
    .mode("add");

  MaxVectorGradientFill.addTo(bodyBottom)
    .new(BODY.bottom.gradientFill)
    .type("radial")
    .startPoint([0, 0])
    .endPoint(MAXORBE_BODY_BOTTOM_MAIN_BODY.gradientEndPoint)
    .highlight(26, 51);
};

const buildTop = (parent: PropertyGroup) => {
  const bodyTop = MaxVectorGroup.addTo(parent)
    .new(BODY.top._)
    .transform("opacity", MAXORBE_BOTTOM_BODY_TOP.opacity)
    .build();

  MaxVectorEllipse.addTo(bodyTop)
    .new(BODY.top.hole._)
    .size({ expression: MAXORBE_BOTTOM_BODY_TOP_HOLE.size })
    .position({ expression: MAXORBE_BOTTOM_BODY_TOP_HOLE.position });

  MaxVectorFill.addTo(bodyTop)
    .new(BODY.top.hole.fill)
    .color(MAXORBE_BOTTOM_BODY_TOP_HOLE.fillColor);

  MaxVectorEllipse.addTo(bodyTop)
    .new(BODY.top.main._)
    .size({ expression: MAXORBE_BOTTOM_BODY_TOP_MAIN.size })
    .position({ expression: MAXORBE_BOTTOM_BODY_TOP_MAIN.position });

  MaxVectorFill.addTo(bodyTop)
    .new(BODY.top.main.fill)
    .color(MAXORBE_BOTTOM_BODY_TOP_MAIN.color);

  MaxVectorStroke.addTo(bodyTop)
    .new(BODY.top.main.stroke)
    .color(MAXORBE_BOTTOM_BODY_TOP_MAIN.color)
    .width({ expression: MAXORBE_BOTTOM_BODY_TOP_MAIN.strokeWidth })
    .cap("round")
    .join("round");
};
