import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView, useColorScheme, StatusBar, ScrollView } from 'react-native';
import { Header } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { Expense } from '../store/types';
import { ADD_EXPENSE } from '../store/actions/expenseActions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

const expenseTypes = ['Personal', 'Education', 'Transport', 'Food', 'Entertainment'];

const AddExpenseScreen: React.FC = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState((new Date()).getTime());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('Personal');
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

  const addExpense = () => {
    const newExpense: Expense = {
      id: Math.random(), // Generate a unique ID for the expense
      description,
      amount: Number(amount),
      date: new Date(date).getTime(),
      type: selectedType,
    };

    dispatch({ type: ADD_EXPENSE, payload: newExpense });
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
          centerComponent={{ text: 'Add Expense', style: { fontSize: 18, color: 'white' } }}
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
            <Text style={styles.label}>Amount:</Text>
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
          <Button title="Add Expense" onPress={addExpense} />
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

export default AddExpenseScreen;
