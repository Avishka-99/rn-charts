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
                    //console.log("zoom")
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

    const maxY = Math.max(...values.map(v => v.y));
    const chartDataPoints: DataPoint[] = [];
    const yAxisPoints: DataPoint[] = [];
    const points = values
        .map((v, i) => {
            const x = (i / (values.length - 1)) * (chartWidth - 10 - chartPadding) + chartPadding;
            const y = ((chartHeight - chartPadding) - (v.y / maxY) * (chartHeight - 10 - chartPadding));
            const chartDataPoint: DataPoint = {
                values: { x: String(x), y }
            };
            chartDataPoints.push(chartDataPoint);
            return `${x},${y}`;
        })
        .join(" ");

    for (let i: number = 0; i < 5; i++) {
        const yAxisPoint: DataPoint = {
            values: { x: "0", y: ((chartHeight - chartPadding) - (i / 4) * (chartHeight - 10 - chartPadding)), label: String(((i / 4) * maxY).toFixed(0)) }
        };
        yAxisPoints.push(yAxisPoint);
    }
    return (
        <View style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
        ]}>
            <View {...panResponder.panHandlers} style={{ backgroundColor: 'red' }}>
                <Svg key={1000} height={chartHeight} width={chartWidth} viewBox={`${offsetX} ${offsetY} 400 400`} style={{ backgroundColor: 'dodgerblue' }}>
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
                        <Polyline
                            key={"data-line"}
                            points={points}
                            fill="none"
                            stroke="green"
                            strokeWidth={2}
                        />
                        {chartDataPoints.map((points, index) =>
                            < React.Fragment key={index + "group"}>
                                <Circle
                                    key={index * 100}
                                    cx={points?.values?.x}
                                    cy={points?.values?.y}
                                    r="5"
                                    stroke="green"
                                    fill="green"
                                />
                            </React.Fragment>

                        )}
                    </G>
                </Svg>
            </View>
        </View>
    )
}

export default LineChart;