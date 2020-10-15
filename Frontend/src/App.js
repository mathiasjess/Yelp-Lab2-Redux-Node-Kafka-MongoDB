import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allYelpReducers from './reducer/index'
const store = createStore(allYelpReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

//  render Main component to App component
function App() {
  return (
    // Use Browser Router to route to different pages

    <BrowserRouter>
      <Provider store={store}>

        <div className="App">
          {/* App Component Has a Child Component called Main */}
          <Main />
        </div>
      </Provider>
    </BrowserRouter>
  );

}

// Export the App component so that it can be used in index.js

export default App;
