import React, { Suspense, lazy, useContext } from 'react';
import { AuthContext, AuthContextProvider } from './context/authContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicRoute } from '@router';
import { PrivateRoute } from './router/PrivateRoute';
import { AREA, HOME, PRIVATE, ROL, TICKET, USER } from './router/path';
import { UsuarioState } from './context/usuario/UsuarioContext';
import Loading from './components/Loading';
import Usuario from './pages/Usuario/Usuario';
import Ticket from './pages/ticket/Ticket';
import { TicketState } from './context/TicketContext';
// import { Login } from '@pages';

function App() {
  // 
  const Login = lazy(() => import('./pages/login/Login'));
  const Area = lazy(() => import('./pages/area/Area'));
  const Rol = lazy(() => import('./pages/rol/Rol'));

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Suspense fallback={<div><Loading /></div>}>
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route index element={<Login />} />
            </Route>
            <Route path={PRIVATE} element={<PrivateRoute />}>
              <Route path={USER} element={<UsuarioState><Usuario /></UsuarioState>} />
              <Route path={AREA} element={<Area />} />
              <Route path={ROL} element={<UsuarioState><Rol /></UsuarioState>} />
              <Route path={TICKET} element={<TicketState> <Ticket /></TicketState>} />


              {/* <Route path={HOME} element={<Home />} />
              <Route path={TICKET} element={<Ticket />} />
               */}

            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
