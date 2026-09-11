import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';

const dummyStories = [
  { id: '1', name: 'Your Story', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'john_doe', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'sarah_99', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'tech_guy', image: 'https://via.placeholder.com/150' },
];

const dummyPosts = [
  {
    id: '1',
    username: 'john_doe',
    userImage: 'https://via.placeholder.com/150',
    postImage: 'https://via.placeholder.com/600',
    likes: '1,243',
    caption: 'Beautiful sunset today! 🌅 #nature',
  },
  {
    id: '2',
    username: 'sarah_99',
    userImage: 'https://via.placeholder.com/150',
    postImage: 'https://via.placeholder.com/600',
    likes: '532',
    caption: 'Coding all night 💻✨',
  },
];

export default function App() {
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.userImage }} style={styles.avatarSmall} />
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <Feather name="more-vertical" size={20} color="#000" />
      </View>

      {/* Post Image */}
      <Image source={{ uri: item.postImage }} style={styles.postImage} />

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionIcon}><Feather name="heart" size={24} color="#000" /></TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}><Ionicons name="chatbubble-outline" size={24} color="#000" /></TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}><Feather name="send" size={24} color="#000" /></TouchableOpacity>
        </View>
        <Feather name="bookmark" size={24} color="#000" />
      </View>

      {/* Likes & Caption */}
      <Text style={styles.likes}>{item.likes} likes</Text>
      <View style={styles.captionContainer}>
        <Text style={styles.usernameBold}>{item.username}</Text>
        <Text style={styles.captionText}>{item.caption}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Instagram Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIcons}>
          <Feather name="heart" size={24} color="#000" style={styles.iconSpacing} />
          <Feather name="message-circle" size={24} color="#000" />
        </View>
      </View>

      {/* Main Feed */}
      <FlatList
        data={dummyPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          /* Stories Section */
          <View style={styles.storiesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dummyStories.map((story) => (
                <View key={story.id} style={styles.storyWrapper}>
                  <View style={styles.storyRing}>
                    <Image source={{ uri: story.image }} style={styles.storyImage} />
                  </View>
                  <Text style={styles.storyText} numberOfLines={1}>{story.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, height: 50, borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb' },
  logo: { fontSize: 24, fontWeight: 'bold', fontStyle: 'italic' },
  headerIcons: { flexDirection: 'row' },
  iconSpacing: { marginRight: 20 },
  storiesContainer: { paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb' },
  storyWrapper: { alignItems: 'center', marginHorizontal: 8 },
  storyRing: { width: 68, height: 68, borderRadius: 34, borderWidth: 2, borderColor: '#c13584', justifyContent: 'center', alignItems: 'center' },
  storyImage: { width: 62, height: 62, borderRadius: 31 },
  storyText: { fontSize: 12, marginTop: 4, width: 70, textAlign: 'center' },
  postContainer: { marginBottom: 15 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarSmall: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
  username: { fontWeight: 'bold', fontSize: 14 },
  usernameBold: { fontWeight: 'bold', fontSize: 14, marginRight: 5 },
  postImage: { width: '100%', height: 350 },
  postActions: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  leftActions: { flexDirection: 'row' },
  actionIcon: { marginRight: 15 },
  likes: { fontWeight: 'bold', paddingHorizontal: 10, marginBottom: 5 },
  captionContainer: { flexDirection: 'row', paddingHorizontal: 10, flexWrap: 'wrap' },
  captionText: { fontSize: 14, flex: 1 },
});
