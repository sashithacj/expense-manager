# Personal Expense Tracking Mobile App

This is a personal expense tracking mobile application built using React Native with TypeScript for the front-end and NodeJS with TypeScript for the backend. The app allows users to track their expenses by adding, updating, and removing expenses. It also allows users to view and filter expenses based on expense types. Additionally, the app includes a feature to set a maximum monthly expense amount and shows an alert when the total monthly expense is close to the limit.

## Features

- Add/Update/Remove Expenses (Description, Date, Type & etc.)
- View/Filter Expenses
- Set max monthly expense amount (I set default as Rs. 10,000)
- Show an alert when the total monthly expense is close to the limit
- Dashboard to view statistics

## Technologies Used

- React Native with TypeScript
- NodeJS with TypeScript
- PouchDB (NoSQL Database)

## Screenshots

1. Home Screen
2. Add Expense Screen
3. Expense List Screen
4. Dashboard Screen
5. Settings Screen

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PouchDB

### Installation

1. Clone the repository
```
git clone https://github.com/sashithacj/expense-manager.git
```

2. Install the dependencies for the mobile app
```
cd mobile_app
npm install
```

3. Install the dependencies for the back-end
```
cd ../backend
npm install
```

4. Start the back-end server
```
npm start
```

5. Start the front-end app
```
cd ../mobile_app
npm start
```

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [NodeJS](https://nodejs.org/)
- [PouchDB](https://pouchdb.com//)
