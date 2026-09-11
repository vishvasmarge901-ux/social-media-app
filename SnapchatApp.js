import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, TouchableOpacity, Animated, PanResponder, Dimensions } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const dummySnaps = [
  {
    id: '1',
    username: 'john_doe',
    userImage: 'https://via.placeholder.com/60',
    snapImage: 'https://via.placeholder.com/400x800',
    timestamp: 'Now',
    viewed: false,
    duration: 5,
  },
  {
    id: '2',
    username: 'sarah_99',
    userImage: 'https://via.placeholder.com/60',
    snapImage: 'https://via.placeholder.com/400x800',
    timestamp: '2m ago',
    viewed: true,
    duration: 5,
  },
  {
    id: '3',
    username: 'tech_guy',
    userImage: 'https://via.placeholder.com/60',
    snapImage: 'https://via.placeholder.com/400x800',
    timestamp: '5m ago',
    viewed: false,
    duration: 5,
  },
  {
    id: '4',
    username: 'design_pro',
    userImage: 'https://via.placeholder.com/60',
    snapImage: 'https://via.placeholder.com/400x800',
    timestamp: '1h ago',
    viewed: true,
    duration: 5,
  },
];

export default function SnapchatApp() {
  const [activeTab, setActiveTab] = useState('camera');
  const [currentSnapIndex, setCurrentSnapIndex] = useState(0);
  const [snaps, setSnaps] = useState(dummySnaps);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleSnapViewed = (snapId) => {
    setSnaps(snaps.map(snap => {
      if (snap.id === snapId) {
        return { ...snap, viewed: true };
      }
      return snap;
    }));
  };

  const renderSnapChat = ({ item, index }) => (
    <View style={styles.snapChatItem}>
      <View style={[styles.snapWrapper, !item.viewed && styles.snapWrapperUnviewed]}>
        <Image source={{ uri: item.snapImage }} style={styles.snapImage} />
        
        {/* Top Bar */}
        <View style={styles.snapTopBar}>
          <View style={styles.userHeaderSnap}>
            <Image source={{ uri: item.userImage }} style={styles.snapUserImage} />
            <View>
              <Text style={styles.snapUsername}>{item.username}</Text>
              <Text style={styles.snapTime}>{item.timestamp}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Bottom Actions */}
        <View style={styles.snapBottomBar}>
          <View style={styles.snapActions}>
            <TouchableOpacity style={styles.snapActionBtn}>
              <MaterialCommunityIcons name="heart" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.snapActionBtn}>
              <MaterialCommunityIcons name="send" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.snapActionBtn}>
              <MaterialCommunityIcons name="download" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Story Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>
      </View>
    </View>
  );

  const CameraScreen = () => (
    <View style={styles.cameraContainer}>
      <View style={styles.cameraPreview}>
        <Image
          source={{ uri: 'https://via.placeholder.com/400x800' }}
          style={styles.cameraImage}
        />
      </View>

      {/* Camera Controls */}
      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.controlBtn}>
          <MaterialCommunityIcons name="flash" size={32} color="#FFFC00" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.captureButton}>
          <View style={styles.captureBtnInner} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlBtn}>
          <MaterialCommunityIcons name="camera-flip" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Top Actions */}
      <View style={styles.cameraTopActions}>
        <TouchableOpacity style={styles.topActionBtn}>
          <MaterialCommunityIcons name="bell" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topActionBtn}>
          <MaterialCommunityIcons name="magnify" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ChatScreen = () => (
    <View style={styles.chatContainer}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>Chat</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="plus" size={28} color="#FFFC00" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={snaps}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatItem}
            onPress={() => handleSnapViewed(item.id)}
          >
            <View style={[styles.chatAvatar, !item.viewed && styles.chatAvatarUnviewed]}>
              <Image source={{ uri: item.userImage }} style={styles.chatAvatarImage} />
            </View>
            <View style={styles.chatInfo}>
              <Text style={styles.chatUsername}>{item.username}</Text>
              <Text style={styles.chatMessage}>👋 Wave</Text>
            </View>
            {!item.viewed && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
      />
    </View>
  );

  const MemoriesScreen = () => (
    <View style={styles.memoriesContainer}>
      <View style={styles.memoriesHeader}>
        <Text style={styles.memoriesTitle}>Memories</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="magnify" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.memoriesGrid}>
        {[
          { id: 1, title: 'Today' },
          { id: 2, title: 'Yesterday' },
          { id: 3, title: 'This Week' },
          { id: 4, title: 'This Month' },
          { id: 5, title: 'Older' },
          { id: 6, title: 'Camera Roll' },
        ].map(item => (
          <TouchableOpacity key={item.id} style={styles.memoryCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150x200' }}
              style={styles.memoryImage}
            />
            <Text style={styles.memoryTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const ProfileScreen = () => (
    <View style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="cog" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="plus" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Image
          source={{ uri: 'https://via.placeholder.com/120' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileUsername}>vishvas_marge</Text>
        <Text style={styles.profileScore}>👻 Score: 45,321</Text>
        <TouchableOpacity style={styles.profileEditBtn}>
          <Text style={styles.profileEditBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>142</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1.2K</Text>
          <Text style={styles.statLabel}>Stories Sent</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>523</Text>
          <Text style={styles.statLabel}>Snaps Received</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {activeTab === 'camera' && <CameraScreen />}
      {activeTab === 'chat' && <ChatScreen />}
      {activeTab === 'stories' && (
        <FlatList
          data={snaps}
          renderItem={renderSnapChat}
          keyExtractor={(item) => item.id}
          pagingEnabled={true}
          scrollEnabled={true}
          snapToInterval={height}
          scrollEventThrottle={16}
        />
      )}
      {activeTab === 'memories' && <MemoriesScreen />}
      {activeTab === 'profile' && <ProfileScreen />}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navBtn, activeTab === 'camera' && styles.navBtnActive]}
          onPress={() => setActiveTab('camera')}
        >
          <MaterialCommunityIcons
            name="camera"
            size={28}
            color={activeTab === 'camera' ? '#FFFC00' : '#fff'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navBtn, activeTab === 'chat' && styles.navBtnActive]}
          onPress={() => setActiveTab('chat')}
        >
          <MaterialCommunityIcons
            name="chat-bubble"
            size={28}
            color={activeTab === 'chat' ? '#FFFC00' : '#fff'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navBtn, activeTab === 'stories' && styles.navBtnActive]}
          onPress={() => setActiveTab('stories')}
        >
          <MaterialCommunityIcons
            name="play-circle"
            size={28}
            color={activeTab === 'stories' ? '#FFFC00' : '#fff'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navBtn, activeTab === 'memories' && styles.navBtnActive]}
          onPress={() => setActiveTab('memories')}
        >
          <MaterialCommunityIcons
            name="image-multiple"
            size={28}
            color={activeTab === 'memories' ? '#FFFC00' : '#fff'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navBtn, activeTab === 'profile' && styles.navBtnActive]}
          onPress={() => setActiveTab('profile')}
        >
          <MaterialCommunityIcons
            name="account-circle"
            size={28}
            color={activeTab === 'profile' ? '#FFFC00' : '#fff'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  
  // Camera Styles
  cameraContainer: { flex: 1, backgroundColor: '#000' },
  cameraPreview: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cameraImage: { width: '100%', height: '100%' },
  cameraControls: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 30, backgroundColor: 'rgba(0,0,0,0.3)' },
  controlBtn: { padding: 15 },
  captureButton: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  captureBtnInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff' },
  cameraTopActions: { position: 'absolute', top: 20, right: 20, flexDirection: 'column', gap: 15 },
  topActionBtn: { padding: 12, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 50 },

  // Chat Styles
  chatContainer: { flex: 1, backgroundColor: '#fff' },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  chatTitle: { fontSize: 28, fontWeight: 'bold', color: '#000' },
  chatItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  chatAvatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12, borderWidth: 2, borderColor: '#ccc' },
  chatAvatarUnviewed: { borderColor: '#FFFC00', borderWidth: 3 },
  chatAvatarImage: { width: '100%', height: '100%', borderRadius: 28 },
  chatInfo: { flex: 1 },
  chatUsername: { fontWeight: 'bold', fontSize: 15, color: '#000' },
  chatMessage: { fontSize: 13, color: '#666', marginTop: 4 },
  unreadDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#FFFC00' },

  // Stories Styles
  snapChatItem: { height, width, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  snapWrapper: { width: '90%', height: '95%', borderRadius: 20, overflow: 'hidden', backgroundColor: '#000' },
  snapWrapperUnviewed: { borderWidth: 3, borderColor: '#FFFC00' },
  snapImage: { width: '100%', height: '100%' },
  snapTopBar: { position: 'absolute', top: 20, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userHeaderSnap: { flexDirection: 'row', alignItems: 'center' },
  snapUserImage: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  snapUsername: { fontWeight: 'bold', fontSize: 14, color: '#fff' },
  snapTime: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  snapBottomBar: { position: 'absolute', bottom: 30, left: 20, right: 20 },
  snapActions: { flexDirection: 'row', gap: 12 },
  snapActionBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  progressBar: { position: 'absolute', top: 10, left: 20, right: 20, height: 2, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 1 },
  progressFill: { height: '100%', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 1 },

  // Memories Styles
  memoriesContainer: { flex: 1, backgroundColor: '#fff' },
  memoriesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  memoriesTitle: { fontSize: 28, fontWeight: 'bold', color: '#000' },
  memoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, paddingVertical: 5 },
  memoryCard: { width: '50%', paddingHorizontal: 5, paddingVertical: 5, aspectRatio: 3/4 },
  memoryImage: { width: '100%', height: '85%', borderRadius: 15, marginBottom: 8 },
  memoryTitle: { fontSize: 12, fontWeight: '600', color: '#000' },

  // Profile Styles
  profileContainer: { flex: 1, backgroundColor: '#fff' },
  profileHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  profileTitle: { fontSize: 28, fontWeight: 'bold', color: '#000' },
  profileInfo: { alignItems: 'center', paddingVertical: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  profileUsername: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  profileScore: { fontSize: 14, color: '#666', marginTop: 4 },
  profileEditBtn: { marginTop: 12, paddingHorizontal: 30, paddingVertical: 10, borderWidth: 2, borderColor: '#FFFC00', borderRadius: 20 },
  profileEditBtnText: { fontWeight: 'bold', color: '#000', fontSize: 14 },
  profileStats: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },

  // Bottom Navigation
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, backgroundColor: '#000', borderTopWidth: 0.5, borderTopColor: '#333' },
  navBtn: { padding: 12, alignItems: 'center' },
  navBtnActive: {},
});
