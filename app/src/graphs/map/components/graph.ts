import React from 'react';
import * as d3 from 'd3';
import { IDataPointQueryable } from '../../../interfaces/dataPoint.interface';
import IDrawableGraph from '../../../interfaces/drawableGraph.interface';
import { IDimensions, IDimensionsMargin } from '../../../interfaces/graph.interface';
import Base from '../../base';
import { colorBasic } from '../../util/colors';
import { IGraphControlFormProps } from '../map.interface';
import { geoPath, geoMercator, scaleLinear, GeoPermissibleObjects } from 'd3';
type D3Target = React.RefObject<SVGSVGElement>;
// import { MinMaxMap } from '../../util/scales';

class Graph extends Base implements IDrawableGraph<any, IGraphControlFormProps> {
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
    this._resource = formData.resourceType as keyof IDataPointQueryable;
    this._formControls = formControls;
    this._margin = dimensions.margin;
    this._width = dimensions.width;
    this._height = dimensions.height;
    this._svgHeight = this._height + this._margin.top + this._margin.bottom;
    this._svgWidth = this._width + this._margin.left + this._margin.right;
  }

  draw(data: any) {
    // create basic background
    // eslint-disable-next-line no-unused-vars
    const svg = d3
      .select(this.ref.current)
      .attr('width', this._width)
      .attr('height', this._height)
      .attr('style', 'background-color: #368DC5;');
  }

  mapDraw(data: any, ranges: number[], tooltip: any) {
    const { svg } = this.getGraphRef();

    // projects geo-coordinates on to a 2D plane
    const projection = geoMercator()
      .scale(160)
      .center([-4, 30])
      .translate([this._width / 2 - 10, this._height / 2]);

    // takes geojson data,
    // transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection);

    const colorScale = scaleLinear<string, number>()
      .domain(ranges)
      .range(['#FFC100', '#FF4D00']);

    const mousemove = (event: any, feature: any) => {
      const [x, y] = d3.pointer(event);
      const energy = (feature).properties[this._resource];

      const text = d3.select('.tooltip-area-text');
      text.text(`Country: ${(feature).properties.name} ` + `Energy: ${energy} TWh`);

      tooltip
        .attr('transform', `translate(${x}, ${y})`);

      text
        .attr('transform', `translate(${x - 250}, ${y})`);
    };

    const mouseover = () => {
      tooltip.style('opacity', 1);
    };

    const mouseleave = () => {
      tooltip.style('opacity', 0);
    }

    // render each country
    svg
      .selectAll('.country')
      .data(data)
      .join('path')
      .attr('class', 'country')
      .attr('fill', (feature: any) => (feature).properties[this._resource] > 0 ? colorScale((feature).properties[this._resource]) : 'Silver')
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
      .on('mouseover', mouseover)
      .attr('d', feature => pathGenerator(feature as GeoPermissibleObjects));

    svg
      .append('g')
      .attr('class', 'tooltip-area')
      .append('text')
      .attr('class', 'tooltip-area-text')
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

  // unnecessary getters
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
