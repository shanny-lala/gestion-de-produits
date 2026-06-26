import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart as RNPieChart } from 'react-native-chart-kit';
import { theme } from '../theme/theme';

const screenWidth = Dimensions.get('window').width - theme.spacing.md * 4;

const PieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucune donnée disponible</Text>
      </View>
    );
  }

  // Couleurs pour le camembert (teal, purple, blue, et autres)
  const colors = [
    theme.colors.accent,
    theme.colors.primary,
    theme.colors.secondary,
    '#F472B6', // pink
    '#10B981', // green
  ];

  // Convertir tous les montants en nombres pour éviter la concaténation de chaînes
  const parsedData = data.map(item => ({
    ...item,
    montant: Number(item.montant || 0)
  }));

  const totalMontant = parsedData.reduce((sum, item) => sum + item.montant, 0);

  if (totalMontant === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Le chiffre d'affaires est de 0€</Text>
      </View>
    );
  }

  // Trier par montant décroissant
  const sortedData = [...parsedData].sort((a, b) => b.montant - a.montant);
  let chartData = [];
  
  if (sortedData.length > 5) {
    const top4 = sortedData.slice(0, 4);
    const others = sortedData.slice(4).reduce((sum, item) => sum + item.montant, 0);
    
    chartData = top4.map((item, index) => ({
      name: item.design.substring(0, 10) + '..', // Truncate name for chart
      montant: item.montant,
      color: colors[index % colors.length],
      legendFontColor: theme.colors.textSecondary,
      legendFontSize: 12,
    }));
    
    chartData.push({
      name: 'Autres',
      montant: others,
      color: colors[4],
      legendFontColor: theme.colors.textSecondary,
      legendFontSize: 12,
    });
  } else {
    chartData = sortedData.map((item, index) => ({
      name: item.design.substring(0, 10), 
      montant: item.montant,
      color: colors[index % colors.length],
      legendFontColor: theme.colors.textSecondary,
      legendFontSize: 12,
    }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Répartition du Chiffre d'Affaires</Text>
      <RNPieChart
        data={chartData}
        width={screenWidth}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={"montant"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 0]}
        absolute={false} // Montre le pourcentage si false, valeur absolue si true
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
  emptyContainer: {
    height: 200,
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

export default PieChart;
