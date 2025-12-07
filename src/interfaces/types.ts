/**
 * Represents a single data point on the chart.
 */
export interface LineChartProps {
    title: string,
    subtitle?: string,
    data: {
        name: string,
        points: {
            label: string,
            value: number,
        }[];
    }[];
}
[]

export interface BarChartProps {
    title: string,
    subtitle?: string,
    data: {
        label: string,
        value: number,
    }[];
}

export interface LollipopChartProps {
    name: string,
    subtitle?: string,
    data: {
        label: string,
        value: number,
    }[];
}



export interface DataPoint {
    values: {
        x: string,
        y: number,
        label?: string,
        exactValue?: number,
    };
}
export interface SlopeChartProps {
    title: string,
    label_1: string,
    label_2: string,
    values: {
        y1: number,
        y2: number,
        label: string,
    }[],

}

export interface PopulationChartProps {
    chartTitle: string,
    leftLabel: string,
    rightLabel: string,
    data: {
        category: string,
        leftValue: number,
        rightValue: number,
    }[];
}

export interface PieChartProps {
    title: string,
    data: {
        label: string,
        value: number,
    }[];
}