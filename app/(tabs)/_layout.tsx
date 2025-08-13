import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { TabBarBackground } from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tabBarButton = (props: BottomTabBarButtonProps) => {
    const style: any = props.style ?? {};
    return (
      <Pressable
        style={({ pressed, focused }) => [
          style,
          {
            opacity: pressed || focused ? 0.6 : 1.0,
            height: 100,
            borderWidth: 2,
            borderColor: focused
              ? Colors[colorScheme ?? 'light'].tint
              : 'transparent',
          },
        ]}
      >
        {props.children}
      </Pressable>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // tabBarButton,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 100,
        },
        tabBarLabelStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 5,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={35} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={35} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
