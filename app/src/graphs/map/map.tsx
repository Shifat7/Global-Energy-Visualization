import React, { useEffect } from 'react';
import { Container } from './styles';
import { IGraphMap } from './map.interface';
import Graph from './components/graph';
import * as d3 from 'd3';
import './styles.scss';

function D3Map(props: IGraphMap) {
  const { dimensions, data, formData, formControls } = props;

  const svgRef = React.createRef<SVGSVGElement>();

  // eslint-disable-next-line comma-spacing
  const memoizeGraphComponent = <T,>(f: T) => {
    return React.useMemo(() => f, []);
  };

  const graph = memoizeGraphComponent<Graph>(new Graph(svgRef, dimensions, formData, formControls));
  // const graphMap = memoizeGraphComponent<GraphMap>(new GraphMap(graph));

  useEffect(() => {
    graph.draw(data);
  }, []);

  function getMinMax(data: any, prop: string) {
    let max: number = 0;
    let min: number = 10;

    for (let j = 0; j < data.length; j++) {
      if (parseInt(data[j].properties[prop]) > (max)) {
        max = parseInt(data[j].properties[prop]);
      }
    }

    for (let i = 0; i < data.length; i++) {
      if (parseInt(data[i].properties[prop]) < (min) && (parseInt(data[i].properties[prop])) !== 0) {
        min = parseInt(data[i].properties[prop]);
      }
    }

    return [min, max]
  }

  useEffect(() => {
    // mandatory to update the reference of the graph svg so everything can still target it
    graph.ref = svgRef;

    // update the resource in case it changed as well
    graph.resource = formData.resourceType;

    // update the form controls
    graph.formControls = formControls;

    const ranges = getMinMax(data, graph.resource);

    const tooltip = d3.select('.tooltip-area')
      .style('opacity', 0);
    graph.mapDraw(data, ranges, tooltip);

    // graphMap.update(data);
  }, [data, formData, formControls]);

  return (
    <Container>

      <svg ref={svgRef}>
      </svg>
    </Container>
  );
}

export default D3Map;
