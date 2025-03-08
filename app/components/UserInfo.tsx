import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

interface User {
  name: string;
  email: string;
  birthdate: string;
}

interface UserInfoProps {
  user: User | null;
  darkMode: boolean;
}

export default function UserInfo({ user, darkMode }: UserInfoProps) {
  return (
    <View style={[styles.userInfo, darkMode && styles.darkUserInfo]}>
      <Text style={[styles.userInfoText, darkMode && styles.darkText]}>User Information</Text>
      {user ? (
        <>
          <Text style={[styles.userInfoText, darkMode && styles.darkText]}>Name: {user.name}</Text>
          <Text style={[styles.userInfoText, darkMode && styles.darkText]}>Email: {user.email}</Text>
          <Text style={[styles.userInfoText, darkMode && styles.darkText]}>Birthdate: {user.birthdate}</Text>
        </>
      ) : (
        <Text style={[styles.userInfoText, darkMode && styles.darkText]}>No user information available.</Text>
      )}
    </View>
  );
}
