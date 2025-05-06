import { MaxEffectsMatchNames } from "./MaxEffectsMatchNames";

export const MaxEffectGroup = {
  layer: {} as Layer,
  effectGroup: {},

  addTo: function (layer: Layer) {
    this.layer = layer;
    return this;
  },

  new: function () {
    const group = this.layer.property(
      MaxEffectsMatchNames.parade,
    ) as PropertyGroup;

    return this;
  },

  build: function () {
    return this.effectGroup;
  },
};

