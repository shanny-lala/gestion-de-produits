import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import { formatCurrency } from '../utils/formatters';

const StatsBar = ({ stats }) => {
  if (!stats) return null;

  return (
    <View style={styles.container}>
      <View style={styles.statBox}>
        <Text style={styles.label}>Min</Text>
        <Text style={[styles.value, { color: theme.colors.primaryLight }]}>
          {formatCurrency(stats.montant_min)}
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.statBox}>
        <Text style={styles.label}>Max</Text>
        <Text style={[styles.value, { color: theme.colors.accent }]}>
          {formatCurrency(stats.montant_max)}
        </Text>
      </View>

      <View style={styles.divider} />
      
      <View style={styles.statBox}>
        <Text style={styles.label}>Total</Text>
        <Text style={[styles.value, { color: theme.colors.success }]}>
          {formatCurrency(stats.montant_total)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceElevated,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    ...theme.shadows.medium,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },
  label: {
    ...theme.typography.caption,
    marginBottom: 4,
  },
  value: {
    ...theme.typography.subtitle,
    fontWeight: 'bold',
  },
});

export default StatsBar;
