import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@invited_emails';

interface UseInvitedEmailsReturn {
  invitedEmails: string[];
  saveEmail: (email: string) => Promise<boolean>;
  isEmailInvited: (email: string) => boolean;
}

/**
 * Custom hook to manage invited emails state and persistence
 * Handles loading, saving, and checking for duplicate emails
 */
export const useInvitedEmails = (): UseInvitedEmailsReturn => {
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  // Load saved emails on mount
  useEffect(() => {
    loadInvitedEmails();
  }, []);

  const loadInvitedEmails = async () => {
    try {
      const storedEmails = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedEmails) {
        setInvitedEmails(JSON.parse(storedEmails));
      }
    } catch (error) {
      console.error('Error loading emails:', error);
      Alert.alert('Error', 'Failed to load invited emails');
    }
  };

  const saveEmail = async (newEmail: string): Promise<boolean> => {
    try {
      const emailToSave = newEmail.toLowerCase();
      const updatedEmails = [...invitedEmails, emailToSave];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEmails));
      setInvitedEmails(updatedEmails);
      return true;
    } catch (error) {
      console.error('Error saving email:', error);
      Alert.alert('Error', 'Failed to save email');
      return false;
    }
  };

  const isEmailInvited = (email: string): boolean => {
    return invitedEmails.includes(email.toLowerCase());
  };

  return {
    invitedEmails,
    saveEmail,
    isEmailInvited,
  };
}; 