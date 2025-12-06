import { View } from 'react-native';
import React from 'react';
import { CHART_HEIGHT, CHART_WIDTH, BAR_WIDTH } from '../../utils/constants';
import type { PopulationChartProps } from '../../interfaces/types';
import Svg, {  G,  Rect, Text } from 'react-native-svg';

const PopulationChart: React.FC<PopulationChartProps> = ({ chartTitle,leftLabel, rightLabel, data }) => {
    if(data.length===0){
        throw new Error("Data array cannot be empty");
    }
    if(data.length>9){
        throw new Error("Population chart currently supports a maximum of 9 items");
    }
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

    data.map((v, _i) => {
        chartData.push({
            category: v.category,
            leftWidth: ((chartWidth / 2) / max) * v.leftValue-30,
            rightWidth: ((chartWidth / 2) / max) * v.rightValue-30,
            leftValue: v.leftValue,
            rightValue: v.rightValue
        })
    });

    const colorArray: string[] = ["#FF5733", "#33FF57", "#071b76ff", "#F333FF", "#4d0840ff", "#f71c27ff"];
    return (
        <View style={[
            { alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' },
        ]}>
            <View style={{ backgroundColor: 'red' }}>
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