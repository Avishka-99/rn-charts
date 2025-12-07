# @avi99/rn-charts

react native chart library

## Installation


```sh
npm install @avi99/rn-charts
```


## Usage


```ts
import { LineChart, type LineChartProps } from '@avi99/rn-charts';

const lineChartData: LineChartProps = {
    title: "Profit/Loss (Thousands)",
    data : [
      {
        name: "Kandy",
        points: [
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
        ]
      },
      {
        name: "Gampaha",
        points: [
          { label: 'January', value:120 },
          { label: 'February', value: 150 },
          { label: 'March', value: 140 },
          { label: 'April', value: 70 },
          { label: 'May', value: -90 },
          { label: 'June', value: 60 },
          { label: 'July', value: 110 },
          { label: 'August', value: 45 },
          { label: 'September', value: 546 },
          { label: 'October', value: 13 },
          { label: 'November', value: 160 },
          { label: 'December', value: 160 }
        ]
      }
    ]
  };

<LineChart {...lineChartData} />


```
# 4.Components

## Line Chart
```ts
import { LineChart, type LineChartProps } from '@avi99/rn-charts';

const lineChartData: LineChartProps = {
    title: "Profit/Loss (Thousands)",
    data : [
      {
        name: "Kandy",
        points: [
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
        ]
      },
      {
        name: "Gampaha",
        points: [
          { label: 'January', value:120 },
          { label: 'February', value: 150 },
          { label: 'March', value: 140 },
          { label: 'April', value: 70 },
          { label: 'May', value: -90 },
          { label: 'June', value: 60 },
          { label: 'July', value: 110 },
          { label: 'August', value: 45 },
          { label: 'September', value: 546 },
          { label: 'October', value: 13 },
          { label: 'November', value: 160 },
          { label: 'December', value: 160 }
        ]
      }
    ]
  };

<LineChart {...lineChartData} />


```

## Bar Chart
```ts
import { BarChart, type BarChartProps } from '@avi99/rn-charts';

const barChartData: BarChartProps = {
    title: "Car Sales (June 2025)",
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


<BarChart {...barChartData} />
```
## Nightingale Chart
```ts
import { NightingaleChart, type PieChartProps } from '@avi99/rn-charts';

const nightingaleChartData: PieChartProps = {
    title: "Car Sales (June 2025)",
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


<NightingaleChart {...nightingaleChartData} />
```
## Pie Chart
```ts
import { PieChart, type PieChartProps } from '@avi99/rn-charts';

const pieChartData: PieChartProps = {
    title: "Car Sales (June 2025)",
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


<PieChart {...pieChartData} />
```
## Population Chart
```ts
import { PopulationChart, type PopulationChartProps } from '@avi99/rn-charts';

const populationData: PopulationChartProps = {
    chartTitle: "Population Distribution by Age - 2025",
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


<PopulationChart {...populationData} />
```
## Column Chart
```ts
import { ColumnChart, type BarChartProps } from '@avi99/rn-charts';

const columnChartData: BarChartProps = {
    title: "Car Sales (June 2025)",
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


<ColumnChart {...columnChartData} />
```
## Circular Bar Chart
```ts
import { CircularBarChart, type BarChartProps } from '@avi99/rn-charts';

const circularChartData: BarChartProps = {
    title: "Car Sales (June 2025)",
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


<CircularBarChart {...circularChartData} />
```
## Slope Chart
```ts
import { SlopeChart, type SlopeChartProps } from '@avi99/rn-charts';

const slopeChartData: SlopeChartProps = {
    title: "Sales Comparison",
    label_1: "2020 Sales",
    label_2: "2024 Sales",
    values: [
      {
        y1: 120, y2: 180, label: 'Honda civic' },
      { y1: 200, y2: 150, label: 'Nissan leaf' },
      { y1: 80, y2: 130, label: 'Toyota yaris' }, 
      { y1: 160, y2: 190, label: 'Mitsubishi lancer' }, 
      { y1: 100, y2: 90, label: 'Suzuki swift' }, 
    ],
  };

<SlopeChart {...slopeChartData} />
```
## Lollipop Chart
```ts
import { LollipopChart, type LollipopChartProps } from '@avi99/rn-charts';

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
      { label: "December", value: 65 }
    ],
  };

<LollipopChart {...lollipopChartData} />
```

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
