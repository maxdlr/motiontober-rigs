import { kebabCase, upperFirst } from "../../MaxFrame/utils/MaxGeneralUtils"

const base: { [key: string]: string } = {
  mtb: "mtb",
  motiontober: "motiontober",
  fullname: "motiontober rigs"
}

export const MTB_RIGS_NAMES = {
  ORG: upperFirst(base.mtb),
  FULL_ORG: upperFirst(base.motiontober),
  EXTENSION_NAME: upperFirst(base.fullname),
  EXTENSION_IDENTIFIER: kebabCase(base.fullname)
}
