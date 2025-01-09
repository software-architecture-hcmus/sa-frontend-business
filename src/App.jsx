import { BrowserRouter , Route, Routes } from 'react-router-dom';
import RouterUrl from './const/RouterUrl';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import PrivateContainer from './components/PrivateContainer';

import { SocketContextProvider } from './contexts/socket';
import { PlayerContextProvider } from './contexts/player';

import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Events from './pages/events';
import EventDetail from './pages/events/detail';
import Game from './pages/game';
import GameDetail from './pages/game/detail';
import QuizGame from './pages/game/quiz';
function App() {

  return (
    <SocketContextProvider>
        <PlayerContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path={RouterUrl.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />
              <Route path={RouterUrl.REGISTER} element={<PublicRoute><Register /></PublicRoute>} />
              <Route path={RouterUrl.HOME} element={<PrivateRoute><PrivateContainer title="Home"><Home /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.EVENTS} element={<PrivateRoute><PrivateContainer title="Events"><Events /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.EVENT_CREATE} element={<PrivateRoute><PrivateContainer title="Create Event"><EventDetail /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.EVENT_DETAIL} element={<PrivateRoute><PrivateContainer title="Event Detail"><EventDetail /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.GAME} element={<PrivateRoute><PrivateContainer title="Game"><Game /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.GAME_CREATE} element={<PrivateRoute><PrivateContainer title="Create Game"><GameDetail /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.GAME_DETAIL} element={<PrivateRoute><PrivateContainer title="Game Detail"><GameDetail /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.GAME_QUIZ} element={<PrivateRoute><PrivateContainer title="Game Quiz"><QuizGame /></PrivateContainer></PrivateRoute>}/>
            </Routes>
          </BrowserRouter>
      </PlayerContextProvider>
    </SocketContextProvider>
  )
}

export default App
