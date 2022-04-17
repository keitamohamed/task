import './App.css';
import RouteSwitch from "./route/RouteSwitch";
import NotificationProvider from "./component/context/NotificationProvider";

function App() {
  return (
    <div className="App">
      <NotificationProvider>
          <RouteSwitch/>
      </NotificationProvider>
    </div>
  );
}

export default App;
