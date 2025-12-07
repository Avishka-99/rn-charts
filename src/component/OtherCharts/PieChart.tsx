import { View } from 'react-native';
import React from 'react';
import { NIGHTINGALE_CHART_WIDTH, NIGHTINGALE_CHART_HEIGHT } from '../../utils/constants';
import type { PieChartProps } from '../../interfaces/types';
import Svg, { G, Path,Rect,Text } from 'react-native-svg';
import { generateLightColors } from '../../utils/functions';

const PieChart: React.FC<PieChartProps> = ({ title, data }) => {
    type chartData = {
        label: string,
        path: string,
        value: number,
    }[]

    const chartData: chartData = [];
    const sliceAngle: number = (2 * Math.PI) / data.length;
    const center = NIGHTINGALE_CHART_WIDTH / 5;

    data.map((v, i) => {
        const radius: number = (NIGHTINGALE_CHART_HEIGHT / 5);
        const startAngle: number = i * sliceAngle;
        const endAngle: number = (i + 1) * sliceAngle;

        const x1 = center + radius * Math.cos(startAngle)+60;
        const y1 = center + radius * Math.sin(startAngle);
        const x2 = center + radius * Math.cos(endAngle)+60;
        const y2 = center + radius * Math.sin(endAngle);

        const largeArcFlag = 0; 

        const pathData = `
        M ${center+60} ${center}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
        `;
        chartData.push({ label: v.label, path: pathData, value: v.value });
    })

    const colorArray: string[] = generateLightColors(data.length);
    return (
        <View style={[
           
            { alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' },
        ]}>
            <View style={{ backgroundColor: 'red' }}>
                <Svg key={1000} height={600} width={NIGHTINGALE_CHART_WIDTH} viewBox={`${0} ${0} 300 300`} style={{ backgroundColor: 'white' }}>
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
                    <G transform={`translate(${10},200)`}>
                        {chartData.map((arcDetail, index) => (
                            <React.Fragment key={index + "bar" + Date.now().toString()}>
                                <Rect
                                    y={(25) * ((index%6) + 1)}
                                    x={0+parseInt(((index/6)).toString())*150}
                                    height={5}
                                    width={5}
                                    stroke={colorArray[index]}
                                    strokeWidth="2"
                                    fill={colorArray[index]}
                                    rx={5}
                                    ry={5}
                                ></Rect>
                                <Text 
                                    y={(25) * ((index%6) + 1) +6} 
                                    x={10+parseInt(((index/6)).toString())*150}
                                    fontSize={10}
                                    fontWeight={800}
                                    fill={"black"}
                                    textAnchor='start'
                                >
                                    {arcDetail.label}({arcDetail.value})
                                </Text>
                            </React.Fragment>
                        ))}
                        
                        
                    </G>
                </Svg>
            </View>
        </View>
    );
}

export default PieChart;