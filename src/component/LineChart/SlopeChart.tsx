import { View } from 'react-native';
import React from 'react';
import Svg, { Circle, G, Text, Line, Rect } from 'react-native-svg';
import type { SlopeChartProps, DataPoint } from '../../interfaces/types';
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH } from '../../utils/constants';
import { generateLightColors } from '../../utils/functions';

const SlopeChart: React.FC<SlopeChartProps> = ({ title, label_1, label_2, values }) => {
    const chartWidth: number = CHART_WIDTH;
    const chartHeight: number = CHART_HEIGHT;
    const chartPadding: number = CHART_PADDING;

    const maxY = Math.max(...values.flat().map(v => Math.max(v.y1, v.y2)));
    const minY = Math.min(...values.flat().map(v => Math.min(v.y1, v.y2)));
    const chartDataPoints: DataPoint[][] = [];
    const colorArray: string[] = generateLightColors(values.length);
    const labelArray:string[] = [];
    let pointsArray: string[] = [];
    let yAxixValues: number[] = [];
    values.map((chartValues, _i) => {
        let points: string = "";
        labelArray.push(chartValues.label)
        if (Math.abs(minY) > maxY) {
            const y = ((chartHeight - chartPadding) - (chartValues.y1 / Math.abs(minY)) * (chartHeight - 10 - chartPadding));
            const y2 = ((chartHeight - chartPadding) - (chartValues.y2 / Math.abs(minY)) * (chartHeight - 10 - chartPadding));
            const chartDataPoint: DataPoint = {
                values: { x: String(80), y, exactValue: chartValues.y1 ,label:chartValues.label}
            };
            const chartDataPoint2: DataPoint = {
                values: { x: String(280), y: y2, exactValue: chartValues.y2,label:chartValues.label }
            };
            yAxixValues.push(y, y2)
            chartDataPoints.push([chartDataPoint, chartDataPoint2]);
            points = points.concat(`${80},${y}`);
            points = points.concat(` ${280},${y2}`);
            pointsArray.push(points)
        } else {
            const y = ((chartHeight - chartPadding) - (chartValues.y1 / maxY) * (chartHeight - 10 - chartPadding));
            const y2 = ((chartHeight - chartPadding) - (chartValues.y2 / maxY) * (chartHeight - 10 - chartPadding));
            const chartDataPoint: DataPoint = {
                values: { x: String(80), y, exactValue: chartValues.y1,label:chartValues.label }
            };
            const chartDataPoint2: DataPoint = {
                values: { x: String(280), y: y2, exactValue: chartValues.y2,label:chartValues.label }
            };
            chartDataPoints.push([chartDataPoint, chartDataPoint2]);
            points = points.concat(`${80},${y}`);
            points = points.concat(` ${280},${y2}`);
            yAxixValues.push(y, y2)

            pointsArray.push(points)
        }
    });


    return (
        <View style={[
        ]}>
            <View style={{ backgroundColor: 'red' }}>
                <Svg key={1000} height={600} width={chartWidth} viewBox={`0 0 350 350`} style={{ backgroundColor: 'white' }}>
                    <G transform="translate(0,0)">
                        <Text fontSize={18} x={180} y={0} textAnchor='middle' color={"blue"} fontWeight={600}>{title}</Text>
                    </G>
                    <G transform="translate(0,60)">
                        <Text x={50} y={Math.max(...yAxixValues) + 40} color={"blue"} fontWeight={600}>{label_1}</Text>
                        <Text x={250} y={Math.max(...yAxixValues) + 40} color={"blue"} fontWeight={600}>{label_2}</Text>
                        
                        <Line
                            key={"slope-y-axis" + Math.random() + Date.now()}
                            x1={80}
                            y1={Math.max(...yAxixValues) + 20}
                            x2={80}
                            y2={Math.min(...yAxixValues) - 20}
                            stroke={'black'}
                            strokeWidth={2}
                            
                        />
                        <Line
                            key={"slope-y-axis-" + Math.random() + Date.now()}
                            x1={280}
                            y1={Math.max(...yAxixValues) + 20}
                            x2={280}
                            y2={Math.min(...yAxixValues) - 20}
                            stroke={'black'}
                            strokeWidth={2}
                        />
                        {pointsArray.map((points, index) =>
                            < React.Fragment key={index + "group"}>
                                <Line
                                    key={index + "x-dash"}
                                    x1={points.split(" ")[0]?.split(",")[0]}
                                    y1={points.split(" ")[0]?.split(",")[1]}
                                    x2={points.split(" ")[1]?.split(",")[0]}
                                    y2={points.split(" ")[1]?.split(",")[1]}
                                    stroke={colorArray[index]}
                                    strokeWidth={2}
                                />
                            </React.Fragment>
                        )}
                        {chartDataPoints.map((points, index) =>
                            points.map((point, idx) => (
                                < React.Fragment key={index + idx + "group"}>
                                    <Circle
                                        key={index * 100}
                                        cx={point?.values?.x}
                                        cy={point?.values?.y}
                                        r="5"
                                        stroke={'black'}
                                        fill={colorArray[index]}
                                    />
                                    <Text fill="black" 
                                        y={point.values.y+5} 
                                        x={point.values.x=='280' ? Number(point.values.x)+10 : Number(point.values.x)-10}
                                        textAnchor={point.values.x=='280' ? "start" : "end"}
                                        fontWeight={600}
                                    >
                                        {point.values.exactValue}
                                    </Text>
                                </React.Fragment>
                            ))

                        )}
                        <G transform={`translate(${10},270)`}>
                            {labelArray.map((label, index) => 
                                    <React.Fragment key={Math.random() + "tyry" + Date.now().toString()}>
                                        <Rect
                                            y={(20) * ((index%4) + 1)}
                                            x={0+parseInt(((index/4)).toString())*150}
                                            height={10}
                                            width={10}
                                            stroke={colorArray[index]}
                                            strokeWidth="2"
                                            fill={colorArray[index]}
                                            rx={10}
                                            ry={10}
                                        ></Rect>
                                        <Text 
                                            y={(20) * ((index%4) + 1) +10} 
                                            x={30+parseInt(((index/4)).toString())*150}
                                            fontSize={12}
                                            fontWeight={500}
                                            fill={"black"}
                                            textAnchor='start'
                                        >
                                            {label}
                                        </Text>
                                </React.Fragment>      
                            )}
                        </G> 

                    </G>
                </Svg>
            </View>
        </View>
    )
}

export default SlopeChart;