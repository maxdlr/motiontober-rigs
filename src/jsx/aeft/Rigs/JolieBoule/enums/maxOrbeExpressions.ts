import { BOTTOM, CTRL_MENU_IDS, MainPseudoEffect } from "./maxOrbeNames";

export const getEffectPropertyExpression = (id: number): string => {
  return `parent.effect("${MainPseudoEffect}")(${id})`;
};

export const MAXORBE_LAYER = {
  anchorPoint: "-" + getEffectPropertyExpression(CTRL_MENU_IDS.transform.positionOffset)
};

////////////////////// ----------------- //////////////////////

export const MAXORBE_BOTTOM_BODY_STROKE = {
  color: getEffectPropertyExpression(CTRL_MENU_IDS.design.stroke.color),
  width: getEffectPropertyExpression(CTRL_MENU_IDS.design.stroke.width),
};

export const MAXORBE_BOTTOM_BODY_TOP = {
  opacity: `rot = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.x)};
rot > 0 ? 100 : 0;`,
};

export const MAXORBE_BOTTOM_BODY_TOP_HOLE = {
  size: `bodySize = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};
sizeF = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.hole.size)};
x = sizeF * bodySize / 100;
z = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.x)};
[x, linear(z, 0, 90, 0, x)]`,
  position: "[0,0]",
  fillColor: getEffectPropertyExpression(CTRL_MENU_IDS.design.hole.color),
};

export const MAXORBE_BOTTOM_BODY_TOP_MAIN = {
  size: `x = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};
z = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.x)};
[x, linear(z, 0, 90, 0, x)]`,
  position: "[0,0]",
  color: getEffectPropertyExpression(CTRL_MENU_IDS.design.stroke.color),
  strokeWidth: getEffectPropertyExpression(CTRL_MENU_IDS.design.stroke.width)
};

export const MAXORBE_BODY_BOTTOM_BACK = {
  size: `x = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};
z = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.x)};
[x, linear(z, -90, 0, x, 0)]`,
  position: "[0,0]",
};

export const MAXORBE_BODY_BOTTOM_MAIN_BODY = {
  size: `temp = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};
[temp, temp]`,
  position: "[0,0]",
  gradientEndPoint: `temp = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};
[temp/1.7, 0]`,
};

export const MAXORBE_BODY_BOTTOM_MAIN_BODY_MASK = {
  size: `temp = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};
[temp, temp/2]`,
  position: `temp =${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};
[0, -temp/4]`,
};

////////////////////// ----------------- //////////////////////

export const MAXORBE_ORBE = {
  bottomOpacity: `isHidden = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.x)} > 0;
isEnabled = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.head.enabled)};
isHidden ? 0 : isEnabled == 1 ? 100 : 0;`,
  topOpacity: `isEnabled = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.head.enabled)};
isHidden = content("${BOTTOM.orbe._}").transform.opacity != 0;
isHidden ? 0 : isEnabled == 1 ? 100 : 0;`,
  position: `${getEffectPropertyExpression(CTRL_MENU_IDS.design.head.offset)};`
}

export const MAXORBE_ORBE_PATH = {
  bottomSize: `temp = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)} / 4;
[temp, temp]`,
  bottomPosition: `freq = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.head.wiggle.frequency)};
amp = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.head.wiggle.amplitude)};
loopTime = thisComp.duration;
t = time % loopTime;
wiggle1 = wiggle(freq, amp, 1, 0.5, t);
wiggle2 = wiggle(freq, amp, 1, 0.5, t - loopTime);
freq == 0 && amp == 0 ? [0,0] : ease(t, 0, loopTime, wiggle1, wiggle2)`,
  topSize: `content("${BOTTOM.orbe._}").content("${BOTTOM.orbe.path}").size`,
  topPosition: `content("${BOTTOM.orbe._}").content("${BOTTOM.orbe.path}").position`,
}

export const MAXORBE_ORBE_GRADIENT_FILL = {
  bottomStartPoint: `content("${BOTTOM.orbe._}").content("${BOTTOM.orbe.path}").position`,
  bottomEndPoint: `pos = content("${BOTTOM.orbe._}").content("${BOTTOM.orbe.gradientFill}").startPoint;
w = content("${BOTTOM.orbe._}").content("${BOTTOM.orbe.path}").size[0];
[pos[0] + w/2,pos[1]]`,
  topStartPoint: `content("${BOTTOM.orbe._}").content("${BOTTOM.orbe.gradientFill}").startPoint`,
  topEndPoint: `content("${BOTTOM.orbe._}").content("${BOTTOM.orbe.gradientFill}").endPoint`
}

////////////////////// ----------------- //////////////////////

