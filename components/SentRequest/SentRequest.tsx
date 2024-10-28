import { StyleSheet, Text, View } from 'react-native';
import useTheme from '@/hooks/useTheme';
import User from '../User/User';

const SentRequest = (props: { user_id: string }) => {
  const { user_id } = props;

  const { text, background } = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: text, borderColor: text}]}>
      {user_id ? (
        <>
          <User user_id={user_id} isRow  />
          <Text style={[styles.tip, {color: background}]}>User has yet to accept or deny your request!</Text>
        </>
      ) : (
        <Text style={{ color: background }}>Loading...</Text>
      )}
    </View>
  );
};

export default SentRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 2,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 10,
    display: 'flex',
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
  },
  username: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  tip: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
  },
});