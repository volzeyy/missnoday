import { StyleSheet, Text, View } from 'react-native'
import Avatar from '../Avatar'
import useFetchUser from '@/hooks/useFetchUser';
import UserProps from '@/types/UserProps';
import Streak from '../Streak';
import { router } from 'expo-router';

const User = (props: {
    user_id?: string, 
    user?: Partial<UserProps>
    isRow?: boolean
}) => {
  const { user_id, user, isRow } = props;

  const userData = useFetchUser(user_id || undefined);

  const handleNavigateToUserProfile = () => {
    if (user_id) {
        router.navigate(`/(main)/user/${user_id}`);
    }

    if (user) {
        router.navigate("/(main)/customize");
    }
  }

  if (isRow) {
    return (
        <View style={[styles.container, {flexDirection: "row"}]}>
            <Avatar 
                src={user ? user.avatar_url : userData?.avatar_url}
                onPress={handleNavigateToUserProfile}
            />
            <View style={[styles.userInfoContainer, {justifyContent: "flex-start", alignItems: "flex-start"}]}>
                <Text style={styles.name}>{user ? user.full_name : userData?.full_name}</Text>
                <Text style={styles.username}>@{user ? user.username : userData?.username}</Text>
                <Streak days={user ? user.streak : userData?.streak} />
            </View>
        </View>
    )
  }

  return (
    <View style={styles.container}>
        <View>
            <Avatar 
                src={user ? user.avatar_url : userData?.avatar_url}
                onPress={handleNavigateToUserProfile}
            />
        </View>
        <View style={styles.userInfoContainer}>
            <Text style={styles.username}>{user ? user.username : userData?.username}</Text>
            <Streak days={user ? user.streak : userData?.streak} />
        </View>
    </View>
  )
}

export default User

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    userInfoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        fontSize: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
    }
})