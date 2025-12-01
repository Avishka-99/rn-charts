import { View, PanResponder, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { CHART_HEIGHT, CHART_WIDTH, BAR_WIDTH } from '../../utils/constants';
import type { PopulationChartProps } from '../../interfaces/types';
import Svg, {  G,  Rect, Text } from 'react-native-svg';

const PopulationChart: React.FC<PopulationChartProps> = ({ chartTitle,leftLabel, rightLabel, data }) => {
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
    //let pointsArray: { label: string, value: number, exactValue: number }[] = [];
    data.map((v, _i) => {
        chartData.push({
            category: v.category,
            leftWidth: ((chartWidth / 2) / max) * v.leftValue-30,
            rightWidth: ((chartWidth / 2) / max) * v.rightValue-30,
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
            onPanResponderRelease: (_event, gestureState) => {
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
                <Svg key={1000} height={chartHeight} width={chartWidth} viewBox={`${0} ${0} 400 400`} style={{ backgroundColor: 'white' }}>
                    <G transform="translate(0,20)">
                        <View style={{width: chartWidth}}>
                            <Text
                                x={0}
                                y={20}
                                fontSize="18"
                                fontWeight="bold"
                                fill="black"
                                textAnchor="start"
                                textLength={100}
                            >
                                {chartTitle}
                            </Text>
                        </View>

                        
                    </G>
                    <G transform="translate(0,60)">
                        <Text
                            x={220}
                            y={40}
                            fontSize="12"
                            fontWeight="bold"
                            fill="black"
                            textAnchor="end"
                            textLength={100}
                        >
                            {leftLabel}
                        </Text>
                        <Text
                            x={230}
                            y={40}
                            fontSize="12"
                            fontWeight="bold"
                            fill="black"
                            textAnchor="start"
                            textLength={100}
                        >
                            {rightLabel}
                        </Text>

                    </G>
                    <G transform="translate(0,100)">

                        {chartData.map((data, index) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <Rect
                                        y={(10 + BAR_WIDTH / 2) * (index + 1) - BAR_WIDTH / 2}
                                        x={(CHART_WIDTH / 2 - data.leftWidth)+25}
                                        height={BAR_WIDTH / 2}
                                        width={data.leftWidth}
                                        fill={colorArray[0]}
                                        rx={5}
                                        ry={5}
                                    />
                                    <Text
                                        x={CHART_WIDTH / 2 -200}
                                        y={(10 + BAR_WIDTH / 2) * (index + 1) - 3 }
                                        fontSize="12"
                                        fontWeight="bold"
                                        fill="black"
                                        textAnchor="start"
                                    >
                                        {data.category}

                                    </Text>
                                    {/* <Text
                                        x={CHART_WIDTH / 2-100}
                                        y={(10 + BAR_WIDTH / 2) * (index + 1) - 3 }
                                        fontSize="12"
                                        fontWeight="bold"
                                        fill="black"
                                        textAnchor="start"
                                    >
                                        {data.leftValue}

                                    </Text> */}
                                    
                                    <Rect
                                        y={(10 + BAR_WIDTH / 2) * (index + 1) - BAR_WIDTH / 2}
                                        x={(CHART_WIDTH / 2)+25}
                                        height={BAR_WIDTH / 2}
                                        width={data.rightWidth}
                                        fill={colorArray[2]}
                                        rx={5}
                                        ry={5}
                                    />
                                    {/* <Text
                                        x={CHART_WIDTH -100}
                                        y={(10 + BAR_WIDTH / 2) * (index + 1) - 3 }
                                        fontSize="12"
                                        fontWeight="bold"
                                        fill="red"
                                        textAnchor="start"
                                    >
                                        {data.rightValue}

                                    </Text> */}
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