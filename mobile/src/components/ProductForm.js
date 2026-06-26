import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { theme } from '../theme/theme';

const ProductForm = ({ visible, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    num_produit: '',
    design: '',
    prix: '',
    quantite: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        num_produit: initialData.num_produit,
        design: initialData.design,
        prix: initialData.prix.toString(),
        quantite: initialData.quantite.toString(),
      });
    } else {
      setFormData({
        num_produit: '',
        design: '',
        prix: '',
        quantite: '',
      });
    }
    setErrors({});
  }, [initialData, visible]);

  const validate = () => {
    const newErrors = {};
    if (!formData.num_produit.trim()) newErrors.num_produit = 'Requis';
    if (!formData.design.trim()) newErrors.design = 'Requis';
    
    if (!formData.prix) newErrors.prix = 'Requis';
    else if (isNaN(formData.prix) || Number(formData.prix) < 0) newErrors.prix = 'Invalide';
    
    if (!formData.quantite) newErrors.quantite = 'Requis';
    else if (isNaN(formData.quantite) || !Number.isInteger(Number(formData.quantite)) || Number(formData.quantite) < 0) {
      newErrors.quantite = 'Invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        ...formData,
        prix: parseFloat(formData.prix),
        quantite: parseInt(formData.quantite, 10),
      });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{initialData ? 'Éditer Produit' : 'Nouveau Produit'}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formScroller} showsVerticalScrollIndicator={false}>
            {/* Num Produit */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Numéro Produit</Text>
              <TextInput
                style={[styles.input, errors.num_produit && styles.inputError]}
                placeholder="#P-XXXX"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.num_produit}
                onChangeText={(text) => setFormData({ ...formData, num_produit: text })}
              />
              {errors.num_produit && <Text style={styles.errorText}>{errors.num_produit}</Text>}
            </View>

            {/* Design */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Design / Nom</Text>
              <TextInput
                style={[styles.input, errors.design && styles.inputError]}
                placeholder="Nom du produit"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.design}
                onChangeText={(text) => setFormData({ ...formData, design: text })}
              />
              {errors.design && <Text style={styles.errorText}>{errors.design}</Text>}
            </View>

            {/* Prix & Quantité Row */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: theme.spacing.sm }]}>
                <Text style={styles.label}>Prix (€)</Text>
                <TextInput
                  style={[styles.input, errors.prix && styles.inputError]}
                  placeholder="0.00"
                  placeholderTextColor={theme.colors.textSecondary}
                  keyboardType="decimal-pad"
                  value={formData.prix}
                  onChangeText={(text) => setFormData({ ...formData, prix: text })}
                />
                {errors.prix && <Text style={styles.errorText}>{errors.prix}</Text>}
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: theme.spacing.sm }]}>
                <Text style={styles.label}>Quantité</Text>
                <TextInput
                  style={[styles.input, errors.quantite && styles.inputError]}
                  placeholder="0"
                  placeholderTextColor={theme.colors.textSecondary}
                  keyboardType="number-pad"
                  value={formData.quantite}
                  onChangeText={(text) => setFormData({ ...formData, quantite: text })}
                />
                {errors.quantite && <Text style={styles.errorText}>{errors.quantite}</Text>}
              </View>
            </View>
          </ScrollView>

          {/* Submit Button */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>{initialData ? 'Mettre à jour' : 'Ajouter Produit'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 15, 26, 0.8)', // theme background with opacity
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  modalContent: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    maxHeight: '90%',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.primaryLight,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  formScroller: {
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    marginLeft: 4,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: theme.spacing.lg,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: 16,
    alignItems: 'center',
    shadowColor: theme.colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductForm;
