import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import CastCrew from './pages/CastCrew.jsx';
import Movies from './pages/Movies.jsx';
import Page from './components/Page.jsx';
import Shows from './pages/Shows.jsx';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Page><Movies/></Page>} />
                <Route path="/shows" element={<Page><Shows/></Page>} />
                <Route path="/castandcrew" element={<Page><CastCrew/></Page>} />
            </Routes>
        </BrowserRouter>
    );
};
    
export default App;