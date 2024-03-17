// App.js

import React from 'react';
import TodoApp from './screens/TodoApp';
import { Provider as PaperProvider } from 'react-native-paper'; // Import PaperProvider
import store from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';



const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <TodoApp />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
