import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart as RNBarChart } from 'react-native-chart-kit';
import { theme } from '../theme/theme';

const screenWidth = Dimensions.get('window').width - theme.spacing.md * 4;

const BarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucune donnée disponible</Text>
      </View>
    );
  }

  // Prenez les 5 premiers produits ou un sous-ensemble pertinent
  const chartData = {
    labels: data.slice(0, 5).map(item => item.num_produit),
    datasets: [
      {
        data: data.slice(0, 5).map(item => item.montant),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White for numbers
    labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`, // textSecondary
    barPercentage: 0.6,
    decimalPlaces: 0,
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: theme.colors.border,
      strokeWidth: 1,
    },
    fillShadowGradientFrom: theme.colors.accent,
    fillShadowGradientTo: theme.colors.primaryLight,
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 0.8,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distribution des Montants (Top 5)</Text>
      <RNBarChart
        data={chartData}
        width={screenWidth}
        height={220}
        yAxisLabel="€"
        chartConfig={chartConfig}
        style={styles.chart}
        showValuesOnTopOfBars={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  title: {
    ...theme.typography.subtitle,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  chart: {
    marginVertical: 8,
    borderRadius: theme.borderRadius.md,
  },
  emptyContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
});

export default BarChart;
