import { MTB_RIGS_NAMES } from "../../enums/MtbRigsNames";

const JOLIEBOULE = "JolieBoule";

export const MainController = `[CTRL] - ${JOLIEBOULE}`;
export const MainPseudoEffect = `${MTB_RIGS_NAMES.ORG} - ${JOLIEBOULE}`;
export const MainShapeLayer = JOLIEBOULE;

export const Orbiter1 = "Orbiter.1";
export const Orbiter2 = "Orbiter.2";

export const TOP = {
  _: "[T]",
  orbe: {
    _: "[T].orbe",
    path: "[T].orbe.path",
    gradientFill: "[T].orbe.gradFill",
  },
  dome: {
    _: "[T].dome",
    front: "[T].dome.Front",
    main: {
      _: "[T].dome.main",
      body: "[T].dome.main.body",
      mask: "[T].dome.main.mask",
      mergePaths: "[T].dome.main.mergePaths",
    },
    mergePaths: "[T].dome.mergePaths",
    fill: "[T].dome.fill"
  }
}

export const BOTTOM = {
  _: "[B]",
  body: "[B].body",
  orbe: {
    _: "[B].orbe",
    path: "[B].orbe.path",
    gradientFill: "[B].orbe.gradFill",
  },
  dome: {
    _: "[B].dome",
    front: "[B].dome.Front",
    main: {
      _: "[B].dome.main",
      body: "[B].dome.main.body",
      mask: "[B].dome.main.mask",
      mergePaths: "[B].dome.main.mergePaths",
    },
    mergePaths: "[B].dome.mergePaths",
    fill: "[B].dome.fill"
  }
}

export const BODY = {
  _: "body",
  stroke: "body.stroke",
  bottom: {
    _: "body.[U]",
    back: "body.[U].back",
    main: "body.[U].main",
    body: {
      _: "body.[U].body",
      mask: "body.[U].body.mask",
    },
    merge: "body.[U].body.Merge",
    gradientFill: "body.[U].body.gradFill",
  },
  top: {
    _: "body.[O]",
    hole: {
      _: "body.[O].hole",
      fill: "body.[O].hole.fill",
    },
    main: {
      _: "body.[O].main",
      fill: "body.[O].main.fill",
      stroke: "body.[O].main.stroke"
    }
  }
}

export const REFLECTION = {
  _: "reflection",
  path: "reflection.path",
  trimPath: "reflection.trimPath",
  stroke: "reflection.stroke"
}

export const CTRL_MENU_IDS = {
  transform: {
    positionOffset: 2
  },
  dynamics: {
    rotation: {
      x: 6, y: 7
    }
  },
  design: {
    size: 11,
    head: {
      enabled: 13,
      offset: 14,
      wiggle: {
        frequency: 16,
        amplitude: 17
      }
    },
    stroke: {
      color: 21,
      width: 22
    },
    dome: {
      enabled: 25,
      color: 26,
      opacity: 27,
      reflection: {
        width: 29,
        opacity: 30
      }
    },
    hole: {
      size: 34,
      color: 35
    },
  },
}

