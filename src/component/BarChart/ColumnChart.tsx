import type { ColumnChartData, DataPoint } from '../../interfaces/types';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
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
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH, BAR_WIDTH } from "../../utils/constants";

const ColumnChart: React.FC<ColumnChartData> = ({ name, values }) => {
    const chartWidth: number = CHART_WIDTH;
    const chartHeight: number = CHART_HEIGHT;
    const chartPadding: number = CHART_PADDING;

    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const offsetRefX = useRef(0);
    const offsetRefY = useRef(0);

    const maxY: number = Math.max(...values.map(v => v.y));
    const xAxisLength: number = values.length * (BAR_WIDTH + 10) + 10;


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


    let pointsArray: { label: string, value: number }[] = [];
    values.map((v, i) => {
        const x = (i / (values.length - 1)) * (chartWidth - 10 - chartPadding) + chartPadding;
        const y = ((chartHeight - chartPadding) - (v.y / maxY) * (chartHeight - 10 - chartPadding));
        pointsArray.push({ label: v.x, value: y });
    });


    return (
        <View style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
        ]}>
            <View {...panResponder.panHandlers} style={{ backgroundColor: 'red' }}>
                <Svg key={1000} height={chartHeight} width={chartWidth} viewBox={`${offsetX} ${offsetY} 200 200`} style={{ backgroundColor: 'white' }}>
                    <G transform="translate(0,100)">
                        <Polyline
                            key={"axis"}
                            points={`${chartPadding},${chartHeight - chartPadding} ${xAxisLength},${chartHeight - chartPadding}`}
                            fill="none"
                            stroke={'black'}
                            strokeWidth="2"
                        />

                        {pointsArray.map((points, index) => {
                            return (
                                <Rect
                                    key={index + "bar" + Date.now().toString()}
                                    x={(10 + BAR_WIDTH) * (index + 1) - BAR_WIDTH}
                                    y={points.value}
                                    width={BAR_WIDTH}
                                    height={points.value === (chartHeight - chartPadding) ? 0 : (chartHeight - chartPadding) - points.value}
                                    stroke="red"
                                    strokeWidth="2"
                                    fill="yellow"
                                />
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
export default ColumnChart;