import { Text, View, StyleSheet } from 'react-native';
import { LineChart, BarChart, SlopeChart, LollipopChart, CircularBarChart, PopulationChart } from '@avi99/rn-charts';
import type { BarChartProps, ChartData, ColumnChartProps, SlopeChartProps, LollipopChartProps, PopulationChartProps } from '@avi99/rn-charts';


export default function App() {
  const data_2: ChartData = {
    name: "Sales",
    data: [[
      { label: '1', value: 0 },
      { label: '2', value: 10 },
      { label: '3', value: 40 },
      { label: '4', value: 30 },
      { label: '5', value: -40 },
      { label: '6', value: 60 },
      { label: '7', value: 100 },
      { label: '8', value: 98 },
      { label: '9', value: 130 },
      { label: '10', value: 13 },
      { label: '11', value: 160 }],
    [
      { label: '1', value: 50 },
      { label: '2', value: 23 },
      { label: '3', value: 53 },
      { label: '4', value: 30 },
      { label: '5', value: 40 },
      { label: '6', value: 60 },
      { label: '7', value: 23 },
      { label: '8', value: 90 },
      { label: '9', value: 243 },
      { label: '10', value: 13 },
      { label: '11', value: 43 }]],
  };
  const data: BarChartProps = {
    name: "Sales",
    data: [
      { label: '1', value: 90 },
      { label: '2', value: 10 },
      { label: '3', value: 40 },
      { label: '4', value: 30 },
      { label: '5', value: 40 },
      // { label: '6', value: 60 },
      // { label: '7', value: 100 },
      // { label: '8', value: 98 },
      // { label: '9', value: 130 },
      // { label: '10', value: 13 },
      // { label: '11', value: 160 }
    ],
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

  const lollipopChartData: LollipopChartProps = {
    name: "Monthly Sales",
    data: [
      { label: "January", value: 30 },
      { label: "February", value: 10 },
      { label: "March", value: 40 },
      { label: "April", value: 30 },
      { label: "May", value: 40 },
      { label: "June", value: 60 },
      { label: "July", value: 100 },
      { label: "August", value: 98 },
      { label: "September", value: 65 },
      { label: "October", value: 13 },
      { label: "November", value: 58 },
    ],
  };

  const samplePopulationData: PopulationChartProps = {
    chartTitle: "Population Distribution by Age Group - 2025",
    leftLabel: "Male Population",
    rightLabel: "Female Population",
    data: [
      { category: "0-9", leftValue: 4200, rightValue: 4000 },
      { category: "10-19", leftValue: 3900, rightValue: 4100 },
      { category: "20-29", leftValue: 4500, rightValue: 4700 },
      { category: "30-39", leftValue: 4300, rightValue: 4400 },
      { category: "40-49", leftValue: 3800, rightValue: 4000 },
      { category: "50-59", leftValue: 3100, rightValue: 3300 },
      { category: "60-69", leftValue: 2500, rightValue: 2700 },
      { category: "70-79", leftValue: 1800, rightValue: 2000 },
      { category: "80+", leftValue: 900, rightValue: 1200 },
    ],
  };



  return (
    <View style={styles.container}>
      {/* <LineChart {...data} /> */}
      <PopulationChart {...samplePopulationData} />
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
