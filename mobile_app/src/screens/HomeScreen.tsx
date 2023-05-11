import React from 'react';
import { View, Text, Button, useColorScheme, SafeAreaView, StatusBar, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect, MapStateToProps, useDispatch } from 'react-redux';
import { Header } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

import { RootState, Expense } from '../store/types';
import { REMOVE_EXPENSE } from '../store/actions/expenseActions';

interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
  expenses: Expense[];
  totalExpenses: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, expenses, totalExpenses }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? "black" : "white", flex: 1
  };

  const dispatch = useDispatch();

  const removeExpense = (id: number) => {
    dispatch({ type: REMOVE_EXPENSE, payload: { id } });
  };

  const navigateToUpdateScreen = (expense: Expense) => {
    navigation.navigate('UpdateExpense', { expense });
  };

  const renderItem = ({ item }: { item: Expense }) => {
      const formatDate = (timestamp: number): string => {
        const date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
      };

    return (
      <View style={styles.expenseContainer}>
        <View style={styles.expenseDetails}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.amount}>Amount: ${item.amount}</Text>
          <Text style={styles.date}>Date: {formatDate(item.date)}</Text>
          <Text style={styles.type}>Type: {item.type}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => navigateToUpdateScreen(item)}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeExpense(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
    <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
    />
    <Header
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ['#2974FA', '#00C6FB'],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      centerComponent={{ text: 'Expense Manager', style: { fontSize: 18, color: 'white' } }}
    />

      <ScrollView style={{flex: 1, paddingBottom: 30}}>
        <Text>My Expenses</Text>
        <FlatList
          data={expenses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
        <Button title="Add Expense" onPress={() => navigation.navigate('AddExpense')} style={{marginVertical: 30}}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  expenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  expenseDetails: {
    flex: 1,
    marginRight: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    color: 'gray',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  type: {
    fontSize: 14,
    color: 'gray',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#2974FA',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
    marginRight: 8,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 14
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14
  },
});

const mapStateToProps: MapStateToProps<HomeScreenProps, {}, RootState> = (state) => {
  return {
    expenses: state.expenses,
    totalExpenses: state.expenses.reduce((acc, expense) => acc + expense.amount, 0),
  };
};

export default connect(mapStateToProps)(HomeScreen);