export const MAXORBE_DOME = {
  bottomOpacity: `isHidden = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.x)} > 0;
isEnabled = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.dome.enabled)} == 1;
isHidden ? 0 : isEnabled ? 100 : 0;`,
  topOpacity: `isHidden = thisLayer.content("${BOTTOM.dome._}").transform.opacity != 0;
isEnabled = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.dome.enabled)} == 1;
isHidden ? 0 : isEnabled ? 100 : 0;`,
};

export const MAXORBE_BOTTOM_DOME_FRONT = {
  size: `x = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};
z = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.x)};
[x, linear(z, 0, 90, 0, x)]`,
  position: "[0,0]",
};

export const MAXORBE_BOTTOM_DOME_MAIN_BODY = {
  size: `temp = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};
[temp, temp]`,
  position: `[0,0]`,
};

export const MAXORBE_BOTTOM_DOME_MAIN_MASK = {
  size: `temp = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};
[temp, temp/2]`,
  position: `temp = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};
[0, temp/4]`,
};

export const MAXORBE_DOME_FILL_COLOR = {
  color: getEffectPropertyExpression(CTRL_MENU_IDS.design.dome.color),
  opacity: getEffectPropertyExpression(CTRL_MENU_IDS.design.dome.opacity),
};

////////////////////// ----------------- //////////////////////

export const MAXORBE_REFLECTION_PATH = {
  size: `thisLayer.content("${BOTTOM.dome._}").content("${BOTTOM.dome.main._}").content("${BOTTOM.dome.main.body}").size / 1.1`,
  position: `[0,0]`,
};

export const MAXORBE_REFLECTION_STROKE = {
  width: getEffectPropertyExpression(CTRL_MENU_IDS.design.dome.reflection.width)
}

export const MAXORBE_REFLECTION = {
  opacity: `${getEffectPropertyExpression(CTRL_MENU_IDS.design.dome.enabled)} == 1 ? ${getEffectPropertyExpression(CTRL_MENU_IDS.design.dome.reflection.opacity)} : 0;`,
}

export const MAXORBE_REFLECTION_TRIM = {
  offset: `- parent.transform.rotation + 180;`,
};

////////////////////// ----------------- //////////////////////

export const MAXORBE_ORBITER_ONE = {
  position: {
    x: `yRotValue = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.y)};
bodySize = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};

ctrlr = ((yRotValue % 360) + 360) % 360;
maxTrans = bodySize / 2;

function rotate() {
  front1 = easeOut(ctrlr, 0, 90, 0, maxTrans);
  back = ease(ctrlr, 90, 270, 0, -maxTrans * 2);
  front2 = easeIn(ctrlr, 270, 360, 0, maxTrans);
  return front1 + back + front2;
}
rotate();
`,
    y: `yRotValue = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.y)};
xRotValue = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.x)};
bodySize = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};

yRot = ((yRotValue % 360) + 360) % 360;
xRange = bodySize / 2;
ctrlr = transform.xPosition;
frontDegreesRange = (yRot >= 0 && yRot <= 90) || (yRot >= 270 && yRot <= 360);

yRange = linear(xRotValue, -90, 90, -bodySize / 2, bodySize / 2);

right = easeIn(ctrlr, xRange / 3, xRange, 0, -yRange);
left = easeOut(ctrlr, -xRange, -xRange / 3, -yRange, 0);
result = frontDegreesRange ? right + left + yRange: -(right + left) - yRange;

result;`
  },
}

export const MAXORBE_ORBITER_TWO = {
  position: {
    x: `yRotValue = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.y)};
bodySize = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};

ctrlr = ((yRotValue % 360) + 360) % 360;
maxTrans = bodySize / 2;

function rotate() {
  front1 = -easeOut(ctrlr, 0, 90, 0, maxTrans);
  back = -ease(ctrlr, 90, 270, 0, -maxTrans * 2);
  front2 = -easeIn(ctrlr, 270, 360, 0, maxTrans);
  return front1 + back + front2;
}
rotate();`,
    y: `yRotValue = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.y)};
xRotValue = ${getEffectPropertyExpression(CTRL_MENU_IDS.dynamics.rotation.x)};
bodySize = ${getEffectPropertyExpression(CTRL_MENU_IDS.design.size)};

yRot = ((yRotValue % 360) + 360) % 360;
xRot = (xRotValue % 360) % 360;
xRange = bodySize / 2;
ctrlr = transform.xPosition;
frontDegreesRange = (yRot >= 0 && yRot <= 90) || (yRot >= 270 && yRot <= 360);

yRange = linear(xRotValue, -90, 90, -bodySize / 2, bodySize / 2);

right = easeIn(ctrlr, xRange / 3, xRange, 0, -yRange);
left = easeOut(ctrlr, -xRange, -xRange / 3, -yRange, 0);

result = !frontDegreesRange ? right + left + yRange : -(right + left) - yRange;

result;`
  }
}
