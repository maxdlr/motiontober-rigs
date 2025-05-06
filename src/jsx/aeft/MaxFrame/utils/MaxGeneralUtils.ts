import { ValueAndExpressionSet } from "../MaxTypes";

export const setPropertyValueAndExpression = (
  propertyGroup: any,
  propertyMatchName: string,
  valueOrExpression: ValueAndExpressionSet,
) => {

  try {
    const property = propertyGroup.property(
      propertyMatchName,
    );

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

/**
 * Converts the first character of `string` to upper case and the remaining to lower case.
 * 
 * @param {string} string - The string to convert.
 * @returns {string} Returns the capitalized string.
 * @example
 */
export const upperFirst = (string: string): string => {
  if (!string || string.length === 0) {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Converts string to kebab case.
 * 
 * @param {string} string - The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 */
export const kebabCase = (string: string): string => {
  // Return empty string for null, undefined, or empty strings
  if (!string) {
    return '';
  }

  return string
    .replace(/[^\w\s]/g, ' ')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ')
    .toLowerCase().replace(/\s/g, '-');
}
