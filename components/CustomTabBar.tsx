import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check, Plus, User } from 'react-native-feather';

interface TabBarProps {
  state: {
    index: number;
    routes: { key: string; name: string }[];
  };
  navigation: {
    navigate: (name: string) => void;
  };
}

const CustomTabBar: React.FC<TabBarProps> = ({ state, navigation }) => {
  const currentRouteName = state.routes[state.index].name;

  return (
    <View style={styles.tabBar}>
      <TabItem
        label="Completed"
        Icon={Check}
        isActive={currentRouteName === 'Completed'}
        onPress={() => navigation.navigate('Completed')}
      />
      <TabItem
        label="To Do"
        Icon={Plus}
        isActive={currentRouteName === 'ToDo'}
        onPress={() => navigation.navigate('ToDo')}
      />
      <TabItem
        label="Profile"
        Icon={User}
        isActive={currentRouteName === 'Profile'}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

interface TabItemProps {
  label: string;
  Icon: React.FC<{ stroke: string; width: number; height: number }>;
  isActive: boolean;
  onPress: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ label, Icon, isActive, onPress }) => {
  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
      <Icon stroke={isActive ? '#030303' : '#A0A0A0'} width={22} height={22} />
      <Text style={[styles.tabText, isActive && styles.activeText]}>{label}</Text>
      {isActive && <View style={styles.underline} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabBar: {
  flexDirection: 'row',
  height: 60,
  backgroundColor: '#F1EFEC',
  justifyContent: 'space-around',
  alignItems: 'center',
  // 🧽 Soft shadow instead of border
  shadowColor: '#123458',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.04,
  shadowRadius: 4,
  elevation: 5,
},
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 4,
  },
  activeText: {
    color: '#030303',
    fontWeight: '600',
  },
  underline: {
    marginTop: 4,
    height: 2,
    width: 24,
    backgroundColor: '#030303',
    borderRadius: 1,
  },
});

export default CustomTabBar;
