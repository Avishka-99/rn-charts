import { View ,StyleSheet } from 'react-native';
import React from 'react';
import { CHART_HEIGHT, CHART_WIDTH } from '../../utils/constants';
import type { BarChartProps } from '../../interfaces/types';
import Svg, {  G, Path, Rect, Text } from 'react-native-svg';
import { RADIAL_CHART_START_ANGLE, STROKE_WIDTH, RADIAL_CHART_INITIAL_RADIUS } from '../../utils/constants';
import { getRandomVibrantColors } from '../../utils/functions';

const CircularBarChart: React.FC<BarChartProps> = ({ title, data }) => {
    const chartWidth: number = CHART_WIDTH;
    //const chartHeight: number = CHART_HEIGHT;
    //const chartPadding: number = CHART_PADDING;

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
        const endAngle = ((360 / maximumValue) * arcDetail.value) + RADIAL_CHART_START_ANGLE + 90;
        const sweepFlag = 1;
        const largeArcFlag = endAngle - RADIAL_CHART_START_ANGLE <= 180 ? "0" : "1";
        const startX = 50+ RADIAL_CHART_INITIAL_RADIUS + radius * Math.cos(toRadians(RADIAL_CHART_START_ANGLE));
        const startY = CHART_WIDTH / 2 + radius * Math.sin(toRadians(RADIAL_CHART_START_ANGLE));
        const endX =  50+ RADIAL_CHART_INITIAL_RADIUS + radius * Math.cos(toRadians(endAngle));
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

    const colorArray: string[] = getRandomVibrantColors(arcDetails.length)

    return (
        <View style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' },
        ]}>
            <View style={{ backgroundColor: 'white' }}>
                <Svg height={CHART_HEIGHT} width={CHART_WIDTH}>
                    <G transform="translate(30,60)">
                        <Text
                            x={RADIAL_CHART_INITIAL_RADIUS}
                            y={30}
                            fontSize="18"
                            fontWeight="bold"
                            fill="black"
                            textAnchor="middle"
                        >
                            {title}
                        </Text>
                    </G>
                    <G transform="translate(30,60)">
                        <G transform="translate(0,0)">
                            {arcDetails.map((arcDetail, index) => (
                                <Path key={Math.random()} d={arcDetail.path} stroke={colorArray[index]} strokeWidth={STROKE_WIDTH} fill="none" />
                            ))}
                        </G>
                        <G transform="translate(220,0)">
                            {arcDetails.map((arcDetail, index) => (
                                <React.Fragment key={index + "bar" + Date.now().toString()}>
                                    <Rect
                                        y={(25) * ((index%10) + 1)}
                                        x={0+parseInt(((index/10)).toString())*80}
                                        height={20}
                                        width={50}
                                        stroke={colorArray[index]}
                                        strokeWidth="2"
                                        fill={colorArray[index]}
                                        rx={5}
                                        ry={5}
                                    ></Rect>
                                    <Text 
                                        y={(25) * ((index%10) + 1) +15} 
                                        x={10+parseInt(((index/10)).toString())*80}
                                        fontSize={12}
                                        fontWeight={800}
                                        fill={"white"}
                                    >
                                        {arcDetail.value}
                                    </Text>
                                </React.Fragment>
                                

                            ))}
                        </G>
                        
                    </G>
                </Svg>
            </View>
        </View>
    );
}

export default CircularBarChart;