import { Text, View, StyleSheet } from 'react-native';
import { LineChart, BarChart, SlopeChart } from '@avi99/rn-charts';
import type { BarChartProps, ChartData, ColumnChartProps, SlopeChartProps } from '@avi99/rn-charts';


export default function App() {
  const data_2: ChartData = {
    name: "Sales",
    values: [[
      { x: '1', y: 0 },
      { x: '2', y: 10 },
      { x: '3', y: 40 },
      { x: '4', y: 30 },
      { x: '5', y: -40 },
      { x: '6', y: 60 },
      { x: '7', y: 100 },
      { x: '8', y: 98 },
      { x: '9', y: 130 },
      { x: '10', y: 13 },
      { x: '11', y: 160 }],
    [
      { x: '1', y: 50 },
      { x: '2', y: 23 },
      { x: '3', y: 53 },
      { x: '4', y: 30 },
      { x: '5', y: 40 },
      { x: '6', y: 60 },
      { x: '7', y: 23 },
      { x: '8', y: 90 },
      { x: '9', y: 243 },
      { x: '10', y: 13 },
      { x: '11', y: 43 }]],
  };
  const data: BarChartProps = {
    name: "Sales",
    values: [
      { x: '1', y: 0 },
      { x: '2', y: 10 },
      { x: '3', y: 40 },
      { x: '4', y: 30 },
      { x: '5', y: 40 },
      { x: '6', y: 60 },
      { x: '7', y: 100 },
      { x: '8', y: 98 },
      { x: '9', y: 130 },
      { x: '10', y: 13 },
      { x: '11', y: 160 }],
  };

  const slopeChartData: SlopeChartProps = {
    label_1: "2020 Sales",
    label_2: "2024 Sales",
    values: [
      { y1: 120, y2: 180 }, // Product A
      { y1: 200, y2: 150 }, // Product B
      { y1: 80, y2: 130 }, // Product C
      { y1: 160, y2: 190 }, // Product D
      { y1: 100, y2: 90 },  // Product E
    ],
  };


  return (
    <View style={styles.container}>
      {/* <LineChart {...data} /> */}
      <SlopeChart {...slopeChartData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
