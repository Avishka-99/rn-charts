import { View, PanResponder, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH } from '../../utils/constants';
import type { BarChartProps } from '../../interfaces/types';
import Svg, { Circle, G, Line, Path, Text } from 'react-native-svg';
import { RADIAL_CHART_START_ANGLE, STROKE_WIDTH, RADIAL_CHART_INITIAL_RADIUS } from '../../utils/constants';

const CircularBarChart: React.FC<BarChartProps> = ({ name, data }) => {
    const chartWidth: number = CHART_WIDTH;
    const chartHeight: number = CHART_HEIGHT;
    const chartPadding: number = CHART_PADDING;

    type arcData = {
        name: string,
        value: number,
        path: string
    }

    const arcDetails: arcData[] = [];
    const max: number = Math.max(...data.map(v => v.value));
    const roundUpToNext100 = (max: number) => Math.ceil(max / 100) * 200;
    const maximumValue: number = roundUpToNext100(max);
    data = data.sort((a, b) => a.value - b.value);
    data.map((arcDetail, index) => {
        const radius = RADIAL_CHART_INITIAL_RADIUS + index * STROKE_WIDTH;
        const toRadians = (deg: number) => (deg * Math.PI) / 180;
        const endAngle = ((360 / maximumValue) * arcDetail.value) + RADIAL_CHART_START_ANGLE;

        const sweepFlag = 1;
        const largeArcFlag = endAngle - RADIAL_CHART_START_ANGLE <= 180 ? "0" : "1";
        const startX = CHART_WIDTH / 2 + radius * Math.cos(toRadians(RADIAL_CHART_START_ANGLE));
        const startY = CHART_WIDTH / 2 + radius * Math.sin(toRadians(RADIAL_CHART_START_ANGLE));
        const endX = CHART_WIDTH / 2 + radius * Math.cos(toRadians(endAngle));
        const endY = CHART_WIDTH / 2 + radius * Math.sin(toRadians(endAngle));

        const d = ` M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
        arcDetails.push({ name: arcDetail.label, path: d, value: arcDetail.value })

    })

    // const [offsetX, setOffsetX] = useState(0);
    // const [offsetY, setOffsetY] = useState(0);
    // const offsetRefX = useRef(0);
    // const offsetRefY = useRef(0);
    // let pointsArray: { label: string, value: number, exactValue: number }[] = [];
    // data.map((v, i) => {
    //     const x = ((chartWidth) / maxY) * v.value;
    //     console.log(x);
    //     pointsArray.push({ label: v.label, value: x, exactValue: v.value });
    // });

    // const panResponder = useRef(
    //     PanResponder.create({
    //         onStartShouldSetPanResponder: () => true,
    //         onMoveShouldSetPanResponder: () => true,
    //         onPanResponderMove: (event, gestureState) => {
    //             if (event.nativeEvent.touches.length >= 2) {
    //             } else {
    //                 const newOffsetX = Math.max(0, Math.min(chartWidth, offsetRefX.current - gestureState.dx));
    //                 const newOffsetY = Math.max(0, Math.min(chartHeight, offsetRefY.current - gestureState.dy));
    //                 setOffsetX(newOffsetX);
    //                 setOffsetY(newOffsetY);
    //             }

    //         },
    //         onPanResponderRelease: (event, gestureState) => {
    //             offsetRefX.current = Math.max(0, Math.min(chartWidth, offsetRefX.current - gestureState.dx));
    //             offsetRefY.current = Math.max(0, Math.min(chartHeight, offsetRefY.current - gestureState.dy));
    //         },
    //     })
    // ).current;

    const colorArray: string[] = ["#FF5733", "#33FF57", "#071b76ff", "#F333FF", "#4d0840ff", "#f71c27ff"];
    return (
        <View style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' },
        ]}>
            <View style={{ backgroundColor: 'white' }}>
                <Svg height={CHART_HEIGHT} width={CHART_WIDTH}>
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
                    </G>
                    <G transform="translate(0,60)">
                        {arcDetails.map((arcDetail, index) => (
                            <Path key={Math.random()} d={arcDetail.path} stroke={colorArray[index]} strokeWidth={STROKE_WIDTH} fill="none" />
                        ))}
                    </G>
                </Svg>
            </View>
        </View>
    );
}

export default CircularBarChart;