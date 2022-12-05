/**
 * @description
 *
 * @example
 * const nodeA = '1'
 * const nodeB = '2'
 * getUnequalValue('1', nodeA, nodeB) === '2'
 */
export const getUnequalValue = (value: any, itemA: any, itemB: any) => {
  return value === itemA || value === itemB;
};
