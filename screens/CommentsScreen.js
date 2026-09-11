import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

const dummyComments = [
  {
    id: '1',
    username: 'john_doe',
    userImage: 'https://via.placeholder.com/40',
    comment: 'Amazing photo! Love it 😍',
    likes: 24,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    username: 'sarah_99',
    userImage: 'https://via.placeholder.com/40',
    comment: 'Where was this taken?',
    likes: 12,
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    username: 'tech_guy',
    userImage: 'https://via.placeholder.com/40',
    comment: 'Beautiful composition and lighting! 📸',
    likes: 8,
    timestamp: '30 minutes ago',
  },
];

export default function CommentsScreen() {
  const [comments, setComments] = useState(dummyComments);
  const [liked, setLiked] = useState({});

  const toggleCommentLike = (commentId) => {
    setLiked(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <Image source={{ uri: item.userImage }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUsername}>{item.username}</Text>
          <Text style={styles.commentTimestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.commentText}>{item.comment}</Text>
        <View style={styles.commentActions}>
          <TouchableOpacity onPress={() => toggleCommentLike(item.id)}>
            <Text style={styles.actionText}>
              {liked[item.id] ? '❤️' : '👍'} {item.likes + (liked[item.id] ? 1 : 0)}
            </Text>
          </TouchableOpacity>
          <Text style={styles.actionText}>Reply</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, paddingVertical: 10 },
  commentItem: { flexDirection: 'row', marginBottom: 15 },
  commentAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
  commentContent: { flex: 1 },
  commentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  commentUsername: { fontWeight: 'bold', fontSize: 13, marginRight: 8 },
  commentTimestamp: { fontSize: 11, color: '#999' },
  commentText: { fontSize: 13, marginBottom: 4, lineHeight: 18 },
  commentActions: { flexDirection: 'row' },
  actionText: { fontSize: 12, color: '#999', marginRight: 15 },
});
