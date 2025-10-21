import type { BarChartProps, DataPoint } from '../../interfaces/types';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';
import React, { useRef, useState } from 'react';
import Svg, { G, Text, Rect } from 'react-native-svg';
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH, BAR_WIDTH } from "../../utils/constants";

const BarChart: React.FC<BarChartProps> = ({ name, data }) => {
    const chartWidth: number = CHART_WIDTH;
    const chartHeight: number = CHART_HEIGHT;
    const chartPadding: number = CHART_PADDING;

    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const offsetRefX = useRef(0);
    const offsetRefY = useRef(0);

    const maxY: number = Math.max(...data.map(v => v.value));
    const xAxisLength: number = data.length * (BAR_WIDTH + 10) + 10;


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


    let pointsArray: { label: string, value: number, exactValue: number }[] = [];
    data.map((v, i) => {
        const x = (i / (data.length - 1)) * (chartWidth - 10 - chartPadding) + chartPadding;
        const y = ((chartHeight - chartPadding) - (v.value / maxY) * (chartHeight - 10 - chartPadding));
        pointsArray.push({ label: v.label, value: y, exactValue: v.value });
    });


    return (
        <View style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' },
        ]}>
            <View {...panResponder.panHandlers} style={{ backgroundColor: 'red' }}>
                <Svg key={1000} height={chartHeight} width={chartWidth} viewBox={`${offsetX} ${offsetY} 500 500`} style={{ backgroundColor: 'white' }}>
                    <G transform="translate(0,100)">
                        {/* <Polyline
                            key={"axis"}
                            points={`${chartPadding},${chartHeight - chartPadding} ${xAxisLength},${chartHeight - chartPadding}`}
                            fill="none"
                            stroke={'black'}
                            strokeWidth="2"
                        /> */}

                        {pointsArray.map((points, index) => {
                            return (
                                <React.Fragment key={index + "group"}>
                                    <Rect
                                        key={index + "bar" + Date.now().toString()}
                                        y={(10 + BAR_WIDTH) * (index + 1) - BAR_WIDTH}
                                        x={20}
                                        height={BAR_WIDTH}
                                        width={points.value === (chartHeight - chartPadding) ? 0 : (chartHeight - chartPadding) - points.value}
                                        stroke="red"
                                        strokeWidth="2"
                                        fill="yellow"
                                        rx={5}
                                        ry={5}
                                    />
                                    <Text x={25 + (points.value === (chartHeight - chartPadding) ? 0 : (chartHeight - chartPadding) - points.value)} y={(10 + BAR_WIDTH) * (index + 1) - (BAR_WIDTH / 2.5)} >
                                        {points.label} - {points.exactValue}
                                    </Text>


                                </React.Fragment>

                            )
                        })}


                        {/* {yAxisPoints.map((points, index) =>
                            < React.Fragment key={index + "group"}>
                                <Line
                                    key={index + "x-dash"}
                                    x1={- 5 + chartPadding}
                                    y1={points?.values?.y}
                                    x2={chartPadding}
                                    y2={points?.values?.y}
                                    stroke="blue"
                                    strokeWidth={2}
                                />
                                <Text x={0} y={`${points?.values?.y + 5}`} color={"blue"} alignmentBaseline='center'>{points?.values?.label}</Text>
                            </React.Fragment>
                        )}
                        {pointsArray.map((points, index) => {
                            return (
                                <Polyline
                                    key={"data-line-" + index + Date.now().toString()}
                                    points={points}
                                    fill="none"
                                    stroke={colorArray[index]}
                                    strokeWidth={2}
                                />
                            )
                        })} */}

                        {/* {chartDataPoints.map((points, index) =>
                            points.map((point, idx) => (
                                < React.Fragment key={index + idx + "group"}>
                                    <Circle
                                        key={index * 100}
                                        cx={point?.values?.x}
                                        cy={point?.values?.y}
                                        r="5"
                                        stroke={colorArray[index]}
                                        fill={colorArray[index]}
                                    />
                                </React.Fragment>
                            ))

                        )} */}
                    </G>
                </Svg>
            </View>
        </View>
    )



}
export default BarChart;