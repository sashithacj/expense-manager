# Personal Expense Tracking Mobile App

This is a personal expense tracking mobile application built using React Native with TypeScript for the front-end and NodeJS with TypeScript for the backend. The app allows users to track their expenses by adding, updating, and removing expenses. It also allows users to view and filter expenses based on expense types. Additionally, the app includes a feature to set a maximum monthly expense amount and shows an alert when the total monthly expense is close to the limit.

## Features

- Add/Update/Remove Expenses (Description, Date, Type & etc.)
- View/Filter Expenses
- Set max monthly expense amount (I set default as Rs. 10,000)
- Show an alert when the total monthly expense is close to the limit

## Things ongoing (Pending)

- Connect APIs to mobile app using Axios
- Create Dashboard in Node + Using Chart.js to show statistics of Expenses
- Create an user login system
- Themes (Light/Dark)

## Technologies Used

- React Native with TypeScript
- NodeJS with TypeScript
- PouchDB (NoSQL Database)

## Time Used (11 hours Approx.)

- Tuesday 7pm to 10 pm
- Wednesday 7pm to 10 pm
- Thurday 7pm to 11 pm
- Friday

## Screenshots

<div style="display: flex; flex-direction: row; justify-content: space-between;">
  <img src="https://raw.githubusercontent.com/sashithacj/expense-manager/main/screenshots/Screenshot_1683870179.png" width="200" />
  <img src="https://raw.githubusercontent.com/sashithacj/expense-manager/main/screenshots/Screenshot_1683870194.png" width="200" />
  <img src="https://raw.githubusercontent.com/sashithacj/expense-manager/main/screenshots/Screenshot_1683870207.png" width="200" />
  <img src="https://raw.githubusercontent.com/sashithacj/expense-manager/main/screenshots/Screenshot_1683870219.png" width="200" />
  <img src="https://raw.githubusercontent.com/sashithacj/expense-manager/main/screenshots/Screenshot_1683870313.png" width="200" />
</div>

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
