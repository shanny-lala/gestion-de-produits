import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../theme/theme';
import * as api from '../services/api';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { formatCurrency } from '../utils/formatters';

const ChartsScreen = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [productsRes, statsRes] = await Promise.all([
        api.getProducts(),
        api.getStats()
      ]);
      setProducts(productsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytique & Stats</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* KPI Cards */}
        <View style={styles.kpiContainer}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Total Produits</Text>
            <Text style={styles.kpiValue}>{products.length}</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Valeur Moyenne</Text>
            <Text style={[styles.kpiValue, { color: theme.colors.primaryLight }]}>
              {products.length > 0 && stats 
                ? formatCurrency(stats.montant_total / products.length) 
                : '$0.00'}
            </Text>
          </View>
        </View>

        {/* Historgramme */}
        <BarChart data={products} />

        {/* Camembert */}
        <PieChart data={products} />

        {/* Stats Récapitulatives */}
        {stats && (
          <View style={styles.statsSummaryContainer}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Minimum</Text>
              <Text style={styles.summaryMin}>{formatCurrency(stats.montant_min)}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Maximum</Text>
              <Text style={styles.summaryMax}>{formatCurrency(stats.montant_max)}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Montant Total</Text>
              <Text style={styles.summaryTotal}>{formatCurrency(stats.montant_total)}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    ...theme.typography.h1,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  kpiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginHorizontal: 4,
    ...theme.shadows.small,
  },
  kpiLabel: {
    ...theme.typography.caption,
    marginBottom: theme.spacing.xs,
  },
  kpiValue: {
    ...theme.typography.h2,
  },
  statsSummaryContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  summaryBox: {
    flex: 1,
  },
  summaryLabel: {
    ...theme.typography.caption,
    marginBottom: 4,
  },
  summaryMin: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.primaryLight,
  },
  summaryMax: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
  summaryTotal: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.success,
  },
});

export default ChartsScreen;
