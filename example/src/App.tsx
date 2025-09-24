import { Text, View, StyleSheet } from 'react-native';
import { LineChart, BarChart } from '@avi99/rn-charts';
import type { ChartData, ColumnChartProps, SlopeChartProps } from '@avi99/rn-charts';


export default function App() {
  // const data: ChartData = {
  //   name: "Sales",
  //   values: [[
  //     { x: '1', y: 0 },
  //     { x: '2', y: 10 },
  //     { x: '3', y: 40 },
  //     { x: '4', y: 30 },
  //     { x: '5', y: -40 },
  //     { x: '6', y: 60 },
  //     { x: '7', y: 100 },
  //     { x: '8', y: 98 },
  //     { x: '9', y: 130 },
  //     { x: '10', y: 13 },
  //     { x: '11', y: 160 }],
  //   [
  //     { x: '1', y: 50 },
  //     { x: '2', y: 23 },
  //     { x: '3', y: 53 },
  //     { x: '4', y: 30 },
  //     { x: '5', y: 40 },
  //     { x: '6', y: 60 },
  //     { x: '7', y: 23 },
  //     { x: '8', y: 90 },
  //     { x: '9', y: 243 },
  //     { x: '10', y: 13 },
  //     { x: '11', y: 43 }]],
  // };
  const data: ColumnChartProps = {
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

  const data_2: SlopeChartProps = {
    label_1: "Product A",
    label_2: "Product B",
    values: [
      { value_1: 30, value_2: 70 },
      { value_1: 50, value_2: 50 },
      { value_1: 80, value_2: 20 },
    ],
  };

  return (
    <View style={styles.container}>
      {/* <LineChart {...data} /> */}
      <BarChart {...data} />
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
