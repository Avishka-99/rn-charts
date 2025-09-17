import { View, StyleSheet, PanResponder, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,

} from 'react-native-svg';
import type { ChartData, DataPoint } from '../interfaces/types';
import { Colors } from '../utils/enums';

const LineChart: React.FC<ChartData> = ({ name, values }) => {
    const chartWidth: number = 400;
    const chartHeight: number = 200;
    const chartPadding: number = 30;

    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const offsetRefX = useRef(0); // for PanResponder
    const offsetRefY = useRef(0); // for PanResponder
    const pan = useRef(new Animated.ValueXY()).current;
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

    const maxY = Math.max(...values.flat().map(v => v.y));
    const minY = Math.min(...values.flat().map(v => v.y));
    const chartDataPoints: DataPoint[][] = [];
    const yAxisPoints: DataPoint[] = [];

    const colorArray: string[] = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5", "#F5FF33"];

    let pointsArray: string[] = [];
    values.map(chartValues => {
        let points: string = "";
        let dataPointArray: DataPoint[] = [];
        chartValues.map((v, i) => {
            const x = (i / (chartValues.length - 1)) * (chartWidth - 10 - chartPadding) + chartPadding;
            if (Math.abs(minY) > maxY) {
                const y = ((chartHeight - chartPadding) - (v.y / Math.abs(minY)) * (chartHeight - 10 - chartPadding));
                const chartDataPoint: DataPoint = {
                    values: { x: String(x), y }
                };
                dataPointArray.push(chartDataPoint);
                points = points.concat(` ${x},${y}`);
            } else {
                const y = ((chartHeight - chartPadding) - (v.y / maxY) * (chartHeight - 10 - chartPadding));
                const chartDataPoint: DataPoint = {
                    values: { x: String(x), y }
                };
                dataPointArray.push(chartDataPoint);
                points = points.concat(` ${x},${y}`);
            }
        });
        pointsArray.push(points);
        chartDataPoints.push(dataPointArray);

    });

    for (let i: number = 0; i < 5; i++) {
        if (Math.abs(minY) >= maxY) {
            const yAxisPoint: DataPoint = {
                values: { x: "0", y: ((chartHeight - chartPadding) - (i / 4) * (chartHeight - 10 - chartPadding)), label: String(((i / 4) * Math.abs(minY)).toFixed(0)) }
            };
            yAxisPoints.push(yAxisPoint);

            const yAxisPointNeg: DataPoint = {
                values: { x: "0", y: ((chartHeight - chartPadding) + (i / 4) * (chartHeight - 10 - chartPadding)), label: String(-((i / 4) * Math.abs(minY)).toFixed(0)) }
            };
            yAxisPoints.push(yAxisPointNeg);
        } else {
            const yAxisPoint: DataPoint = {
                values: { x: "0", y: ((chartHeight - chartPadding) - (i / 4) * (chartHeight - 10 - chartPadding)), label: String(((i / 4) * Math.abs(maxY)).toFixed(0)) }
            };
            yAxisPoints.push(yAxisPoint);

            const yAxisPointNeg: DataPoint = {
                values: { x: "0", y: ((chartHeight - chartPadding) + (i / 4) * (chartHeight - 10 - chartPadding)), label: String(-((i / 4) * Math.abs(maxY)).toFixed(0)) }
            };
            yAxisPoints.push(yAxisPointNeg);
        }

    }
    return (
        <View style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
        ]}>
            <View {...panResponder.panHandlers} style={{ backgroundColor: 'red' }}>
                <Svg key={1000} height={chartHeight} width={chartWidth} viewBox={`${offsetX} ${offsetY} 300 300`} style={{ backgroundColor: 'white' }}>
                    <G transform="translate(0,100)">
                        <Polyline
                            key={"axis"}
                            points={`${chartPadding},0 ${chartPadding},${chartHeight - chartPadding} ${chartWidth + chartPadding},${chartHeight - chartPadding}`}
                            fill="none"
                            stroke={Colors.axis}
                            strokeWidth="2"
                        />
                        {yAxisPoints.map((points, index) =>
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
                                    key={"data-line-" + index}
                                    points={points}
                                    fill="none"
                                    stroke={colorArray[index]}
                                    strokeWidth={2}
                                />
                            )
                        })}

                        {chartDataPoints.map((points, index) =>
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

                        )}
                    </G>
                </Svg>
            </View>
        </View>
    )
}

export default LineChart;