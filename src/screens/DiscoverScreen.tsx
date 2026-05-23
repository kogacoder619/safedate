import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/appStore';
import VerifiedBadge from '../components/VerifiedBadge';

export default function DiscoverScreen() {
  const { discoverQueue, likeProfile, passProfile } = useAppStore();
  const current = discoverQueue[0];

  if (!current) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No more profiles for now!</Text>
        <Text style={styles.emptySubtext}>Check back later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.photoPlaceholder}>
          <Ionicons name="person" size={80} color="#ccc" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{current.name}, {current.age}</Text>
          {current.location && <Text style={styles.location}>{current.location}</Text>}
          {current.phoneVerified && (
            <VerifiedBadge label="Phone Verified" />
          )}
          <Text style={styles.bio}>{current.bio}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, styles.passBtn]} onPress={() => passProfile(current.id)}>
          <Ionicons name="close" size={32} color="#ff4458" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.likeBtn]} onPress={() => likeProfile(current.id)}>
          <Ionicons name="heart" size={32} color="#4caf50" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', paddingTop: 20 },
  card: { width: '90%', backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 },
  photoPlaceholder: { height: 320, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center' },
  info: { padding: 16, gap: 6 },
  name: { fontSize: 22, fontWeight: '700', color: '#222' },
  location: { fontSize: 14, color: '#888' },
  bio: { fontSize: 15, color: '#555', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 32, marginTop: 24 },
  btn: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6 },
  passBtn: {},
  likeBtn: {},
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 20, fontWeight: '600', color: '#444' },
  emptySubtext: { fontSize: 15, color: '#888', marginTop: 8 },
});
