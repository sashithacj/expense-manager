import React, { useEffect, useState } from 'react';
import { View, Text, Button, useColorScheme, SafeAreaView, StatusBar, FlatList, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect, MapStateToProps, useDispatch, useSelector } from 'react-redux';
import { Header } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

import { RootState, Expense } from '../store/types';
import { REMOVE_EXPENSE } from '../store/actions/expenseActions';

interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
  expenses: Expense[];
  totalExpenses: number;
}

const expenseTypes = ['All', 'Personal', 'Education', 'Transport', 'Food', 'Entertainment'];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, expenses, totalExpenses }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? "black" : "white", flex: 1
  };

  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ type: 'All', date: '' });
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const showDatePicker = () => {
      setIsDatePickerVisible(true);
    };

    const hideDatePicker = () => {
      setIsDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
      setFilter({type: filter.type, date: date});
      hideDatePicker();
    };


  const removeExpense = (id: number) => {
    dispatch({ type: REMOVE_EXPENSE, payload: { id } });
  };

  const navigateToUpdateScreen = (expense: Expense) => {
    navigation.navigate('UpdateExpense', { expense });
  };

  const maxExpense = 10000;

  useEffect(() => {
    const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
    const isCloseToLimit = totalExpense >= 0.9 * maxExpense;

    if (isCloseToLimit) {
      Alert.alert(
        'Warning',
        `Your monthly expenses have reached the maximum expense limit.`,
        [{ text: 'OK' }],
      );
    }
  }, [expenses]);

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
          <Text style={styles.description}>{(item.description == "") ? "[Not-Set]": item.description}</Text>
          <Text style={styles.amount}>Rs. {(item.amount == "") ? 0 : item.amount}</Text>
          <Text style={styles.date}>Date: {formatDate(item.date)}</Text>
          <View><Text style={styles.type}>{item.type}</Text></View>
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
      centerComponent={{ text: 'Personal Expense Manager', style: { fontSize: 18, color: 'white' } }}
    />

      <ScrollView style={{flex: 1, paddingBottom: 30}}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>My Current Expenses</Text>
        <Button title="Add Expense" onPress={() => navigation.navigate('AddExpense')} style={{marginVertical: 30, width: 50}}/>
        </View>

        <Text style={{marginHorizontal: 15}}>Filter By Expense Type: </Text>
        <Picker
         style={{marginTop: -6}}
          selectedValue={filter.type}
          onValueChange={(itemValue, itemIndex) => setFilter({type: itemValue, date: filter.date})}
        >
        {expenseTypes.map((type) => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
        </Picker>

        <FlatList
          data={expenses.filter((expense) =>
            filter.type == "All" || expense.type.includes(filter.type)
            )}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          style={{marginBottom: 20}}
        />

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
    marginTop: 8,
    borderRadius: 8,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    marginHorizontal: 8
  },
      filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    filterInput: {
      flex: 1,
      marginRight: 16,
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#F2F2F2',
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
    color: 'black',
    fontStyle: 'italic'
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#2974FA',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
    marginRight: 8,
    minWidth: 70
  },
  updateButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
    marginRight: 8,
    marginTop: 3,
    minWidth: 70
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  },
});

const mapStateToProps: MapStateToProps<HomeScreenProps, {}, RootState> = (state) => {
  return {
    expenses: state.expenses,
    totalExpenses: state.expenses.reduce((acc, expense) => acc + expense.amount, 0),
  };
};

export default connect(mapStateToProps)(HomeScreen);
