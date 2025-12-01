import { View, StyleSheet, PanResponder } from 'react-native';
import React, { useRef, useState } from 'react';
import Svg, { Circle, G, Text, Line } from 'react-native-svg';
import type { SlopeChartProps, DataPoint } from '../../interfaces/types';
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH } from '../../utils/constants';

const SlopeChart: React.FC<SlopeChartProps> = ({ label_1, label_2, values }) => {
    const chartWidth: number = CHART_WIDTH;
    const chartHeight: number = CHART_HEIGHT;
    const chartPadding: number = CHART_PADDING;

    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const offsetRefX = useRef(0);
    const offsetRefY = useRef(0);
    //const pan = useRef(new Animated.ValueXY()).current;
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
            onPanResponderRelease: (_event, gestureState) => {
                offsetRefX.current = Math.max(0, Math.min(chartWidth, offsetRefX.current - gestureState.dx));
                offsetRefY.current = Math.max(0, Math.min(chartHeight, offsetRefY.current - gestureState.dy));
            },
        })
    ).current;

    const maxY = Math.max(...values.flat().map(v => Math.max(v.y1, v.y2)));
    const minY = Math.min(...values.flat().map(v => Math.min(v.y1, v.y2)));
    const chartDataPoints: DataPoint[][] = [];
    const colorArray: string[] = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5", "#F5FF33"];
    let pointsArray: string[] = [];
    let yAxixValues: number[] = [];
    values.map((chartValues, _i) => {
        //const x = (i / (values.length - 1)) * (chartWidth - 10 - chartPadding) + chartPadding;
        let points: string = "";
        if (Math.abs(minY) > maxY) {
            const y = ((chartHeight - chartPadding) - (chartValues.y1 / Math.abs(minY)) * (chartHeight - 10 - chartPadding));
            const y2 = ((chartHeight - chartPadding) - (chartValues.y2 / Math.abs(minY)) * (chartHeight - 10 - chartPadding));
            const chartDataPoint: DataPoint = {
                values: { x: String(100), y }
            };
            const chartDataPoint2: DataPoint = {
                values: { x: String(300), y: y2 }
            };
            yAxixValues.push(y, y2)
            chartDataPoints.push([chartDataPoint, chartDataPoint2]);
            points = points.concat(`${100},${y}`);
            points = points.concat(` ${300},${y2}`);
            pointsArray.push(points)
        } else {
            const y = ((chartHeight - chartPadding) - (chartValues.y1 / maxY) * (chartHeight - 10 - chartPadding));
            const y2 = ((chartHeight - chartPadding) - (chartValues.y2 / maxY) * (chartHeight - 10 - chartPadding));
            const chartDataPoint: DataPoint = {
                values: { x: String(100), y }
            };
            const chartDataPoint2: DataPoint = {
                values: { x: String(300), y: y2 }
            };
            chartDataPoints.push([chartDataPoint, chartDataPoint2]);
            points = points.concat(`${100},${y}`);
            points = points.concat(` ${300},${y2}`);

            yAxixValues.push(y, y2)

            pointsArray.push(points)
        }
    });


    return (
        <View style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' },
        ]}>
            <View {...panResponder.panHandlers} style={{ backgroundColor: 'red' }}>
                <Svg key={1000} height={chartHeight} width={chartWidth} viewBox={`${offsetX} ${offsetY} 350 350`} style={{ backgroundColor: 'white' }}>
                    <G transform="translate(0,100)">
                        <Text x={70} y={Math.max(...yAxixValues) + 40} color={"blue"}>{label_1}</Text>
                        <Text x={270} y={Math.max(...yAxixValues) + 40} color={"blue"}>{label_2}</Text>
                        <Line
                            key={"slope-y-axis" + Math.random() + Date.now()}
                            x1={100}
                            y1={Math.max(...yAxixValues) + 20}
                            x2={100}
                            y2={Math.min(...yAxixValues) - 20}
                            stroke={'black'}
                            strokeWidth={2}
                        />
                        <Line
                            key={"slope-y-axis-" + Math.random() + Date.now()}
                            x1={300}
                            y1={Math.max(...yAxixValues) + 20}
                            x2={300}
                            y2={Math.min(...yAxixValues) - 20}
                            stroke={'black'}
                            strokeWidth={2}
                        />
                        {pointsArray.map((points, index) =>
                            < React.Fragment key={index + "group"}>
                                <Line
                                    key={index + "x-dash"}
                                    x1={points.split(" ")[0]?.split(",")[0]}
                                    y1={points.split(" ")[0]?.split(",")[1]}
                                    x2={points.split(" ")[1]?.split(",")[0]}
                                    y2={points.split(" ")[1]?.split(",")[1]}
                                    stroke={colorArray[index]}
                                    strokeWidth={2}
                                />
                            </React.Fragment>
                        )}
                        {chartDataPoints.map((points, index) =>
                            points.map((point, idx) => (
                                < React.Fragment key={index + idx + "group"}>
                                    <Circle
                                        key={index * 100}
                                        cx={point?.values?.x}
                                        cy={point?.values?.y}
                                        r="5"
                                        stroke={'black'}
                                        fill={colorArray[index]}
                                    />
                                </React.Fragment>
                            ))

                        )}

                    </G>
                </Svg>
            </View>
        </View>
    )
}

export default SlopeChart;