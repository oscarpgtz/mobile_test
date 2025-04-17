export const INVITE_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email addresssss',
  ALREADY_INVITED: 'This email has already been invited',
  INVITATION_SENT: 'Invitation sent successfully!',
  EMAIL_APP_ERROR: 'Unable to open email app',
  INVITATION_ERROR: 'Failed to send invitation',
} as const;

export const EMAIL_TEMPLATE = {
  SUBJECT: 'Join me on our amazing app!',
  BODY: 'Hey! I thought you might be interested in this app. Join me!',
} as const; 