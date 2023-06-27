import React, { useEffect } from 'react';
import { Container } from './styles';
import { IGraphLine } from './line.interface';
import Graph from './components/graph';
import Line from './components/line';
import Circle from './components/circle';
import GraphText from './components/text';
import GraphAxis from './components/axis';
import GraphKey from './components/key';

import './styles.scss';

function D3Line(props: IGraphLine) {
  const { dimensions, data, formData, formControls } = props;

  const svgRef = React.createRef<SVGSVGElement>();

  // eslint-disable-next-line comma-spacing
  const memoizeGraphComponent = <T,>(f: T) => {
    return React.useMemo(() => f, []);
  };

  const graph = memoizeGraphComponent<Graph>(new Graph(svgRef, dimensions, formData, formControls));
  const line = memoizeGraphComponent<Line>(new Line(graph));
  const circle = memoizeGraphComponent<Circle>(new Circle(graph));
  const graphKey = memoizeGraphComponent<GraphKey>(new GraphKey(graph));
  const graphText = memoizeGraphComponent<GraphText>(new GraphText(graph));
  const graphAxis = memoizeGraphComponent<GraphAxis>(new GraphAxis(graph));

  useEffect(() => {
    graph.draw();
  }, []);

  const handleNewLines = () => {
    const { chartGroup } = graph.getGraphRef();
    // remove all lines
    for (const countryCode of formData.iso_code) {
      line.remove(countryCode);
      chartGroup.selectAll(`.circle-${countryCode}`).remove();
      chartGroup.selectAll(`.text-${countryCode}`).remove();
    }

    // add each country as a line
    for (const series of data) {
      line.add(series);
    }
  };

  useEffect(() => {
    // guard against no values being input
    if (!data) {
      return;
    }

    // mandatory to update the reference of the graph svg so everything can still target it
    graph.ref = svgRef;

    // update the resource in case it changed as well
    graph.resource = formData.resource;

    // update the form controls
    graph.formControls = formControls;

    // handle new and removed countries that were added to the form
    handleNewLines();

    // update all the existing data
    line.update(data);
    circle.update(data);
    graphAxis.update(data, [formData.minYear, formData.maxYear]);
    graphKey.update(data);
    // loop through each series
    for (const series of data) {
      const isoCode = series[0].iso_code;
      if (!formControls.text) {
        // if theres no form control data for this, draw the text
        graphText.updateOne(data, series);
      } else if (formControls.text && formControls.text[isoCode]) {
        // if theres form control data for this, draw based on the value of the control
        graphText.updateOne(data, series);
      }
    }
    // graphText.update(data);
  }, [data, formData, formControls]);

  return (
    <Container>
      <svg ref={svgRef} />
    </Container>
  );
}

export default D3Line;
