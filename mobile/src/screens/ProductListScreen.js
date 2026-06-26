import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import StatsBar from '../components/StatsBar';
import * as api from '../services/api';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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
      Alert.alert('Erreur', 'Impossible de charger les données');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleAddPress = () => {
    setEditingProduct(null);
    setModalVisible(true);
  };

  const handleEditPress = (product) => {
    setEditingProduct(product);
    setModalVisible(true);
  };

  const handleDeletePress = (id) => {
    Alert.alert(
      'Supprimer',
      'Voulez-vous vraiment supprimer ce produit ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteProduct(id);
              fetchData();
            } catch (error) {
              Alert.alert('Erreur', 'Impossible de supprimer le produit');
            }
          }
        }
      ]
    );
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, formData);
      } else {
        await api.addProduct(formData);
      }
      setModalVisible(false);
      setEditingProduct(null);
      fetchData();
    } catch (error) {
      const msg = error.response?.data?.message || 'Une erreur est survenue';
      Alert.alert('Erreur', msg);
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestion de Produits</Text>
        <Text style={styles.headerSubtitle}>{products.length} produits</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onEdit={handleEditPress} 
            onDelete={() => handleDeletePress(item.id)} 
          />
        )}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={48} color={theme.colors.textSecondary} />
            <Text style={styles.emptyText}>Aucun produit enregistré</Text>
          </View>
        )}
      />

      <StatsBar stats={stats} />

      <TouchableOpacity style={styles.fab} onPress={handleAddPress}>
        <Ionicons name="add" size={32} color="#FFF" />
      </TouchableOpacity>

      <ProductForm 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProduct}
      />
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
  headerSubtitle: {
    ...theme.typography.subtitle,
    marginTop: 4,
  },
  listContainer: {
    padding: theme.spacing.md,
    paddingBottom: 100, // Espace pour le FAB et la StatsBar
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90, // Au dessus de la StatsBar
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default ProductListScreen;
