import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../theme/theme';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const renderRightActions = (progress, dragX) => {
    const editTrans = dragX.interpolate({
      inputRange: [-120, -60, 0],
      outputRange: [0, 0, 60],
      extrapolate: 'clamp',
    });
    const deleteTrans = dragX.interpolate({
      inputRange: [-60, 0],
      outputRange: [0, 60],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.actionsContainer}>
        <Animated.View style={[styles.actionButton, { transform: [{ translateX: editTrans }] }]}>
          <TouchableOpacity style={[styles.btn, styles.editBtn]} onPress={() => onEdit(product)}>
            <Ionicons name="pencil" size={24} color="#FFF" />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.actionButton, { transform: [{ translateX: deleteTrans }] }]}>
          <TouchableOpacity style={[styles.btn, styles.deleteBtn]} onPress={() => onDelete(product.id)}>
            <Ionicons name="trash" size={24} color="#FFF" />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.num_produit}</Text>
          </View>
          <Text style={styles.designText} numberOfLines={1}>{product.design}</Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Prix</Text>
            <Text style={styles.value}>{formatCurrency(product.prix)}</Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Qté</Text>
            <Text style={styles.value}>{formatNumber(product.quantite)}</Text>
          </View>
          <View style={styles.infoColRight}>
            <Text style={styles.label}>Montant</Text>
            <Text style={styles.amountValue}>{formatCurrency(product.montant)}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  badge: {
    backgroundColor: theme.colors.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
  },
  badgeText: {
    ...theme.typography.caption,
    color: theme.colors.primaryLight,
    fontWeight: 'bold',
  },
  designText: {
    ...theme.typography.subtitle,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoCol: {
    flex: 1,
  },
  infoColRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  label: {
    ...theme.typography.caption,
    marginBottom: 2,
  },
  value: {
    ...theme.typography.body,
    fontWeight: '600',
  },
  amountValue: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.success,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    borderRadius: theme.borderRadius.md,
    marginLeft: theme.spacing.xs,
  },
  editBtn: {
    backgroundColor: theme.colors.secondary,
  },
  deleteBtn: {
    backgroundColor: theme.colors.danger,
  },
  actionText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default ProductCard;
