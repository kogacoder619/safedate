import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/appStore';

export default function EditProfileScreen() {
  const currentUser = useAppStore((s) => s.currentUser);
  const updateProfile = useAppStore((s) => s.updateProfile);
  const navigation = useNavigation();

  const [name, setName] = useState(currentUser.name);
  const [age, setAge] = useState(String(currentUser.age));
  const [bio, setBio] = useState(currentUser.bio);

  const save = () => {
    updateProfile({ name, age: parseInt(age, 10) || currentUser.age, bio });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Age</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="number-pad" />

      <Text style={styles.label}>Bio</Text>
      <TextInput style={[styles.input, styles.bioInput]} value={bio} onChangeText={setBio} multiline />

      <TouchableOpacity style={styles.saveBtn} onPress={save}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff', flexGrow: 1 },
  label: { fontSize: 13, fontWeight: '600', color: '#888', marginBottom: 4, marginTop: 16 },
  input: { fontSize: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, color: '#222', backgroundColor: '#fafafa' },
  bioInput: { height: 100, textAlignVertical: 'top' },
  saveBtn: { marginTop: 32, backgroundColor: '#4caf50', paddingVertical: 14, borderRadius: 24, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
