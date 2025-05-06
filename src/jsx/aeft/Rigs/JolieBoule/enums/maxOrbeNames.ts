// export const MTB_RIGS_NAMES = "Mtb";

import { MTB_RIGS_NAMES } from "../../enums/MtbRigsNames";

// export const ORG_FULLNAME = "Motiontober";
export const RIG_NAME = "JolieBoule";

export const MainIdentifier = `${MTB_RIGS_NAMES.ORG.toLowerCase()}-${RIG_NAME.toLowerCase()}`
export const MainController = `[CTRL] - ${RIG_NAME}`;
export const MainPseudoEffect = `${MTB_RIGS_NAMES.ORG} - ${RIG_NAME}`;
export const MainShapeLayer = RIG_NAME;

export const Leg1 = "Leg - 1";
export const Leg2 = "Leg - 2";

export const TOP = {
  _: "Top",
  orbe: {
    _: "Top - Orbe",
    path: "Top - Orbe - Path",
    gradientFill: "Top - Orbe - Gradient Fill",
  },
  dome: {
    _: "Top - Dome",
    front: "Top - Dome - Front",
    main: {
      _: "Top - Dome - Main",
      body: "Top Dome - Main - Body",
      mask: "Top Dome - Main - Mask",
      mergePaths: "Top - Dome - Main - Merge Paths",
    },
    mergePaths: "Top - Dome - Merge Paths",
    fill: "Top - Dome - Fill"
  }
}

export const BOTTOM = {
  _: "Bottom",
  body: "Bottom - Body",
  orbe: {
    _: "Bottom - Orbe",
    path: "Bottom - Orbe - Path",
    gradientFill: "Bottom - Orbe - Gradient Fill",
  },
  dome: {
    _: "Bottom - Dome",
    front: "Bottom - Dome - Front",
    main: {
      _: "Bottom - Dome - Main",
      body: "Bottom - Dome - Main - Body",
      mask: "Bottom - Dome - Main - Mask",
      mergePaths: "Bottom - Dome - Main - Merge Paths",
    },
    mergePaths: "Bottom - Dome - Merge Paths",
    fill: "Bottom - Dome - Fill"
  }
}

export const BODY = {
  _: "Body",
  stroke: "Body - Stroke",
  bottom: {
    _: "Body - Bottom",
    back: "Body - Bottom - Back",
    main: "Body - Bottom - Main",
    body: {
      _: "Body - Bottom - Body",
      mask: "Body - Bottom - Body - Mask",
    },
    merge: "Body - Bottom - Body - Merge",
    gradientFill: "Body - Bottom - Body - Gradient Fill",
  },
  top: {
    _: "Body - Top",
    hole: {
      _: "Body - Top - Hole",
      fill: "Body - Top - Hole - Fill",
    },
    main: {
      _: "Body - Top - Main",
      fill: "Body - Top - Main - Fill",
      stroke: "Body - Top - Main - Stroke"
    }
  }
}

export const REFLECTION = {
  _: "Reflection",
  path: "Reflection - Path",
  trimPath: "Reflection - Trim Path",
  stroke: "Reflection - Stroke"
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
    stroke: {
      color: 13,
      width: 14
    },
    dome: {
      enabled: 17,
      color: 18,
      opacity: 19,
      reflection: {
        width: 21,
        opacity: 22
      }
    },
    hole: {
      size: 26,
      color: 27
    },
    head: {
      enabled: 30,
      offset: 31,
      wiggle: {
        frequency: 33,
        amplitude: 34
      }
    }
  },
}

export const CTRL_MENU = {
  transform: {
    _: "Transform",
    positionOffset: {
      id: 2,
    },
  },
  design: {
    _: "Design",
    size: "body.size",
    stroke: {
      _: "stroke",
      color: "body.stroke.color",
      width: "body.stroke.width"
    },
    dome: {
      _: "Dome",
      enabled: "Active Top Dome",
      color: "body.dome.color",
      opacity: "body.dome.opacity",
      reflection: {
        width: "reflection.stroke.width"
      }
    },
    hole: {
      _: "Hole",
      size: "body.hole.size",
      color: "body.hole.color"
    },
    head: {
      _: "Head",
      enabled: "Active mini-orbe",
      offset: "body.orbe.offset",
      wiggle: {
        frequency: "body.orbe.wiggle.freq",
        amplitude: "body.orbe.wiggle.amp"
      }
    }
  },
  dynamics: {
    _: "Dynamics",
    rotation: {
      x: "body.rot.x",
      y: "body.rot.y"
    }
  }
}

// export const CTRL_MENU = {
//   transform: {
//     _: "Transform",
//     positionOffset: "Anchor Offset",
//     legs: {
//       _: "Legs",
//       offset: "body.leg.offset"
//     }
//   },
//   design: {
//     _: "Design",
//     size: "body.size",
//     stroke: {
//       _: "stroke",
//       color: "body.stroke.color",
//       width: "body.stroke.width"
//     },
//     dome: {
//       _: "Dome",
//       enabled: "Active Top Dome",
//       color: "body.dome.color",
//       opacity: "body.dome.opacity",
//       reflection: {
//         width: "reflection.stroke.width"
//       }
//     },
//     hole: {
//       _: "Hole",
//       size: "body.hole.size",
//       color: "body.hole.color"
//     },
//     head: {
//       _: "Head",
//       enabled: "Active mini-orbe",
//       offset: "body.orbe.offset",
//       wiggle: {
//         frequency: "body.orbe.wiggle.freq",
//         amplitude: "body.orbe.wiggle.amp"
//       }
//     }
//   },
//   dynamics: {
//     _: "Dynamics",
//     rotation: {
//       x: "body.rot.x",
//       y: "body.rot.y"
//     }
//   }
// }
