import { MaxLayerStylesMatchNames } from "./ADBE-match-names/MaxLayerStylesMatchNames";

export const MaxLayerStylesBevelEmboss = {
  layer: {} as Layer,

  addTo: function (layer: Layer) {
    this.layer = layer;
    return this;
  },

  new: function () {
    const layerStyleGroup = this.layer.property(
      MaxLayerStylesMatchNames.group,
    ) as PropertyGroup;

    const bevelEmboss = layerStyleGroup.property(
      MaxLayerStylesMatchNames.bevelEmboss.enabled
    ) as PropertyGroup;

    return this;
  },
};