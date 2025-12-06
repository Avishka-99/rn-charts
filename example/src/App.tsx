import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
//import { LineChart, BarChart, SlopeChart, LollipopChart, CircularBarChart, PopulationChart } from '@avi99/rn-charts';
import { type BarChartProps, type LineChartProps, type ColumnChartProps, type SlopeChartProps, type LollipopChartProps, type PopulationChartProps, NightingaleChart, type PieChartProps, PopulationChart, LineChart, BarChart, CircularBarChart, ColumnChart, SlopeChart, LollipopChart,PieChart } from '@avi99/rn-charts';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  const data_2: LineChartProps = {
    title: "Sales",
    data : [
    [
      { label: 'January', value: 0 },
      { label: 'February', value: 10 },
      { label: 'March', value: 40 },
      { label: 'April', value: 30 },
      { label: 'May', value: -40 },
      { label: 'June', value: 60 },
      { label: 'July', value: 100 },
      { label: 'August', value: 98 },
      { label: 'September', value: 130 },
      { label: 'October', value: 13 },
      { label: 'November', value: 160 },
      { label: 'December', value: 160 }
    ],
    [
      { label: 'January', value: 50 },
      { label: 'February', value: 23 },
      { label: 'March', value: 53 },
      { label: 'April', value: 30 },
      { label: 'May', value: 40 },
      { label: 'June', value: -180 },
      { label: 'July', value: 23 },
      { label: 'August', value: 90 },
      { label: 'September', value: 243 },
      { label: 'October', value: 13 },
      { label: 'November', value: 43 },
      { label: 'December', value: 160 }
    ]
  ]

  };
  const data: BarChartProps = {
    title: "Sales",
    data: [
      { label: 'Kandy', value: 147 },
      { label: 'Galle', value: 346 },
      { label: 'Colombo', value: 440 },
      { label: 'Matara', value: 399 },
      { label: 'Hambantota', value: 500 },
      { label: 'Nuwara Eliya', value: 60 },
      { label: 'Anuradhapura', value: 100 },
      { label: 'Jaffna', value: 98 },
      { label: 'Trincomalee', value: 600 },
      { label: 'Batticaloa', value: 253 },
      { label: 'Polonnaruwa', value: 160 },
      { label: 'Vavuniya', value: 100 },
      { label: 'Mannar', value: 98 },
      { label: 'Mulathivu', value: 130 },
      { label: 'Kilinochchi', value: 245 },
      { label: 'Ampara', value: 160 }
    ],
  };

  const slopeChartData: SlopeChartProps = {
    title: "Sales Comparison",
    label_1: "2020 Sales",
    label_2: "2024 Sales",
    values: [
      {
        y1: 120, y2: 180, label: 'Product A' },
      { y1: 200, y2: 150, label: 'Product B' },
      { y1: 80, y2: 130, label: 'Product C' }, 
      { y1: 160, y2: 190, label: 'Product D' }, 
      { y1: 100, y2: 90, label: 'Product E' }, 
    ],
  };

  const lollipopChartData: LollipopChartProps = {
    name: "Monthly Sales",
    subtitle: "January to December",
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
      { label: "September", value: 65 },
      { label: "October", value: 13 },
      { label: "November", value: 58 },
      { label: "September", value: 65 },
      { label: "October", value: 13 },
    ],
  };

  const samplePopulationData: PopulationChartProps = {
    chartTitle: "Population Distribution by Age Group - 2025",
    leftLabel: "Male Population",
    rightLabel: "Female Population",
    data: [
      { category: "0-9", leftValue: 4200, rightValue: 4000 },
      { category: "10-19", leftValue: 3900, rightValue: 4100 },
      { category: "20-29", leftValue: 4500, rightValue: 4500 },
      { category: "30-39", leftValue: 4300, rightValue: 4400 },
      { category: "40-49", leftValue: 3800, rightValue: 4000 },
      { category: "50-59", leftValue: 3100, rightValue: 3300 },
      { category: "60-69", leftValue: 2500, rightValue: 2700 },
      { category: "70-79", leftValue: 1800, rightValue: 2000 },
      { category: "80+", leftValue: 900, rightValue: 1200 },
    ],
  };

  const night: PieChartProps = {
    title: "Year end sales report Sales - 2025/11/23",
    data: [
      { label: 'January', value: 123 },
      { label: 'February', value: 34 },
      { label: 'March', value: 57 },
      { label: 'April', value: 200 },
      { label: 'May', value: 34 },
      { label: 'June', value: 67 },
      { label: 'July', value: 86 },
      { label: 'August', value: 200 },
      { label: 'September', value: 57 },
      { label: 'October', value: 78 },
      { label: 'November', value: 34 },
      { label: 'December', value: 200 }
    ],
  };



  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}} style={styles.container}>
            {/* <LineChart {...data} /> */}
            {/* <NightingaleChart {...night} /> */}
            <NightingaleChart {...night} /> 
            <BarChart {...data} />
            <PopulationChart {...samplePopulationData} />
            <CircularBarChart {...data} />
            <ColumnChart {...data} /> 
            <SlopeChart {...slopeChartData} />
            <LollipopChart {...lollipopChartData} />
            <LineChart {...data_2} />
            <PieChart {...night} /> 
            
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
