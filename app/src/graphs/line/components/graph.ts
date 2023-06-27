/* eslint-disable brace-style */
import React from 'react';
import * as d3 from 'd3';
import { IDataPointQueryable } from '../../../interfaces/dataPoint.interface';
import IDrawableGraph from '../../../interfaces/drawableGraph.interface';
import { IDimensions, IDimensionsMargin } from '../../../interfaces/graph.interface';
import { IDataPointWithValue } from '../../../interfaces/IDataPointWithValue.interface';
import Base from '../../base';
import { colorBasic } from '../../util/colors';
import { IGraphControlFormProps } from '../line.interface';

type D3Target = React.RefObject<SVGSVGElement>;

class Graph
  extends Base
  implements IDrawableGraph<IDataPointWithValue[][], IGraphControlFormProps>
{
  // maybe one day ill support multiple resources but i cant be fucked
  private _resource: any;
  private _width: number;
  private _height: number;
  private _svgWidth: number;
  private _svgHeight: number;
  private _margin: IDimensionsMargin;
  private _formControls: IGraphControlFormProps;
  private _color = colorBasic;

  constructor(
    ref: D3Target,
    dimensions: IDimensions,
    formData: any,
    formControls: IGraphControlFormProps
  ) {
    super(ref);
    this._resource = formData.resource as keyof IDataPointQueryable;
    this._formControls = formControls;
    this._margin = dimensions.margin;
    this._width = dimensions.width;
    this._height = dimensions.height;
    this._svgHeight = this._height + this._margin.top + this._margin.bottom;
    this._svgWidth = this._width + this._margin.left + this._margin.right;
  }

  draw() {
    // create basic background
    const svg = d3
      .select(this.ref.current)
      .attr('width', this._svgWidth)
      .attr('height', this._svgHeight)
      .attr('style', 'background-color: #f5f5f5;');

    // add the chart group container
    svg
      .append('g')
      .attr('id', 'chartGroup')
      .attr('transform', `translate(${this._margin.left}, ${this._margin.top})`)
      .attr('width', this._width)
      .attr('height', this._height);

    svg
      .append('g')
      .attr('id', 'key')
      .attr('transform', `translate(${this.margin.left + this.width}, ${this.margin.top})`);
  }

  set resource(resource: keyof IDataPointQueryable) {
    this._resource = resource;
  }

  set formControls(formControls: IGraphControlFormProps) {
    this._formControls = formControls;
  }

  get formControls() {
    return this._formControls;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get margin() {
    return this._margin;
  }

  get resource() {
    return this._resource;
  }

  get color() {
    return this._color;
  }
}

export default Graph;
