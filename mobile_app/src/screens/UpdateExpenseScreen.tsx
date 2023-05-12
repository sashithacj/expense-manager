import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView, useColorScheme, StatusBar, ScrollView, Alert } from 'react-native';
import { Header } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Expense } from '../store/types';
import { UPDATE_EXPENSE } from '../store/actions/expenseActions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

const expenseTypes = ['Personal', 'Education', 'Transport', 'Food', 'Entertainment'];

interface UpdateExpenseScreenProps {
  navigation: any;
  route: any;
}

const UpdateExpenseScreen: React.FC<UpdateExpenseScreenProps> = ({ navigation, route }) => {
  const { expense } = route.params;
  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [date, setDate] = useState(new Date(expense.date).getTime());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(expense.type);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? "black" : "white", flex: 1
  };
  const dispatch = useDispatch();

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate.getTime());
    hideDatePicker();
  };

  const maxExpense = 10000;
  const expenses = useSelector((state) => state.expenses);

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

  const updateExpense = () => {
    const updatedExpense: Expense = {
      ...expense,
      description,
      amount: Number(amount),
      date: new Date(date).getTime(),
      type: selectedType,
    };

    dispatch({ type: UPDATE_EXPENSE, payload: updatedExpense });
    navigation.goBack();
  };

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
            leftComponent={<Button title="Back" onPress={() => navigation.goBack()} />}
            centerComponent={{ text: 'Update Expense', style: { fontSize: 18, color: 'white' } }}
          />
          <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount (Rs):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
          <Text>{new Date(date).toDateString()}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Type:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedType}
          onValueChange={(itemValue) => setSelectedType(itemValue as string)}
        >
          {expenseTypes.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>
      <Button title="Update Expense" onPress={updateExpense} />
      </ScrollView>
      </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    scrollContainer: {
      flexGrow: 1,
    },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
});


export default UpdateExpenseScreen;
