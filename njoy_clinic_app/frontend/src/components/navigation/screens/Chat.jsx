import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Platform, LogBox, View } from 'react-native';
import uuid from 'react-native-uuid';
import themeContext from '../../../constants/ThemeContext';
import styles from '../../../styles/ChatStyles'

LogBox.ignoreLogs([
  'Warning: Avatar: Support for defaultProps will be removed from function components in a future major release.',
]);

const getWebSocketURL = () => {
  if (Platform.OS === 'android') {
    return 'ws://10.0.2.2:8080'; // Para emuladores de Android
  }
  return 'ws://192.168.1.33:8080'; // Cambia esto a la IP local de tu computadora
};

const userLocalID = uuid.v4(); // Generar un ID único para el usuario local

export default function ChatScreen() {
  const theme = useContext(themeContext)
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      ws.current = new WebSocket(getWebSocketURL());

      ws.current.onopen = () => {
        console.log('Conexión WebSocket establecida');
      };

      ws.current.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log('Mensaje recibido:', receivedMessage);

        // Usar sender_id para diferenciar mensajes recibidos
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [{
            _id: receivedMessage._id,
            text: receivedMessage.text,
            createdAt: new Date(receivedMessage.createdAt),
            user: {
              _id: receivedMessage.sender_id, // Usar sender_id del mensaje recibido
            },
          }])
        );
      };

      ws.current.onerror = (error) => {
        console.error('Error en WebSocket:', error);
      };

      ws.current.onclose = () => {
        console.log('Conexión WebSocket cerrada');
        setTimeout(() => {
          connectWebSocket();
        }, 1000);
      };
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const onSend = useCallback((newMessages = []) => {
    const message = newMessages[0];

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        _id: message._id,
        text: message.text,
        createdAt: message.createdAt.toString(),
        user: { _id: userLocalID }, // Envía el mensaje con el ID único del usuario local
      }));
    }

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  // Personalizar la burbuja de mensaje
  const renderBubble = (props) => {
    // Estilo del mensaje recibido
    if (props.currentMessage.user._id !== userLocalID) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#DCF8C6', // Verde claro como iMessage en iPhones
            },
          }}
          textStyle={{
            left: {
              color: '#000', // Texto en color negro para el mensaje recibido
            },
          }}
        />
      );
    }

    // Estilo del mensaje enviado
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#007AFF', // Azul claro para el mensaje enviado
          },
        }}
        textStyle={{
          right: {
            color: '#FFF', // Texto en color blanco para el mensaje enviado
          },
        }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{ _id: userLocalID }} // ID del usuario local único
        listViewProps={{ ref: flatListRef }}
        renderBubble={renderBubble} // Renderizar la burbuja personalizada
        // No mostrar el nombre de usuario en los mensajes
        renderUsernameOnMessage={false}
      />
    </View>
  );
}
