import _ from "lodash";

const base: { [key: string]: string } = {
  mtb: "mtb",
  motiontober: "motiontober",
  fullname: "motiontober rigs"
}

export const MTB_RIGS_NAMES = {
  ORG: _.upperFirst(base.mtb),
  FULL_ORG: _.upperFirst(base.motiontober),
  EXTENSION_NAME: _.upperFirst(base.fullname),
  EXTENSION_IDENTIFIER: _.kebabCase(base.fullname)
}
