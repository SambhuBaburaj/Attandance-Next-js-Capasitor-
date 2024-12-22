// components/Tabs.jsx
import { Redirect, Route, useLocation } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { cog, flash, list } from 'ionicons/icons';

import Home from './Home';
import Lists from './Lists';
import ListDetail from './ListDetail';
import Settings from './Settings';

import Temp from './Temp';
import LoginPage from './Login';
import AttendancePage from './Attandance';
import { ProtectedRoute } from './protective-routes/ProtectiveRoutes';
import { RoleRoute } from './protective-routes/RoleAuth';
import UnauthorizedPage from './protective-routes/SignedOutUser';
import { LoginProtectedRoute } from './protective-routes/LoginProtection';
import TeacherManagement from './admin/TeacherList';

const Tabs = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const getTabVisibility = () => {
    const publicPaths = ['/login', '/unauthorized'];
    return !publicPaths.includes(location.pathname) ? 'flex' : 'none';
  };

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Public Routes */}
        <LoginProtectedRoute path="/login" exact={true}>
          <LoginPage />
          {/* <Route path="/login" component={LoginPage} exact={true} />
        <Route path="/unauthorized" component={UnauthorizedPage} exact={true} /> */}
        </LoginProtectedRoute>
        <UnauthorizedPage />

        {/* Protected Routes */}
        <ProtectedRoute path="/admin/home" exact={true}>
          <RoleRoute allowedRoles={[1]}>
            <Home />
          </RoleRoute>
        </ProtectedRoute>
        <ProtectedRoute path="/teacher/home" exact={true}>
          <RoleRoute allowedRoles={[2]}>
            <Home />
          </RoleRoute>
        </ProtectedRoute>
        <ProtectedRoute path="/lists" exact={true}>
          <RoleRoute allowedRoles={[1, 2]}>
            {' '}
            {/* Example: Only admin and teachers */}
            <Lists />
          </RoleRoute>
        </ProtectedRoute>

        <ProtectedRoute path="/lists/:listId" exact={true}>
          <RoleRoute allowedRoles={[1, 2]}>
            <ListDetail />
          </RoleRoute>
        </ProtectedRoute>

        <ProtectedRoute path="/attendance" exact={true}>
          <RoleRoute allowedRoles={[1, 2]}>
            <AttendancePage />
          </RoleRoute>
        </ProtectedRoute>

        <ProtectedRoute path="/temp" exact={true}>
          <RoleRoute allowedRoles={[1]}>
            {' '}
            {/* Example: Admin only */}
            <Temp />
          </RoleRoute>
        </ProtectedRoute>

        <ProtectedRoute path="/settings" exact={true}>
          <RoleRoute allowedRoles={[1, 2, 3]}>
            <Settings />
          </RoleRoute>
        </ProtectedRoute>
        <ProtectedRoute path="/admin/teacher-list" exact={true}>
          <RoleRoute allowedRoles={[1, 2, 3]}>
            <TeacherManagement />
          </RoleRoute>
        </ProtectedRoute>
        <Route path="" render={() => <Redirect to="/login" />} exact={true} />
        <Route
          path="/admin"
          render={() => <Redirect to="/admin/home" />}
          exact={true}
        />
        <Route
          path="/teacher"
          render={() => <Redirect to="/login" />}
          exact={true}
        />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" style={{ display: getTabVisibility() }}>
        <IonTabButton tab="tab1" href="/home">
          <IonIcon icon={flash} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        {/* Conditional tab based on role */}
        {[1, 2].includes(user.role_id) && (
          <IonTabButton tab="tab2" href="/lists">
            <IonIcon icon={list} />
            <IonLabel>Lists</IonLabel>
          </IonTabButton>
        )}

        <IonTabButton tab="tab3" href="/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;

// components/Unauthorized.jsx
