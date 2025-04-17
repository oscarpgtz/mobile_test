import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { EmailList } from '../components/InviteFriend/EmailList';
import { useInvitedEmails } from '../hooks/useInvitedEmails';
import { isValidEmail } from '../utils/validation';
import { INVITE_MESSAGES, EMAIL_TEMPLATE } from '../constants/messages';

const InviteFriendScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { invitedEmails, saveEmail, isEmailInvited } = useInvitedEmails();

  const handleInvite = async () => {
    // Input validation
    if (!isValidEmail(email)) {
      setMessage(INVITE_MESSAGES.INVALID_EMAIL);
      return;
    }

    // Check for duplicate invitation
    if (isEmailInvited(email)) {
      setMessage(INVITE_MESSAGES.ALREADY_INVITED);
      return;
    }

    // Prepare email content
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(EMAIL_TEMPLATE.SUBJECT)}&body=${encodeURIComponent(EMAIL_TEMPLATE.BODY)}`;

    try {
      // Check if device can handle mailto links
      const supported = await Linking.canOpenURL(mailtoUrl);
      
      if (supported) {
        await Linking.openURL(mailtoUrl);
      } else {
        // iOS simulator doesn't have a mail app
        // Alert.alert('Error', INVITE_MESSAGES.EMAIL_APP_ERROR);
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      Alert.alert('Error', INVITE_MESSAGES.INVITATION_ERROR);
    } finally {
      const saved = await saveEmail(email);
      if (saved) {
        setMessage(INVITE_MESSAGES.INVITATION_SENT);
        setEmail('');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Invite a Friend</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter friend's email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {message ? <Text style={styles.message}>{message}</Text> : null}

        <TouchableOpacity 
          style={styles.button}
          onPress={handleInvite}
        >
          <Text style={styles.buttonText}>Send Invite</Text>
        </TouchableOpacity>

        <EmailList emails={invitedEmails} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  message: {
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InviteFriendScreen; 