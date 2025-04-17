import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { EmailListItem } from './EmailListItem';

interface EmailListProps {
  emails: string[];
}

/**
 * Displays a scrollable list of invited email addresses
 */
export const EmailList: React.FC<EmailListProps> = ({ emails }) => {
  if (emails.length === 0) return null;

  return (
    <View style={styles.invitedSection}>
      <Text style={styles.invitedTitle}>Invited Friends</Text>
      <FlatList
        data={emails}
        renderItem={({ item }) => <EmailListItem email={item} />}
        keyExtractor={(item) => item}
        style={styles.emailList}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  invitedSection: {
    flex: 1,
  },
  invitedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  emailList: {
    flex: 1,
  },
}); 