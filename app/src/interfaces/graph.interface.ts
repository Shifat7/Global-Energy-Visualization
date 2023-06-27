interface IDimensionsMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
interface IDimensions {
  width: number;
  height: number;
  margin: IDimensionsMargin;
}
interface IGraph {
  dimensions: IDimensions;
}

export type { IGraph, IDimensions, IDimensionsMargin };
