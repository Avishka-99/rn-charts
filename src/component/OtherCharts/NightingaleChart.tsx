import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { NIGHTINGALE_CHART_WIDTH, NIGHTINGALE_CHART_HEIGHT } from '../../utils/constants';
import type { NightingaleChartProps } from '../../interfaces/types';
import Svg, { Circle, G, Path,Rect,Text } from 'react-native-svg';
import { getRandomVibrantColors } from '../../utils/functions';

const NightingaleChart: React.FC<NightingaleChartProps> = ({ title, data }) => {
    type chartData = {
        label: string,
        path: string,
        value: number,
    }[]

    const chartData: chartData = [];
    const max: number = Math.max(...data.map(v => v.value));
    const sliceAngle: number = (2 * Math.PI) / data.length;
    const center = NIGHTINGALE_CHART_WIDTH / 5;
    //const maxRadius = center - 10;s

    const [offsetX, _setOffsetX] = useState(0);
    const [offsetY, _setOffsetY] = useState(0);
    // const offsetRefX = useRef(0);
    // const offsetRefY = useRef(0);
    // let pointsArray: { label: string, value: number, exactValue: number }[] = [];

    data.map((v, i) => {
        const radius: number = (NIGHTINGALE_CHART_HEIGHT / 5) / max * v.value;
        //const toRadians = (deg: number) => (deg * Math.PI) / 180;
        const startAngle: number = i * sliceAngle;
        const endAngle: number = (i + 1) * sliceAngle;

        const x1 = center + radius * Math.cos(startAngle);
        const y1 = center + radius * Math.sin(startAngle);
        const x2 = center + radius * Math.cos(endAngle);
        const y2 = center + radius * Math.sin(endAngle);

        const largeArcFlag = 0; 

        const pathData = `
        M ${center} ${center}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
        `;
        chartData.push({ label: v.label, path: pathData, value: v.value });
    })

    const colorArray: string[] = getRandomVibrantColors(data.length);
    return (
        <View style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' },
        ]}>
            <View style={{ backgroundColor: 'red' }}>
                <Svg key={1000} height={NIGHTINGALE_CHART_HEIGHT} width={NIGHTINGALE_CHART_WIDTH} viewBox={`${0} ${0} 300 300`} style={{ backgroundColor: 'white' }}>
                    <G transform="translate(0,0)">
                        <Text
                            x={0}
                            y={15}
                            fontSize="14"
                            fontWeight="bold"
                            fill="black"
                            textAnchor="start"
                        
                        >
                            {title}
                        </Text>
                    </G>
                    <G transform={`translate(${0},50)`}>
                        {chartData.map((arcDetail, index) => (
                            < React.Fragment key={index + "group"}>
                            <Path strokeOpacity={100} key={Math.random()} d={arcDetail.path} stroke="none" fill={colorArray[index % colorArray.length]} />
                            

                            </React.Fragment>
                        ))}
                        
                        
                    </G>
                    <G transform={`translate(${180},20)`}>
                        {chartData.map((arcDetail, index) => (
                            <React.Fragment key={index + "bar" + Date.now().toString()}>
                                <Rect
                                    y={(25) * ((index%8) + 1)}
                                    x={0+parseInt(((index/8)).toString())*60}
                                    height={15}
                                    width={50}
                                    stroke={colorArray[index]}
                                    strokeWidth="2"
                                    fill={colorArray[index]}
                                    rx={5}
                                    ry={5}
                                ></Rect>
                                <Text 
                                    y={(25) * ((index%8) + 1) +11} 
                                    x={10+parseInt(((index/8)).toString())*60}
                                    fontSize={10}
                                    fontWeight={800}
                                    fill={"white"}
                                >
                                    {arcDetail.value}
                                </Text>
                            </React.Fragment>
                        ))}
                        
                        
                    </G>
                </Svg>
            </View>
        </View>
    );
}

export default NightingaleChart;