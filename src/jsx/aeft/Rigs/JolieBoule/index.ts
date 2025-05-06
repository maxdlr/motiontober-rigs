import { MainShapeLayer, MainController } from "./enums/maxOrbeNames";
import { makeController } from "./layers/maxorbe-null";
import { makeMaxOrbeShapeLayer, makeLegs } from "./layers/maxorbe-shapes";

export const createJolieBoule = () => {
  const comp: CompItem | undefined =
    (app.project.activeItem as CompItem) ?? undefined;

  if (!comp) {
    alert("Please select a composition", `${MainShapeLayer} - No composition selected !`);
    return;
  }

  app.beginUndoGroup(MainShapeLayer);

  const controller: Layer = makeController(comp);

  makeMaxOrbeShapeLayer(controller, comp);

  app.endUndoGroup();

  const confirmed = confirm(`Optionnally, you can add rigged hip joints.

These joints are just guide layers that you hook onto to make things "turn around" the main rig.`, false, `${MainShapeLayer} - Options`)

  if (confirmed) {
    app.beginUndoGroup(MainController);
    makeLegs(controller, comp);
    app.endUndoGroup();
  }

};
