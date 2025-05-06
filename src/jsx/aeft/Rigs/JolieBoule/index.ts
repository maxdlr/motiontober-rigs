import { MainController, MainShapeLayer } from "./enums/maxOrbeNames";
import { makeController, makeOrbiters } from "./layers/maxorbe-null";
import { makeJolieBouleShapeLayer } from "./layers/maxorbe-shapes";

export const createJolieBoule = () => {
  const comp: CompItem | undefined =
    (app.project.activeItem as CompItem) ?? undefined;

  if (!comp) {
    alert("Please select a composition", `${MainShapeLayer} - No composition selected !`);
    return;
  }

  app.beginUndoGroup(MainShapeLayer);
  const controller: Layer = makeController(comp);
  const shapeLayer: ShapeLayer = makeJolieBouleShapeLayer(controller, comp);

  controller.moveBefore(shapeLayer);
  shapeLayer.selected = true;
  app.executeCommand(2771);
  app.executeCommand(2771);

  app.endUndoGroup();

  //   const confirmed = confirm(`Optionnally, you can add rigged hip joints.
  //
  // These joints are just guide layers that you hook onto to make things "turn around" the main rig.`, false, `${MainShapeLayer} - Options`);

  if (true) {
    app.beginUndoGroup(MainController);
    const orbiters: Layer[] = makeOrbiters(controller, comp);

    for (const orbiter of orbiters) {
      orbiter.moveAfter(shapeLayer);
    }

    for (const layer of [...orbiters, shapeLayer]) {
      for (const prop of layer.selectedProperties) {
        prop.selected = false;
      }
      layer.selected = false;
    }

    orbiters[0].moveBefore(orbiters[1]);

    app.endUndoGroup();
  }

  controller.selected = true;
};
