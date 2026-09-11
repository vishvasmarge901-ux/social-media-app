import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, FlatList, Image } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const dummyMessages = [
  { id: '1', username: 'john_doe', message: '😂 Haha', timestamp: 'Now', isSent: false, userImage: 'https://via.placeholder.com/40' },
  { id: '2', username: 'You', message: '👋 Hey!', timestamp: '5s ago', isSent: true, userImage: 'https://via.placeholder.com/40' },
  { id: '3', username: 'john_doe', message: '🔥 Amazing!', timestamp: '10s ago', isSent: false, userImage: 'https://via.placeholder.com/40' },
];

export default function ChatDetailScreen({ route }) {
  const [messages, setMessages] = useState(dummyMessages);
  const [messageText, setMessageText] = useState('');
  const [isVoiceMessage, setIsVoiceMessage] = useState(false);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        username: 'You',
        message: messageText,
        timestamp: 'Now',
        isSent: true,
        userImage: 'https://via.placeholder.com/40',
      };
      setMessages([newMessage, ...messages]);
      setMessageText('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageItem, item.isSent && styles.messageSent]}>
      {!item.isSent && <Image source={{ uri: item.userImage }} style={styles.messageAvatar} />}
      <View style={[styles.messageBubble, item.isSent && styles.messageBubbleSent]}>
        <Text style={[styles.messageText, item.isSent && styles.messageTextSent]}>{item.message}</Text>
      </View>
      {item.isSent && <Image source={{ uri: item.userImage }} style={styles.messageAvatar} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>john_doe</Text>
          <Text style={styles.headerStatus}>Active now</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="phone" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted={true}
        scrollEnabled={true}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.inputActionBtn}>
          <MaterialCommunityIcons name="plus-circle" size={28} color="#FFFC00" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Send a message..."
          placeholderTextColor="#999"
          value={messageText}
          onChangeText={setMessageText}
          multiline={true}
          maxHeight={100}
        />
        <TouchableOpacity
          style={styles.inputActionBtn}
          onPress={handleSendMessage}
        >
          <MaterialCommunityIcons name="send" size={24} color={messageText.trim() ? '#FFFC00' : '#ccc'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerInfo: { flex: 1, marginLeft: 12 },
  headerName: { fontWeight: 'bold', fontSize: 16, color: '#000' },
  headerStatus: { fontSize: 12, color: '#666', marginTop: 2 },
  messageItem: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 15, paddingVertical: 8 },
  messageSent: { justifyContent: 'flex-end' },
  messageAvatar: { width: 32, height: 32, borderRadius: 16, marginHorizontal: 8 },
  messageBubble: { maxWidth: '70%', backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10 },
  messageBubbleSent: { backgroundColor: '#FFFC00' },
  messageText: { fontSize: 14, color: '#000' },
  messageTextSent: { color: '#000' },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 15, paddingVertical: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  inputActionBtn: { padding: 8 },
  input: { flex: 1, marginHorizontal: 10, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, fontSize: 14, maxHeight: 100 },
});
