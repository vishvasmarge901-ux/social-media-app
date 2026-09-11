import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const dummyNotifications = [
  { id: '1', type: 'like', username: 'john_doe', userImage: 'https://via.placeholder.com/50', postImage: 'https://via.placeholder.com/100', message: 'liked your post', timestamp: '2 hours ago', read: false },
  { id: '2', type: 'follow', username: 'sarah_99', userImage: 'https://via.placeholder.com/50', message: 'started following you', timestamp: '4 hours ago', read: false },
  { id: '3', type: 'comment', username: 'tech_guy', userImage: 'https://via.placeholder.com/50', postImage: 'https://via.placeholder.com/100', message: 'commented on your post', timestamp: '6 hours ago', read: true },
  { id: '4', type: 'like', username: 'design_pro', userImage: 'https://via.placeholder.com/50', postImage: 'https://via.placeholder.com/100', message: 'liked your post', timestamp: '1 day ago', read: true },
];

export default function NotificationsScreen() {
  const renderNotification = ({ item }) => (
    <TouchableOpacity style={[styles.notificationItem, !item.read && styles.notificationItemUnread]}>
      <Image source={{ uri: item.userImage }} style={styles.notificationAvatar} />
      <View style={styles.notificationContent}>
        <View>
          <Text style={styles.notificationText}>
            <Text style={styles.username}>{item.username}</Text>
            {' '}{item.message}
          </Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
      {item.postImage && <Image source={{ uri: item.postImage }} style={styles.notificationPostImage} />}
      {!item.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  notificationItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  notificationItemUnread: { backgroundColor: '#f9f9f9' },
  notificationAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  notificationContent: { flex: 1 },
  notificationText: { fontSize: 13, lineHeight: 18 },
  username: { fontWeight: 'bold' },
  timestamp: { fontSize: 11, color: '#999', marginTop: 4 },
  notificationPostImage: { width: 50, height: 50, borderRadius: 8 },
  unreadIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#0095f6', marginLeft: 10 },
});
