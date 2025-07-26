// corrosion.ts
// Coastal Corrosion Risk Data Example
// Each point contains [latitude, longitude, coastal_corrosion_risk_value]

export interface CorrosionRiskPoint {
    lat: number;
    lng: number;
    value: number; // Corrosion risk value, scale 0.0 (none) to 1.0 (critical)
}

export const corrosionRiskData: CorrosionRiskPoint[] = [
    // Example: Hel Peninsula, Poland, known for active coastal erosion
    { lat: 54.615, lng: 18.800, value: 0.81 },
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
