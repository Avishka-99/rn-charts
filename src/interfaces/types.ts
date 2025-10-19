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

export interface BarChartProps {
    name: string;
    values: {
        x: string;
        y: number;
    }[];
}

export interface LollipopChartProps {
    name: string,
    data: {
        label: string,
        value: number
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
        y1: number,
        y2: number,
    }[],

}