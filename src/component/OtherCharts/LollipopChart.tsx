import { View, PanResponder, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH } from '../../utils/constants';
import type { ChartData, LollipopChartProps, DataPoint } from '../../interfaces/types';
import Svg, { Circle, G, Line, Text } from 'react-native-svg';

const LollipopChart: React.FC<LollipopChartProps> = ({ name, data }) => {
  const chartWidth: number = CHART_WIDTH;
  const chartHeight: number = CHART_HEIGHT;
  const chartPadding: number = CHART_PADDING;

  const maxY: number = Math.max(...data.map(v => v.value));

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const offsetRefX = useRef(0);
  const offsetRefY = useRef(0);
  let pointsArray: { label: string, value: number, exactValue: number }[] = [];
  data.map((v, i) => {
    const x = ((chartWidth) / maxY) * v.value;
    console.log(x);
    pointsArray.push({ label: v.label, value: x, exactValue: v.value });
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (event.nativeEvent.touches.length >= 2) {
        } else {
          const newOffsetX = Math.max(0, Math.min(chartWidth, offsetRefX.current - gestureState.dx));
          const newOffsetY = Math.max(0, Math.min(chartHeight, offsetRefY.current - gestureState.dy));
          setOffsetX(newOffsetX);
          setOffsetY(newOffsetY);
        }

      },
      onPanResponderRelease: (event, gestureState) => {
        offsetRefX.current = Math.max(0, Math.min(chartWidth, offsetRefX.current - gestureState.dx));
        offsetRefY.current = Math.max(0, Math.min(chartHeight, offsetRefY.current - gestureState.dy));
      },
    })
  ).current;

  const colorArray: string[] = ["#FF5733", "#33FF57", "#071b76ff", "#F333FF", "#4d0840ff", "#f71c27ff"];
  return (
    <View style={[
      StyleSheet.absoluteFill,
      { alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' },
    ]}>
      <View {...panResponder.panHandlers} style={{ backgroundColor: 'red' }}>
        <Svg key={1000} height={chartHeight} width={chartWidth} viewBox={`${offsetX} ${offsetY} 450 450`} style={{ backgroundColor: 'white' }}>
          <G transform="translate(0,60)">
            <Text
              x={chartWidth / 2}
              y={30}
              fontSize="18"
              fontWeight="bold"
              fill="black"
              textAnchor="middle"
            >
              Monthly Sales Report
            </Text>
          </G>
          <G transform="translate(0,100)">
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