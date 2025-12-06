import type { BarChartProps } from '../../interfaces/types';
import { View } from 'react-native';
import React from 'react';
import Svg, { G, Text, Rect } from 'react-native-svg';
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH, BAR_WIDTH } from "../../utils/constants";

const BarChart: React.FC<BarChartProps> = ({ title, data }) => {
      if(data.length===0){
        throw new Error("Data array cannot be empty");
    }
    if(data.length>16){
        throw new Error("Barchart currently supports a maximum of 16 items");
    }
    const chartWidth: number = CHART_WIDTH;
    const chartHeight: number = CHART_HEIGHT;
    const chartPadding: number = CHART_PADDING;


    const maxY: number = Math.max(...data.map(v => v.value));


    let pointsArray: { label: string, value: number, exactValue: number }[] = [];
    data.map((v, _i) => {
        const y = ((chartHeight - chartPadding) - (v.value / maxY) * (chartHeight - 10 - chartPadding));
        pointsArray.push({ label: v.label, value: y, exactValue: v.value });
    });


    return (
        <View style={[
            {  backgroundColor: 'lightgrey' },
        ]}>
                <Svg key={1000} height={chartHeight} width={chartWidth} viewBox={`0 0 700 700`} style={{ backgroundColor: 'white' }}>
                    <G transform="translate(0,15)">
                        <Text
                            x={60}
                            y={10}
                            fontSize="32"
                            fontWeight="bold"
                            fill="black"
                            textAnchor="middle"
                        
                        >
                            {title}
                        </Text>
                    </G>
                    <G transform="translate(0,60)">
                        {pointsArray.map((points, index) => {
                            return (
                                <React.Fragment key={index + "group"}>
                                    <Rect
                                        key={index + "bar" + Date.now().toString()}
                                        y={(10 + BAR_WIDTH) * (index + 1) - BAR_WIDTH}
                                        x={20}
                                        height={BAR_WIDTH}
                                        width={points.value === (chartHeight - chartPadding) ? 0 : (chartHeight - chartPadding) - points.value}
                                        stroke="#071b76ff"
                                        strokeWidth="2"
                                        fill="#071b76ff"
                                        rx={5}
                                        ry={5}
                                    />
                                    <Text fontWeight={800} fontSize={18} x={25 + (points.value === (chartHeight - chartPadding) ? 0 : (chartHeight - chartPadding) - points.value)} y={(10.1 + BAR_WIDTH) * (index + 1) - (BAR_WIDTH / 2.5)} >
                                        {points.label} - {points.exactValue}
                                    </Text>


                                </React.Fragment>

                            )
                        })}
                    </G>
                </Svg>
        </View>
    )



}
export default BarChart;