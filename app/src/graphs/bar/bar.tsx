import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { Container } from './styles';
import { IGraphBar } from './bar.interface';
import Graph from './components/graph';
import Bar from './components/bar';
import Text from './components/text';
import GraphAxis from './components/axis';
import { getMinMax } from '../util/scales';
import { IDataPointWithValue } from '../line/line.interface';

function D3Bar(props: IGraphBar) {
  const { dimensions, data, formData, formControls } = props;

  const svgRef = React.createRef<SVGSVGElement>();

  // eslint-disable-next-line comma-spacing
  const memoizeGraphComponent = <T,>(f: T) => {
    return React.useMemo(() => f, []);
  };

  const graph = memoizeGraphComponent<Graph>(new Graph(svgRef, dimensions, formData, formControls));
  const bar = memoizeGraphComponent<Bar>(new Bar(graph));
  const text = memoizeGraphComponent<Text>(new Text(graph));
  const axis = memoizeGraphComponent<GraphAxis>(new GraphAxis(graph));

  useEffect(() => {
    graph.draw();
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    // mandatory to update the reference of the graph svg so everything can still target it
    graph.ref = svgRef;

    // update the resource in case it changed as well
    graph.resource = formData.resource;

    // update the form controls
    graph.formControls = formControls;

    if (formControls.sort === 'ascending') {
      data.sort((a: IDataPointWithValue, b: IDataPointWithValue) => {
        const test = d3.ascending(a[graph.resource], b[graph.resource]);
        return test;
      });
    } else {
      data.sort((a: IDataPointWithValue, b: IDataPointWithValue) => {
        const test = d3.ascending(b[graph.resource], a[graph.resource]);
        return test;
      });
    }

    bar.update(data);
    text.update(data, bar.barWidth, bar.barPadding);
    const { smallestValue, biggestValue } = getMinMax(graph.resource, data);
    axis.update(data, [smallestValue, biggestValue]);

    // update the style of the text to hide and show based on form controls
    if (formControls.text) {
      for (const country of Object.keys(formControls.text)) {
        // if its not in the data, then show it
        if (typeof formControls.text[country] !== 'boolean') {
          d3.select(`.${graph.resource}-${country}-text`).style('visibility', 'visible');
          continue;
        }
        // show if its true, else hide it
        if (formControls.text[country]) {
          d3.select(`.${graph.resource}-${country}-text`).style('visibility', 'visible');
        } else {
          d3.select(`.${graph.resource}-${country}-text`).style('visibility', 'hidden');
        }
      }
    }
  }, [data, formData, formControls]);

  return (
    <Container>
      <svg ref={svgRef} />
    </Container>
  );
}

export default D3Bar;
