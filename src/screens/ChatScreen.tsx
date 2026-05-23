import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppStore } from '../store/appStore';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function ChatScreen({ route }: Props) {
  const { matchId } = route.params;
  const [text, setText] = useState('');
  const messages = useAppStore((s) => s.messages[matchId] ?? []);
  const sendMessage = useAppStore((s) => s.sendMessage);

  const send = () => {
    if (!text.trim()) return;
    sendMessage(matchId, text.trim());
    setText('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={[...messages].reverse()}
        keyExtractor={(m) => m.id}
        inverted
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.senderId === 'me' ? styles.mine : styles.theirs]}>
            <Text style={[styles.bubbleText, item.senderId === 'me' ? styles.mineText : styles.theirsText]}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity onPress={send} style={styles.sendBtn}>
          <Ionicons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  list: { padding: 16 },
  bubble: { maxWidth: '75%', borderRadius: 16, padding: 10, marginBottom: 8 },
  mine: { alignSelf: 'flex-end', backgroundColor: '#4caf50' },
  theirs: { alignSelf: 'flex-start', backgroundColor: '#fff' },
  bubbleText: { fontSize: 15 },
  mineText: { color: '#fff' },
  theirsText: { color: '#222' },
  inputRow: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', alignItems: 'flex-end', gap: 8, borderTopWidth: 1, borderColor: '#eee' },
  input: { flex: 1, fontSize: 15, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, maxHeight: 100 },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4caf50', alignItems: 'center', justifyContent: 'center' },
});
