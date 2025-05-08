import { MainController, MainShapeLayer } from "./enums/maxOrbeNames";
import { makeController, makeOrbiters } from "./layers/maxorbe-null";
import { makeJolieBouleShapeLayer } from "./layers/maxorbe-shapes";

export const version = 0;


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
  const orbiters: Layer[] = makeOrbiters(controller, comp);

  stageUp(app, orbiters, shapeLayer, controller);

  app.endUndoGroup();
};

const stageUp = (app: Application, orbiters: Layer[], shapeLayer: ShapeLayer, controller: Layer): void => {
  controller.moveBefore(shapeLayer);
  shapeLayer.selected = true;
  app.executeCommand(2771);
  app.executeCommand(2771);

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

  controller.selected = true;

}
