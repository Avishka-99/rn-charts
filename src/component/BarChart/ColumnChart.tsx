import type { ColumnChartProps } from '../../interfaces/types';
import { View } from 'react-native';
import React from 'react';
import Svg, { G, Polyline,Rect, Text } from 'react-native-svg';
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH, BAR_WIDTH } from "../../utils/constants";
import { getRandomVibrantColors } from '../../utils/functions';

const ColumnChart: React.FC<ColumnChartProps> = ({ title, data }) => {

    if(data.length===0){
        throw new Error("Data array cannot be empty");
    }
    if(data.length>16){
        throw new Error("Columnchart currently supports a maximum of 16 items");
    }

    const chartWidth: number = CHART_WIDTH;
    const chartHeight: number = CHART_HEIGHT;
    const chartPadding: number = CHART_PADDING;

    const maxY: number = Math.max(...data.map(v => v.value));
    const xAxisLength: number = data.length * (BAR_WIDTH + 10) + 10;

    const colors:string[] = getRandomVibrantColors(data.length);



    let pointsArray: { label: string, value: number }[] = [];
    data.map((v, _i) => {
        //const x = (i / (data.length - 1)) * (chartWidth - 10 - chartPadding) + chartPadding;
        const y = ((chartHeight - chartPadding) - (v.value / maxY) * (chartHeight - 10 - chartPadding));
        pointsArray.push({ label: v.label, value: y });
    });


    return (
        <View style={[
            {  backgroundColor: 'lightgrey' },
        ]}>
          
                <Svg key={1000} height={600} width={chartWidth} viewBox={`${0} ${0} 700 700`} style={{ backgroundColor: 'white' }}>
                    <G transform="translate(100,0)">
                        <Text
                            x={chartWidth/2}
                            y={0}
                            fontSize="27"
                            fontWeight="bold"
                            fill="black"
                            textAnchor="middle"
                        >
                            {title}
                        </Text>
                    </G>
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
                                    stroke={colors[index]}
                                    strokeWidth="2"
                                    fill={colors[index]}
                                />
                            )
                        })}
                    </G>
                    <G transform={`translate(${0},500)`}>
                        {pointsArray.map((bar, index) => (
                            <React.Fragment key={index + "bar" + Date.now().toString()}>
                                <Rect
                                    y={(35) * ((index%8) + 1)}
                                    x={0+parseInt(((index/8)).toString())*360}
                                    height={20}
                                    width={20}
                                    stroke={colors[index]}
                                    strokeWidth="2"
                                    fill={colors[index]}
                                    rx={20}
                                    ry={20}
                                ></Rect>
                                <Text 
                                    y={(35) * ((index%8) + 1) +15} 
                                    x={30+parseInt(((index/8)).toString())*360}
                                    fontSize={22}
                                    fontWeight={800}
                                    fill={"black"}
                                    textAnchor='start'
                                >
                                    {bar.label}({bar.value})
                                </Text>
                            </React.Fragment>
                        ))}
                    </G> 
                </Svg>
        </View>
    )



}
export default ColumnChart;