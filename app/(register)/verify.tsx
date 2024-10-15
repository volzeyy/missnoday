import InputField from "@/components/InputField";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { supabase } from "@/config/supabase";
import useCreateAccountStore from "@/stores/useCreateAccountStore";
import useSessionStore from "@/stores/useSessionStore";

const Page = () => {
  const { auth } = useCreateAccountStore()
  const { setSession } = useSessionStore();

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const insets = useSafeAreaInsets();

  const validateInput = async () => {
    try {
      setLoading(true);

      if (token.length !== 6) {
        throw new Error("Token must be 6 characters long");
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        email: auth?.email || "",
        token: token,
        type: "email",
      });

      if (error) {
        throw error;
      }

      setSession(session);
      handleNavigateToTabs();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToTabs = () => {
    router.replace("/(main)/");
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="6-digit token sent to email"
          value={token}
          onChangeText={setToken}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={validateInput}
          isDisabled={!token || loading}
        />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
  },
  inputContainer: {
    gap: 20,
    width: "100%",
  },
  buttonContainer: {
    gap: 20,
    width: "100%",
    alignItems: "center",
  },
});
