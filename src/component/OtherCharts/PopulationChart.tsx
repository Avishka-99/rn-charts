import { View, PanResponder, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH, BAR_WIDTH } from '../../utils/constants';
import type { PopulationChartProps } from '../../interfaces/types';
import Svg, { Circle, G, Line, Rect, Text } from 'react-native-svg';

const PopulationChart: React.FC<PopulationChartProps> = ({ chartTitle, data }) => {
    const chartWidth: number = CHART_WIDTH;
    const chartHeight: number = CHART_HEIGHT;
    type populationData = {
        category: string,
        leftWidth: number,
        rightWidth: number,
        leftValue: number,
        rightValue: number
    }[]

    const chartData: populationData = [];
    const max: number = Math.max(...data.map(v => Math.max(v.leftValue, v.rightValue)));

    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const offsetRefX = useRef(0);
    const offsetRefY = useRef(0);
    let pointsArray: { label: string, value: number, exactValue: number }[] = [];
    data.map((v, i) => {
        chartData.push({
            category: v.category,
            leftWidth: ((chartWidth / 2) / max) * v.leftValue,
            rightWidth: ((chartWidth / 2) / max) * v.rightValue,
            leftValue: v.leftValue,
            rightValue: v.rightValue
        })
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
                <Svg key={1000} height={chartHeight} width={chartWidth} viewBox={`${offsetX} ${offsetY} 300 300`} style={{ backgroundColor: 'white' }}>
                    <G transform="translate(0,60)">
                        <Text
                            x={chartWidth / 2}
                            y={30}
                            fontSize="18"
                            fontWeight="bold"
                            fill="black"
                            textAnchor="middle"
                        >
                            {chartTitle}
                        </Text>
                    </G>
                    <G transform="translate(0,100)">

                        {chartData.map((data, index) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <Rect
                                        y={(10 + BAR_WIDTH / 2) * (index + 1) - BAR_WIDTH / 2}
                                        x={CHART_WIDTH / 2 - data.leftWidth}
                                        height={BAR_WIDTH / 2}
                                        width={data.leftWidth}
                                        fill={colorArray[0]}
                                        rx={5}
                                        ry={5}
                                    />
                                    <Rect
                                        y={(10 + BAR_WIDTH / 2) * (index + 1) - BAR_WIDTH / 2}
                                        x={CHART_WIDTH / 2}
                                        height={BAR_WIDTH / 2}
                                        width={data.rightWidth}
                                        fill={colorArray[2]}
                                        rx={5}
                                        ry={5}
                                    />
                                </React.Fragment>
                            )
                        })}

                    </G>
                </Svg>
            </View>
        </View>
    );
}

export default PopulationChart;