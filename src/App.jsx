import './App.scss';
import { AppContextProvider } from './Context/ContextProvider';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


// Pages
import { Frontpage } from './Pages/Frontpage/Frontpage';
import { Catalogpage } from './Pages/Catalogpage/Catalogpage';
import { Detailspage } from './Pages/Detailspage/Detailspage';
import { Loginpage } from './Pages/Loginpage/Loginpage';
import { Adminpage } from './Pages/Adminpage/Adminpage';

// Components
import { Navigation } from './Components/Navigation/Navigation'
import { Footer } from './Components/Footer/Footer';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Navigation />

        <Route exact path="/"> <Redirect to="/Forside" /> </Route>
        <Route exact path="/Forside" component={Frontpage} />
        <Route exact path="/Udvalg" component={Catalogpage} />
        <Route exact path="/Udvalg/:Address" component={Detailspage} />
        <Route exact path="/Login" component={Loginpage} />
        <Route exact path="/Admin" component={Adminpage} />

        <Footer />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
