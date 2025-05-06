import { ValueAndExpressionSet } from "../MaxTypes";

export const setPropertyValueAndExpression = (
  propertyGroup: PropertyGroup,
  propertyMatchName: string,
  valueOrExpression: ValueAndExpressionSet,
) => {

  try {
    const property = propertyGroup.property(
      propertyMatchName,
    ) as ShapePropertyType;

    if (!property) {
      alert("Cannot find property : " + propertyMatchName)
      return;
    }

    if (valueOrExpression.expression) {
      property.expression = valueOrExpression.expression;
    }

    if (valueOrExpression.value) {
      property.setValue(valueOrExpression.value);
    }

  } catch (error) {
    alert(error)
  }
};
