/**
 * Represents a single data point on the chart.
 */
export interface ChartData {
    /**
     * Chart name
     */
    name: string;
    values: {
        x: string;      // for example, x-axis value
        y: number;      // y-axis value
    }[];
}

export interface DataPoint {
    values: {
        x: string;
        y: number;
        label?: string;
    };
}