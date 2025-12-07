import { View } from 'react-native';
import React from 'react';
import { CHART_WIDTH } from '../../utils/constants';
import type { BarChartProps } from '../../interfaces/types';
import Svg, {  G, Path, Rect, Text } from 'react-native-svg';
import { RADIAL_CHART_START_ANGLE, STROKE_WIDTH, RADIAL_CHART_INITIAL_RADIUS, CHART_TITLE_FONT_SIZE } from '../../utils/constants';
import { getRandomVibrantColors } from '../../utils/functions';

const CircularBarChart: React.FC<BarChartProps> = ({ title, data }) => {

    if(data.length===0){
        throw new Error("Data array cannot be empty");
    }
    if(data.length>16){
        throw new Error("CircularBarChart currently supports a maximum of 16 items");
    }

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

        const d = ` M ${startX } ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
        arcDetails.push({ name: arcDetail.label, path: d, value: arcDetail.value })

    })

    const colorArray: string[] = getRandomVibrantColors(arcDetails.length)

    return (
        <View style={[
            { alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' },
        ]}>
            <View style={{ backgroundColor: 'white' }}>
                <Svg height={550} width={CHART_WIDTH}>
                    <G transform="translate(30,30)">
                        <Text
                            x={RADIAL_CHART_INITIAL_RADIUS}
                            y={30}
                            fontSize={CHART_TITLE_FONT_SIZE}
                            fontWeight="bold"
                            fill="black"
                            textAnchor="start"
                        >
                            {title}
                        </Text>
                    </G>
                    <G transform="translate(30,0)">
                        <G transform="translate(70,0)">
                            {arcDetails.map((arcDetail, index) => (
                                <Path key={Math.random()} d={arcDetail.path} stroke={colorArray[index]} strokeWidth={STROKE_WIDTH} fill="none" />
                            ))}
                        </G>
                        <G transform={`translate(${0},300)`}>
                            {arcDetails.map((arcDetail, index) => (
                                <React.Fragment key={index + "bar" + Date.now().toString()}>
                                    <Rect
                                        y={(25) * ((index%8) + 1)}
                                        x={0+parseInt(((index/8)).toString())*190}
                                        height={5}
                                        width={5}
                                        stroke={colorArray[index]}
                                        strokeWidth="2"
                                        fill={colorArray[index]}
                                        rx={5}
                                        ry={5}
                                    ></Rect>
                                    <Text 
                                        y={(25) * ((index%8) + 1) +6} 
                                        x={10+parseInt(((index/8)).toString())*190}
                                        fontSize={10}
                                        fontWeight={800}
                                        fill={"black"}
                                        textAnchor='start'
                                    >
                                        {arcDetail.name}({arcDetail.value})
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