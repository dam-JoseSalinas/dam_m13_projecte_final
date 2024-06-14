import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "white"
    },
    messagesContainer: {
      flex: 1,
    },
    messageBubble: {
      maxWidth: '80%',
      marginVertical: 5,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#e0e0e0',
    },
    messageText: {
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginRight: 10,
    },
    sendButton: {
      backgroundColor: '#007bff',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    sendButtonText: {
      color: '#fff',
      fontSize: 16,
    },
});
export default styles;