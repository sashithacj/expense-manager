import React from 'react';
import { View, Text, Button, useColorScheme, SafeAreaView, StatusBar } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect, MapStateToProps } from 'react-redux';

import { RootState } from '../store/types';

interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
  totalExpenses: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, totalExpenses }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
      backgroundColor: isDarkMode ? "black" : "white",
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View>
              <Text>My Expenses</Text>
              <Text>Total Expenses: {totalExpenses}</Text>
              <Button title="Add Expense" onPress={() => navigation.navigate('AddExpense')} />
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps: MapStateToProps<HomeScreenProps, {}, RootState> = (state) => {
  return {
    totalExpenses: state.expenses.reduce((acc, expense) => acc + expense.amount, 0),
  };
};

export default connect(mapStateToProps)(HomeScreen);
