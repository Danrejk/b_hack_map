// corrosion.ts
// Coastal Corrosion Risk Data for Baltic Region - Bulk Dataset
// Each point contains [latitude, longitude, coastal_corrosion_risk_value]

export interface CorrosionRiskPoint {
    lat: number;
    lng: number;
    value: number; // Corrosion risk value, scale 0.0 (none) to 1.0 (critical)
}

export const corrosionRiskData: CorrosionRiskPoint[] = [
    { lat: 53.39561, lng: 14.64478, value: 0.66 },
    { lat: 53.73490, lng: 14.17236, value: 0.31 },
    { lat: 54.25861, lng: 19.25903, value: 0.55 },
    { lat: 54.10108, lng: 19.12170, value: 0.44 },
    { lat: 54.00272, lng: 18.94867, value: 0.37 },
    { lat: 54.19599, lng: 18.75641, value: 0.63 },
    { lat: 54.29870, lng: 18.96515, value: 0.83 },
    { lat: 54.53204, lng: 18.53119, value: 0.47 },
    { lat: 54.47463, lng: 18.55865, value: 0.41 },
    { lat: 54.78940, lng: 18.43506, value: 0.49 },
    { lat: 54.69110, lng: 18.69598, value: 0.54 },
    { lat: 54.41713, lng: 19.53094, value: 0.69 },
    { lat: 54.34355, lng: 19.20959, value: 0.31 },
    { lat: 54.83214, lng: 18.06152, value: 0.82 },
    { lat: 54.71966, lng: 17.23755, value: 0.84 },
    { lat: 54.35476, lng: 16.28448, value: 0.54 },
    { lat: 54.28427, lng: 16.13617, value: 0.87 },
    { lat: 54.75613, lng: 17.52869, value: 0.28 },
    { lat: 54.02532, lng: 14.78485, value: 0.75 },
    { lat: 54.15258, lng: 13.73016, value: 0.59 },
    { lat: 53.56295, lng: 14.52942, value: 0.38 },
    { lat: 53.72576, lng: 14.63928, value: 0.79 },
    { lat: 54.31953, lng: 13.12592, value: 0.32 },
    { lat: 54.24095, lng: 13.40607, value: 0.71 },
    { lat: 54.34835, lng: 13.70544, value: 0.43 },
    { lat: 54.45547, lng: 13.53516, value: 0.36 },
    { lat: 54.54160, lng: 13.19458, value: 0.81 },
    { lat: 54.38356, lng: 12.79907, value: 0.47 },
    { lat: 54.42672, lng: 12.55463, value: 0.49 },
    { lat: 54.22490, lng: 12.31018, value: 0.22 },
    { lat: 54.09625, lng: 11.59332, value: 0.35 },
    { lat: 53.91546, lng: 10.87372, value: 0.31 },
    { lat: 54.08819, lng: 10.73364, value: 0.52 },
    { lat: 54.47303, lng: 9.80530, value: 0.23 },
    { lat: 54.41234, lng: 11.11542, value: 0.37 },
    { lat: 54.83847, lng: 9.45648, value: 0.46 },
    { lat: 55.24605, lng: 9.65698, value: 0.5 },
    { lat: 55.05871, lng: 10.48096, value: 0.91 },
    { lat: 54.69209, lng: 11.92017, value: 0.23 },
    { lat: 55.19063, lng: 12.04102, value: 0.92 },
    { lat: 56.02832, lng: 12.44751, value: 0.83 },
    { lat: 55.71396, lng: 11.76636, value: 0.83 },
    { lat: 56.00376, lng: 10.15137, value: 0.35 },
    { lat: 56.48600, lng: 10.84351, value: 0.38 },
    { lat: 56.96220, lng: 10.28320, value: 0.49 },
    { lat: 57.60937, lng: 10.41504, value: 0.46 },
    { lat: 54.78089, lng: 8.52539, value: 0.44 },
    { lat: 53.94235, lng: 8.99780, value: 0.9 },
    { lat: 53.48723, lng: 8.16284, value: 0.22 },
    { lat: 56.19983, lng: 14.89746, value: 0.8 },
    { lat: 57.49738, lng: 12.04102, value: 0.93 },
    { lat: 58.26834, lng: 11.73340, value: 0.43 },
    { lat: 59.20336, lng: 11.14014, value: 0.77 },
    { lat: 59.82756, lng: 10.41504, value: 0.46 },
    { lat: 59.07374, lng: 10.19531, value: 0.31 },
    { lat: 56.34014, lng: 8.11890, value: 0.85 },
    { lat: 56.98016, lng: 9.31641, value: 0.79 },
    { lat: 56.64943, lng: 9.33838, value: 0.2 },
    { lat: 55.84988, lng: 8.28369, value: 0.93 },
    { lat: 55.27833, lng: 8.67920, value: 0.56 },
    { lat: 54.28747, lng: 19.12994, value: 0.58 },
    { lat: 54.36116, lng: 18.73993, value: 0.53 },
    { lat: 54.14937, lng: 18.95966, value: 0.45 },
    { lat: 54.32113, lng: 19.61334, value: 0.95 },
    { lat: 53.79335, lng: 11.41479, value: 0.32 },
    { lat: 55.89303, lng: 14.13940, value: 0.46 },
    { lat: 56.33405, lng: 15.97412, value: 0.67 },
    { lat: 57.10567, lng: 16.36963, value: 0.73 },
    { lat: 57.11164, lng: 16.99585, value: 0.57 },
    { lat: 57.12357, lng: 18.24829, value: 0.61 },
    { lat: 57.83232, lng: 18.86353, value: 0.4 },
    { lat: 57.58582, lng: 18.65479, value: 0.53 },
    { lat: 57.98408, lng: 16.52344, value: 0.67 },
    { lat: 58.61906, lng: 16.68823, value: 0.59 },
    { lat: 59.11888, lng: 17.67700, value: 0.95 },
    { lat: 59.47787, lng: 16.99585, value: 0.77 },
    { lat: 59.50018, lng: 16.18286, value: 0.35 },
    { lat: 59.58928, lng: 18.62183, value: 0.34 },
    { lat: 59.22585, lng: 18.50098, value: 0.62 },
    { lat: 59.70586, lng: 17.66602, value: 0.45 },
    { lat: 60.23368, lng: 18.47900, value: 0.33 },
    { lat: 60.72627, lng: 17.24854, value: 0.57 },
    { lat: 60.40775, lng: 19.96216, value: 0.39 },
    { lat: 60.02027, lng: 20.72021, value: 0.75 },
    { lat: 60.65636, lng: 21.47827, value: 0.3 },
    { lat: 60.11893, lng: 22.54395, value: 0.22 },
    { lat: 59.98731, lng: 24.04907, value: 0.35 },
    { lat: 60.27728, lng: 25.02686, value: 0.59 },
    { lat: 60.33171, lng: 25.86182, value: 0.74 },
    { lat: 60.55930, lng: 27.01538, value: 0.21 },
    { lat: 60.52689, lng: 27.70752, value: 0.93 },
    { lat: 60.20639, lng: 24.59839, value: 0.38 },
    { lat: 59.93231, lng: 22.88452, value: 0.79 },
    { lat: 59.49461, lng: 26.89453, value: 0.44 },
    { lat: 59.38288, lng: 24.68628, value: 0.52 },
    { lat: 59.14143, lng: 23.53271, value: 0.67 },
    { lat: 58.65909, lng: 23.79639, value: 0.42 },
    { lat: 58.20473, lng: 24.62036, value: 0.38 },
    { lat: 58.52167, lng: 23.01636, value: 0.58 },
    { lat: 58.86987, lng: 22.52197, value: 0.7 },
    { lat: 58.28567, lng: 22.08252, value: 0.68 },
    { lat: 57.88493, lng: 24.44458, value: 0.89 },
    { lat: 57.47967, lng: 24.49951, value: 0.43 },
    { lat: 57.21292, lng: 24.36768, value: 0.25 },
    { lat: 56.98016, lng: 23.71948, value: 0.91 },
    { lat: 57.33171, lng: 22.99438, value: 0.8 },
    { lat: 57.66818, lng: 22.46704, value: 0.44 },
    { lat: 57.49148, lng: 21.75293, value: 0.29 },
    { lat: 57.17125, lng: 21.42334, value: 0.32 },
    { lat: 56.73390, lng: 21.13770, value: 0.36 },
    { lat: 56.31578, lng: 21.02783, value: 0.49 },
    { lat: 55.89303, lng: 21.23657, value: 0.4 },
    { lat: 55.66442, lng: 21.14868, value: 0.89 },
    { lat: 55.36487, lng: 21.03058, value: 0.33 },
    { lat: 55.51911, lng: 21.11023, value: 0.57 },
    { lat: 55.47866, lng: 21.09100, value: 0.32 },
    { lat: 61.39080, lng: 21.55518, value: 0.43 },
    { lat: 62.69872, lng: 21.13770, value: 0.87 },
    { lat: 63.33673, lng: 21.24756, value: 0.82 },
    { lat: 63.47934, lng: 22.35718, value: 0.92 },
    { lat: 63.22311, lng: 21.99463, value: 0.64 },
    { lat: 64.25832, lng: 23.76343, value: 0.77 },
    { lat: 65.09007, lng: 25.35645, value: 0.67 },
    { lat: 65.82922, lng: 24.24683, value: 0.67 },
    { lat: 65.87865, lng: 22.70874, value: 0.35 },
    { lat: 65.62599, lng: 21.99463, value: 0.51 },
    { lat: 65.01129, lng: 21.11572, value: 0.65 },
    { lat: 64.41533, lng: 21.31348, value: 0.52 },
    { lat: 63.69925, lng: 20.24780, value: 0.49 },
    { lat: 62.75410, lng: 17.66602, value: 0.62 },
    { lat: 62.20075, lng: 17.33643, value: 0.87 },
    { lat: 61.65794, lng: 16.96289, value: 0.94 },
    { lat: 55.45316, lng: 13.24951, value: 0.63 },
    { lat: 55.15298, lng: 14.83154, value: 0.27 },
    { lat: 55.32206, lng: 15.18654, value: 0.62 },
];

