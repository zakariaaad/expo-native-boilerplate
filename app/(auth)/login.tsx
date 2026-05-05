import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background dark:bg-background-dark"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center px-6">
        <Text className="text-4xl font-bold text-foreground dark:text-foreground-dark">
          Welcome back
        </Text>
        <Text className="mt-2 mb-8 text-base text-muted dark:text-muted-dark">
          Sign in to your account
        </Text>

        {error && (
          <Text className="mb-3 text-sm text-destructive dark:text-destructive-dark">
            {error}
          </Text>
        )}

        <TextInput
          className="mb-3 h-13 rounded-xl border border-border bg-card px-4 text-base text-foreground dark:border-border-dark dark:bg-card-dark dark:text-foreground-dark"
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          className="mb-2 h-13 rounded-xl border border-border bg-card px-4 text-base text-foreground dark:border-border-dark dark:bg-card-dark dark:text-foreground-dark"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="mt-2 h-13 items-center justify-center rounded-xl bg-primary disabled:opacity-50 dark:bg-primary-dark"
          onPress={() => login({ email, password })}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-base font-semibold text-white">Sign In</Text>
          )}
        </TouchableOpacity>

        <Link href="/(auth)/register" asChild>
          <TouchableOpacity className="mt-6 items-center">
            <Text className="text-sm text-muted dark:text-muted-dark">
              Don't have an account?{' '}
              <Text className="font-semibold text-primary dark:text-primary-dark">
                Register
              </Text>
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
