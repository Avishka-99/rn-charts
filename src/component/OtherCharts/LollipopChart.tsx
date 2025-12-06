import { View } from 'react-native';
import React from 'react';
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH } from '../../utils/constants';
import type { LollipopChartProps } from '../../interfaces/types';
import Svg, { Circle, G, Line, Text } from 'react-native-svg';

const LollipopChart: React.FC<LollipopChartProps> = ({ name, subtitle, data }) => {
  const chartWidth: number = CHART_WIDTH;
  const chartHeight: number = CHART_HEIGHT;
  const chartPadding: number = CHART_PADDING;

  if(data.length===0){
        throw new Error("Data array cannot be empty");
    }
    if(data.length>16){
        throw new Error("Lolipop chart currently supports a maximum of 16 items");
    }

  const maxY: number = Math.max(...data.map(v => v.value));

  let pointsArray: { label: string, value: number, exactValue: number }[] = [];
  data.map((v, _i) => {
    const x = ((chartWidth-100) / maxY) * v.value;
    pointsArray.push({ label: v.label, value: x, exactValue: v.value });
  });


  const colorArray: string[] = ["#FF5733", "#33FF57", "#071b76ff", "#F333FF", "#4d0840ff", "#f71c27ff"];
  return (
    <View style={[
      { alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' },
    ]}>
      <View style={{ backgroundColor: 'red' }}>
        <Svg key={1000} height={chartHeight} width={chartWidth} viewBox={`0 0 450 450`} style={{ backgroundColor: 'white' }}>
          <G transform="translate(0,60)">
            <Text
              x={chartWidth / 2}
              y={30}
              fontSize="18"
              fontWeight="bold"
              fill="black"
              textAnchor="middle"
            >
              {name}
            </Text>
            <Text
              x={chartWidth / 2}
              y={50}
              fontSize="15"
              fontWeight="bold"
              fill="black"
              textAnchor="middle"
            >
              {subtitle}
            </Text>
          </G>
          <G transform="translate(0,120)">
            <React.Fragment>
              {pointsArray.map((points, index) => {
                return (
                  <React.Fragment key={index + "group"}>
                    <Line
                      key={index + "x-dash"}
                      x1={chartPadding}
                      y1={(index + 1) * 20}
                      x2={points.value + chartPadding}
                      y2={(index + 1) * 20}
                      stroke={colorArray[index % 6]}
                      strokeWidth={2}
                    />
                    <Circle
                      key={index * 100}
                      cx={points.value + chartPadding}
                      cy={(index + 1) * 20}
                      r="5"
                      stroke={colorArray[index % 6]}
                      fill={colorArray[index % 6]}
                    />
                    <Text
                      x={points.value + chartPadding + 10}
                      y={(index + 1) * 20 + 4}
                      textAnchor='start'
                      fontWeight={600}
                    >
                      {points.label}{`(${points.exactValue})`}
                    </Text>
                  </React.Fragment>
                )
              })}
            </React.Fragment>
          </G>
        </Svg>
      </View>
    </View>
  );
}

export default LollipopChart;