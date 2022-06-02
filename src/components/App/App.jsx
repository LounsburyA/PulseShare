import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';


import ForumPage from '../ForumPage/ForumPage';
import PostDetailPage from '../PostDetailPage/PostDetailPage';
import AddPostPage from '../AddPostPage/AddPostPage';
import PostHistoryPage from '../PostHistoryPage/PostHistoryPage';
import AdminPage from '../AdminPage/AdminPage';
import ProfileRender from '../ProfileRender/ProfileRender';

// imports for MUI v5
import {
  createTheme,
  ThemeProvider
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#327b5b',
    },
    secondary: {
      main: '#ad3434',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          <Route
            // Shows ProfilePage
            exact
            path="/profile/:id"
          >
            < ProfileRender/>
          </Route>

          <Route
            // Shows PostListPage
            exact
            path="/posts"
          >
            <ForumPage />
          </Route>

          <Route
            // Shows postDetailPage
            exact
            path="/postDetail/:id"
          >
            <PostDetailPage />
          </Route>

          <ProtectedRoute
            // Shows AddPostPage
            exact
            path="/addPost"
          >
            <AddPostPage />
          </ProtectedRoute>

          <Route
            // Shows PostHistoryPage
            exact
            path="/postHistory"
          >
            <PostHistoryPage />
          </Route>

          <ProtectedRoute
            // Shows AdminPage
            exact
            path="/admin"
          >
            {/* user must have an access_level of 2 to view the Admin Page */}
            {user.access_level < 2 ?
              <Redirect to="/posts" />
              :
              <AdminPage />
            }
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/posts" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/posts" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
           
              <LandingPage />
            
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
