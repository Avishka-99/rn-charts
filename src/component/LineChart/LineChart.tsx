import { View, StyleSheet, PanResponder, type NativeTouchEvent } from 'react-native';
import React, { useRef, useState } from 'react';
import Svg, { Circle, G, Text, Polyline, Line } from 'react-native-svg';
import type { LineChartProps, DataPoint } from '../../interfaces/types';
import { Colors } from '../../utils/enums';
import { CHART_HEIGHT, CHART_PADDING, CHART_WIDTH } from '../../utils/constants';

const LineChart: React.FC<LineChartProps> = ({ title, data }) => {

    type negativeArray = {
        value:number,
        index:number
    }


    const chartWidth: number = CHART_WIDTH;
    const chartHeight: number = CHART_HEIGHT;
    const chartPadding: number = CHART_PADDING;

    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [scale, setScale] = useState(1);
    const scaleRef = useRef(1); 
    const initialDistance = useRef(0);
    const initialScale = useRef(1);
    const offsetRefX = useRef(0);
    const offsetRefY = useRef(0);
    const startRefX = useRef(0);
    const startRefY = useRef(0);
    const lastTouchCount = useRef(0);


    function getDistance(touches: readonly NativeTouchEvent[]) {
        const [a, b] = touches;
        const dx = a!.pageX - b!.pageX;
        const dy = a!.pageY - b!.pageY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    //const pan = useRef(new Animated.ValueXY()).current;
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
    //         onPanResponderRelease: (_event, gestureState) => {
    //             offsetRefX.current = Math.max(0, Math.min(chartWidth, offsetRefX.current - gestureState.dx));
    //             offsetRefY.current = Math.max(0, Math.min(chartHeight, offsetRefY.current - gestureState.dy));
    //         },
    //     })
    // ).current;

const panResponder = useRef(
  PanResponder.create({

    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (e) => {
      const touches = e.nativeEvent.touches.length;

      // Touch count changed → reset pan baseline
      if (touches !== lastTouchCount.current) {
        startRefX.current = offsetRefX.current;
        startRefY.current = offsetRefY.current;
        initialScale.current = scaleRef.current;
      }

      if (touches === 2) {
        initialDistance.current = getDistance(e.nativeEvent.touches);
      }

      lastTouchCount.current = touches;
    },

    onPanResponderMove: (e, gestureState) => {
      const touches = e.nativeEvent.touches.length;

      // ----- PINCH TO ZOOM -----
      if (touches === 2) {
        const dist = getDistance(e.nativeEvent.touches);
        let newScale = (dist / initialDistance.current) * initialScale.current;

        newScale = Math.max(0.5, Math.min(3, newScale)); // clamp

        setScale(newScale);
        scaleRef.current = newScale;

        return; // don't pan
      }

      // ----- PAN (Only when single finger) -----
      if (touches === 1) {
        const newX = startRefX.current - gestureState.dx;
        const newY = startRefY.current - gestureState.dy;

        setOffsetX(Math.max(0, Math.min(600, newX)));
        setOffsetY(Math.max(0, Math.min(600, newY)));
      }
    },

    onPanResponderRelease: () => {
      offsetRefX.current = offsetX;
      offsetRefY.current = offsetY;
      lastTouchCount.current = 0;
    }
  })
).current;




    const maxY = Math.max(...data.flat().map(v => v.value));
    const minY = Math.min(...data.flat().map(v => v.value));
    const chartDataPoints: DataPoint[][] = [];
    const yAxisPoints: DataPoint[] = [];

    const colorArray: string[] = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5", "#F5FF33"];

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

    let negativeNumbers:negativeArray[] = [];
    for (let i: number = 0; i < 5; i++) {
        
        if (Math.abs(minY) >= maxY) {
            const yAxisPoint: DataPoint = {
                values: { x: "0", y: ((chartHeight - chartPadding) - (i / 4) * (chartHeight - 10 - chartPadding)), label: String(((i / 4) * Math.abs(minY)).toFixed(0)) }
            };
            yAxisPoints.push(yAxisPoint);

            if(minY<0){
                const yAxisPointNeg: DataPoint = {
                    values: { x: "0", y: ((chartHeight - chartPadding) + (i / 4) * (chartHeight - 10 - chartPadding)), label: String(-((i / 4) * Math.abs(maxY)).toFixed(0)) }
                };
                if((minY<=parseInt(yAxisPointNeg?.values?.label!))){
                    yAxisPoints.push(yAxisPointNeg);
                }else{
                    negativeNumbers.push({value: parseInt(yAxisPointNeg?.values?.label!), index: i});
                }

            }
            
            
        } else {
            const yAxisPoint: DataPoint = {
                values: { x: "0", y: ((chartHeight - chartPadding) - (i / 4) * (chartHeight - 10 - chartPadding)), label: String(((i / 4) * Math.abs(maxY)).toFixed(0)) }
            };
            yAxisPoints.push(yAxisPoint);

            if(minY<0){
                const yAxisPointNeg: DataPoint = {
                    values: { x: "0", y: ((chartHeight - chartPadding) + (i / 4) * (chartHeight - 10 - chartPadding)), label: String(-((i / 4) * Math.abs(maxY)).toFixed(0)) }
                };
                if((minY<=parseInt(yAxisPointNeg?.values?.label!))){
                    yAxisPoints.push(yAxisPointNeg);
                }else{
                    negativeNumbers.push({value: parseInt(yAxisPointNeg?.values?.label!), index: i});
                }
            }

            
            
        }
        

    }
    if(negativeNumbers.length>0){
        negativeNumbers.sort((a,b)=>b.value-a.value);
        const yAxisPointNeg: DataPoint = {
            values: { x: "0", y: ((chartHeight - chartPadding) + (negativeNumbers[0]?.index! / 4) * (chartHeight - 10 - chartPadding)), label: String(-((negativeNumbers[0]?.index! / 4) * Math.abs(maxY)).toFixed(0)) }
        };
        yAxisPoints.push(yAxisPointNeg);
    }
    return (
        <View style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
        ]}>
            <View {...panResponder.panHandlers} style={{ backgroundColor: 'yellow' }}>
                <Svg key={1000} height={chartHeight} width={chartWidth} viewBox={`${0} ${0} ${700} ${700}`} style={{ backgroundColor: 'yellow' }}>
                    <G transform="translate(50,20)">
                        <Text
                            x={0 }
                            y={10}
                            fontSize="18"
                            fontWeight="bold"
                            fill="black"
                            textAnchor="middle"
                        
                        >
                            {title}
                        </Text>
                    </G>
                    
                    <G transform={"translate(0,100)"}>
                        <Polyline
                            key={"axis"}
                            points={`${chartPadding},0 ${chartPadding},${chartHeight - chartPadding} ${chartWidth + chartPadding},${chartHeight - chartPadding}`}
                            fill="none"
                            stroke={Colors.axis}
                            strokeWidth="2"
                        />
                        {yAxisPoints.map((points, index) =>
                            < React.Fragment key={index + "group"}>
                                <Line
                                    key={index + "x-dash"}
                                    x1={- 5 + chartPadding}
                                    y1={points?.values?.y}
                                    x2={chartPadding}
                                    y2={points?.values?.y}
                                    stroke="blue"
                                    strokeWidth={2}
                                />
                                <Text x={0} y={`${points?.values?.y-3}`} color={"blue"} alignmentBaseline='center'>{points?.values?.label}</Text>
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
                                    <Circle
                                        key={index * 100}
                                        cx={point?.values?.x}
                                        cy={point?.values?.y}
                                        r="5"
                                        stroke={colorArray[index]}
                                        fill={colorArray[index]}
                                    />
                                </React.Fragment>
                            ))

                        )}
                    </G>
                </Svg>
            </View>
        </View>
    )
}

export default LineChart;