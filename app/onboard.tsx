import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import useTheme from '@/hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import useOnboardStore from '@/stores/useOnboardStore';
import Button from '@/components/Button';

const ModalScreen = () => {
  const [index, setIndex] = useState(0);

  const { used, setUsed } = useOnboardStore();
  const { text, background } = useTheme();
  const insets = useSafeAreaInsets();

  const onboardingRef = useRef<Onboarding>(null);

  useFocusEffect(() => {
    if (used) {
        return;
    }

    setUsed();
  })

  const handleNext = () => {
    if (!onboardingRef.current) {
      return;
    }

    if (index === onboardingRef.current.props.pages.length - 1) {
      onboardingRef.current.props.onDone?.();
      return;
    }

    onboardingRef.current.goNext();
  }

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom, backgroundColor: background}]}>
      <Onboarding
        ref={onboardingRef}
        containerStyles={{ padding: 10 }}
        showSkip={false}
        showDone={false}
        showNext={false}
        bottomBarHighlight={false}
        pageIndexCallback={(index) => setIndex(index)}
        onDone={() => {
          router.dismiss();
        }}
        bottomBarHeight={80}
        DotComponent={({ selected }) => (
          <View
            style={{
              width: 10,
              height: 10,
              marginHorizontal: 5,
              borderRadius: 10,
              backgroundColor: text,
              opacity: selected ? 1 : 0.3,
            }}
          />
        )}
        pages={[
          {
            backgroundColor: background,
            image: <View style={{ width: 200, height: 200, borderRadius: 25, backgroundColor: '#000' }} />, // Replace with actual image
            title: 'Focus on Important Habits',
            subtitle: 'Add the habits you want to focus on and check them off daily!',
          },
          {
            backgroundColor: background,
            image: <View style={{ width: 200, height: 200, borderRadius: 50, backgroundColor: '#000' }} />, // Replace with actual image
            title: 'Earn Rewards',
            subtitle: 'Unlock cosmetics and customize your character as you progress!',
          },
          {
            backgroundColor: background,
            image: <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: '#000' }} />, // Replace with actual image
            title: 'See your Friends',
            subtitle: 'Add friends, see their characters and what they are up to!',
          },
        ]}
      />
      <View style={styles.actionContainer}>
        <Button 
          title={onboardingRef.current && index === onboardingRef.current.props.pages.length - 1 ? "Continue" : "Next"}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  actionContainer: {
    padding: 10,
  }
})