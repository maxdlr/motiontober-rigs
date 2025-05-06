import { MaxLayerStylesBevelEmboss } from "../../../../MaxFrame/MaxLayerStyles";

export const makeBevelEmbossGroup = (layer: Layer) => {
  MaxLayerStylesBevelEmboss.addTo(layer).new();
};
