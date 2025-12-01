/**
 * Represents a single data point on the chart.
 */
export interface LineChartProps {
    /**
     * Chart name
     */
    title: string;
    subtitle?: string;
    data: {
        label: string;
        value: number;
    }[][];
}[]

export interface ColumnChartProps {
    title: string;
    subtitle?: string;
    data: {
        label: string;
        value: number;
    }[];
}

export interface BarChartProps {
    title: string;
    subtitle?: string;
    data: {
        label: string;
        value: number;
    }[];
}

export interface LollipopChartProps {
    name: string;
    subtitle?: string;
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

export interface PopulationChartProps {
    chartTitle: string;
    leftLabel: string;
    rightLabel: string;
    data: {
        category: string;
        leftValue: number;
        rightValue: number;
    }[];
}

export interface NightingaleChartProps {
    title: string;
    data: {
        label: string;
        value: number;
    }[];
}