// Statistical information about the dataset
export const corrosionRiskStats = {
    minValue: Math.min(...corrosionRiskData.map(point => point.value)),
    maxValue: Math.max(...corrosionRiskData.map(point => point.value)),
    averageValue: corrosionRiskData.reduce((sum, point) => sum + point.value, 0) / corrosionRiskData.length,
    totalPoints: corrosionRiskData.length,
};

// Color scale for corrosion heatmap visualization
export const getCorrosionRiskColor = (value: number): string => {
    // Normalize value between 0 and 1
    const normalized =
        corrosionRiskStats.maxValue === corrosionRiskStats.minValue
            ? 0.5
            : (value - corrosionRiskStats.minValue) /
            (corrosionRiskStats.maxValue - corrosionRiskStats.minValue);

    // Color gradient from green (low) to red (high)
    if (normalized < 0.2) return '#43a047'; // Green (lowest)
    if (normalized < 0.4) return '#ffee58'; // Yellow
    if (normalized < 0.6) return '#fbc02d'; // Orange
    if (normalized < 0.8) return '#fb8c00'; // Orange-Red
    return '#d32f2f'; // Deep Red (critical)
};

// Get intensity for heatmap (0-1 scale)
export const getCorrosionRiskIntensity = (value: number): number => {
    if (corrosionRiskStats.maxValue === corrosionRiskStats.minValue) return 1;
    return (value - corrosionRiskStats.minValue) / (corrosionRiskStats.maxValue - corrosionRiskStats.minValue);
};
