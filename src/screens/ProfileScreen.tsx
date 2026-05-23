import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppStore } from '../store/appStore';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const currentUser = useAppStore((s) => s.currentUser);
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle" size={100} color="#ccc" />
      </View>
      <Text style={styles.name}>{currentUser.name}, {currentUser.age}</Text>
      <Text style={styles.bio}>{currentUser.bio}</Text>

      <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40, backgroundColor: '#fff' },
  avatarContainer: { marginBottom: 12 },
  name: { fontSize: 24, fontWeight: '700', color: '#222' },
  bio: { fontSize: 15, color: '#666', marginTop: 8, textAlign: 'center', paddingHorizontal: 32 },
  editBtn: { marginTop: 24, backgroundColor: '#4caf50', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 24 },
  editBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
