import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmailListItemProps {
  email: string;
}

export const EmailListItem: React.FC<EmailListItemProps> = ({ email }) => (
  <View style={styles.emailItem}>
    <Text style={styles.emailText}>{email}</Text>
  </View>
);

const styles = StyleSheet.create({
  emailItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 14,
    color: '#333',
  },
}); 