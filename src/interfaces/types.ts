/**
 * Represents a single data point on the chart.
 */
export interface ChartData {
    /**
     * Chart name
     */
    name: string;
    values: {
        x: string;
        y: number;
    }[][];
}[]

export interface ColumnChartProps {
    name: string;
    values: {
        x: string;
        y: number;
    }[];
}



export interface DataPoint {
    values: {
        x: string;
        y: number;
        label?: string;
    };
}
export interface SlopeChartProps {
    label_1: string,
    label_2: string,
    values: {
        value_1: number,
        value_2: number,
    }[],

}