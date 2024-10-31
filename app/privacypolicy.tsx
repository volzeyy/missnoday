import { StyleSheet, Text, View, ScrollView } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <View style={{ flex: 1, paddingTop: 20}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
        <Text style={styles.header}>Privacy Policy for Miss no Day</Text>
        <Text style={styles.text}>Effective Date: October 31, 2024</Text>

        <Text style={styles.subHeader}>1. Introduction</Text>
        <Text style={styles.text}>
          Welcome to Miss no Day (“we”, “our”, “us”). This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our application available on iOS and Android (the “App”).
        </Text>

        <Text style={styles.subHeader}>2. Contact Information</Text>
        <Text style={styles.text}>
          If you have any questions about this Privacy Policy or our data practices, please contact us at:
        </Text>
        <Text style={styles.text}>Email: voldemarezerin@gmail.com</Text>

        <Text style={styles.subHeader}>3. Information We Collect</Text>
        <Text style={styles.text}>
          We collect personal information that you voluntarily provide to us when registering or using the App: Name, Email address.
        </Text>

        <Text style={styles.subHeader}>4. How We Use Your Information</Text>
        <Text style={styles.text}>
          The information we collect is used to enhance your experience using the App. Specifically, to personalize your experience by showing your username and name. The email address is retained for communication purposes and user account verification or recovery.
        </Text>

        <Text style={styles.subHeader}>5. Data Sharing and Disclosure</Text>
        <Text style={styles.text}>
          We do not share your personal information with third parties, except as necessary to comply with legal obligations or protect our rights.
        </Text>

        <Text style={styles.subHeader}>6. User Rights</Text>
        <Text style={styles.text}>
          You have the right to access, modify, or delete your personal information. To exercise these rights, please contact us at voldemarezerin@gmail.com with your specific request.
        </Text>

        <Text style={styles.subHeader}>7. Security of Your Information</Text>
        <Text style={styles.text}>
          We prioritize the security of your personal information and use reasonable organizational, technical, and administrative measures. Your data is protected by email and password verification and stored securely in our database policies, facilitated by Supabase.
        </Text>

        <Text style={styles.subHeader}>8. Cookies and Tracking Technologies</Text>
        <Text style={styles.text}>
          Our App does not use cookies or other tracking technologies.
        </Text>

        <Text style={styles.subHeader}>9. Children’s Privacy</Text>
        <Text style={styles.text}>
          Our App is not intended for use by children under 13, and we do not knowingly collect personal information from children.
        </Text>

        <Text style={styles.subHeader}>10. Changes to This Privacy Policy</Text>
        <Text style={styles.text}>
          We may update this Privacy Policy from time to time. You will be notified of any changes through a popup notification in the App.
        </Text>

        <Text style={styles.subHeader}>11. Third-Party Services</Text>
        <Text style={styles.text}>
          Our App does not utilize third-party services that collect information used to identify you.
        </Text>

        <Text style={styles.subHeader}>12. Data Retention</Text>
        <Text style={styles.text}>
          We retain your personal information for as long as necessary to provide you with services and as required by applicable law.
        </Text>

        <Text style={styles.text}>
          By using Miss no Day, you agree to the collection and use of information in accordance with this Privacy Policy. If you have any concerns or need clarity, we encourage you to reach out to us.
        </Text>
      </ScrollView>
    </View>
  );
}

export default PrivacyPolicy

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
});