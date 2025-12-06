import { View } from 'react-native';
import React from 'react';
import Svg, { Circle, G, Text, Polyline, Line } from 'react-native-svg';
import type { LineChartProps, DataPoint } from '../../interfaces/types';
import { Colors } from '../../utils/enums';
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH } from '../../utils/constants';

const LineChart: React.FC<LineChartProps> = ({ title, data }) => {

    const chartWidth: number = 480;
    const chartHeight: number = CHART_HEIGHT;
    const chartPadding: number = CHART_PADDING;

    type LabelPoints = {
        label:string,
        x:number

    }

    const labelArray:LabelPoints[] =[];

    data[0]?.map((line,_index)=>{
        const x = (_index / (data[0]!.length - 1)) * (chartWidth - 10 - chartPadding) + chartPadding;
        labelArray.push({
            label:line.label,
            x:x
        });
    })


    const maxY = Math.max(...data.flat().map(v => v.value));
    const minY = Math.min(...data.flat().map(v => v.value));
    const chartDataPoints: DataPoint[][] = [];
    const yAxisPoints: DataPoint[] = [];

    const colorArray: string[] = ["#FF5733", "#33FF57"];

    let pointsArray: string[] = [];
    data.map(chartValues => {
        let points: string = "";
        let dataPointArray: DataPoint[] = [];
        chartValues.map((v, i) => {
            const x = (i / (chartValues.length - 1)) * (chartWidth - 10 - chartPadding) + chartPadding;
            if (Math.abs(minY) > maxY) {
                const y = ((chartHeight - chartPadding) - (v.value / Math.abs(minY)) * (chartHeight - 10 - chartPadding));
                const chartDataPoint: DataPoint = {
                    values: { x: String(x), y }
                };
                dataPointArray.push(chartDataPoint);
                points = points.concat(` ${x},${y}`);
            } else {
                const y = ((chartHeight - chartPadding) - (v.value / maxY) * (chartHeight - 10 - chartPadding));
                const chartDataPoint: DataPoint = {
                    values: { x: String(x), y }
                };
                dataPointArray.push(chartDataPoint);
                points = points.concat(` ${x},${y}`);
            }
        });
        pointsArray.push(points);
        chartDataPoints.push(dataPointArray);

    });

    for (let i: number = 0; i < 5; i++) {
        if (Math.abs(minY) >= maxY) {
            const yAxisPoint: DataPoint = {
                values: { x: "0", y: ((chartHeight - chartPadding) - (i / 4) * (chartHeight - 10 - chartPadding)), label: String(((i / 4) * Math.abs(minY)).toFixed(0)) }
            };
            yAxisPoints.push(yAxisPoint);

            const yAxisPointNeg: DataPoint = {
                values: { x: "0", y: ((chartHeight - chartPadding) + (i / 4) * (chartHeight - 10 - chartPadding)), label: String(-((i / 4) * Math.abs(minY)).toFixed(0)) }
            };
            yAxisPoints.push(yAxisPointNeg);
        } else {
            const yAxisPoint: DataPoint = {
                values: { x: "0", y: ((chartHeight - chartPadding) - (i / 4) * (chartHeight - 10 - chartPadding)), label: String(((i / 4) * Math.abs(maxY)).toFixed(0)) }
            };
            yAxisPoints.push(yAxisPoint);

            const yAxisPointNeg: DataPoint = {
                values: { x: "0", y: ((chartHeight - chartPadding) + (i / 4) * (chartHeight - 10 - chartPadding)), label: String(-((i / 4) * Math.abs(maxY)).toFixed(0)) }
            };
            yAxisPoints.push(yAxisPointNeg);
        }

    }
    return (
        <View style={[
            { alignItems: 'center', justifyContent: 'center' },
        ]}>
            <View  style={{ backgroundColor: 'white' }}>
                <Svg key={1000} height={800} width={chartWidth} viewBox={`${0} ${0} ${700} ${700}`} style={{ backgroundColor: 'white' }}>
                    <G transform="translate(100,20)">
                        <Text
                            key={Math.random()+"linechartkey"}
                            x={0}
                            y={10}
                            fontSize="18"
                            fontWeight="bold"
                            fill="black"
                            textAnchor="middle"
                        
                        >
                            {title}
                        </Text>
                    </G>
                    
                    <G transform={"translate(100,100)"}>
                        <Polyline
                            key={"axis"}
                            points={`${chartPadding},0 ${chartPadding},${chartHeight - chartPadding} ${chartWidth + chartPadding},${chartHeight - chartPadding}`}
                            fill="none"
                            stroke={Colors.axis}
                            strokeWidth="2"
                        />
                        <Polyline
                            key={"axis-2"}
                            points={`${chartPadding},${chartHeight - chartPadding} `}
                            fill="none"
                            stroke={Colors.axis}
                            strokeWidth="2"
                        />
                        {yAxisPoints.map((points, index) =>
                            < React.Fragment key={index + "group"}>
                                
                                <Text x={0} y={`${points?.values?.y-3}`} color={"blue"} alignmentBaseline='center'>{points?.values?.label}</Text>
                                <Line
                                        key={index+ "dashline"}
                                        x1={chartPadding}
                                        y1={`${points?.values?.y}`}
                                        x2={chartWidth + chartPadding}
                                        y2={`${points?.values?.y}`}
                                        stroke={Colors.axis}
                                        strokeWidth="2"
                                        strokeDasharray="5, 5"
                                    />  
                            </React.Fragment>
                        )}
                        {pointsArray.map((points, index) => {
                            return (
                                <Polyline
                                    key={"data-line-" + index + Date.now().toString()}
                                    points={points}
                                    fill="none"
                                    stroke={colorArray[index]}
                                    strokeWidth={2}
                                />
                            )
                        })}
                        {chartDataPoints.map((points, index) =>
                            points.map((point, idx) => (
                                < React.Fragment key={index + idx + "group"}>
                                    <Line
                                        key={"dashline"+index}
                                        x1={point?.values?.x}
                                        y1="0"
                                        x2={point?.values?.x}
                                        y2="750"
                                        stroke={Colors.axis}
                                        strokeWidth="2"
                                        strokeDasharray="5, 5"
                                    />                                    
                                </React.Fragment>
                            ))

                        )}

                        {chartDataPoints.map((points, index) =>
                            points.map((point, idx) => (
                                < React.Fragment key={index + idx + "group"}>
                                    <Circle
                                        key={index + "chartpoint"}
                                        cx={point?.values?.x}
                                        cy={point?.values?.y}
                                        r="5"
                                        stroke={colorArray[index]}
                                        fill={colorArray[index]}
                                    />
                                    
                                </React.Fragment>
                            ))

                        )}
                        {
                            labelArray.map((label,index)=>{
                                return(
                                    <React.Fragment key={Math.random()+"label"}>
                                        <Text textAnchor='end' key={index+"linelabel"} x={label.x} y={750} transform={`rotate(270 ${label.x} 750)`}>{label.label}</Text>
                                    </React.Fragment>
                                )
                            })
                        }
                    </G>
                </Svg>
            </View>
        </View>
    )
}

export default LineChart;