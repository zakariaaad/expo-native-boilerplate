import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading, error } = useAuth();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background dark:bg-background-dark"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center px-6 py-8"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-4xl font-bold text-foreground dark:text-foreground-dark">
          Create account
        </Text>
        <Text className="mt-2 mb-8 text-base text-muted dark:text-muted-dark">
          Join us today
        </Text>

        {error && (
          <Text className="mb-3 text-sm text-destructive dark:text-destructive-dark">
            {error}
          </Text>
        )}

        {[
          { value: name, setter: setName, placeholder: 'Full name', autoCapitalize: 'words' as const },
          { value: email, setter: setEmail, placeholder: 'Email', keyboardType: 'email-address' as const, autoCapitalize: 'none' as const },
          { value: password, setter: setPassword, placeholder: 'Password', secure: true },
        ].map(({ value, setter, placeholder, autoCapitalize, keyboardType, secure }) => (
          <TextInput
            key={placeholder}
            className="mb-3 h-13 rounded-xl border border-border bg-card px-4 text-base text-foreground dark:border-border-dark dark:bg-card-dark dark:text-foreground-dark"
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={setter}
            autoCapitalize={autoCapitalize ?? 'none'}
            keyboardType={keyboardType ?? 'default'}
            secureTextEntry={secure}
            autoCorrect={false}
          />
        ))}

        <TouchableOpacity
          className="mt-2 h-13 items-center justify-center rounded-xl bg-primary disabled:opacity-50 dark:bg-primary-dark"
          onPress={() => register({ name, email, password })}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-base font-semibold text-white">Create Account</Text>
          )}
        </TouchableOpacity>

        <Link href="/(auth)/login" asChild>
          <TouchableOpacity className="mt-6 items-center">
            <Text className="text-sm text-muted dark:text-muted-dark">
              Already have an account?{' '}
              <Text className="font-semibold text-primary dark:text-primary-dark">
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
