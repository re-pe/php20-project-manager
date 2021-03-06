import React, { createContext, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import {
    BrowserRouter as Router,

    Link,
    Redirect, Route, Switch,

    useHistory,
    useLocation,
} from 'react-router-dom';

// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

export default function AuthExample() {
    return (
        <Container>
            <ProvideAuth>
                <Router>
                    <div>
                        <AuthButton />

                        <ul>
                            <li>
                                <Link to="/public">Public Page</Link>
                            </li>
                            <li>
                                <Link to="/protected">Protected Page</Link>
                            </li>
                        </ul>

                        <Switch>
                            <Route path="/public">
                                <PublicPage />
                            </Route>
                            <Route path="/login">
                                <LoginPage />
                            </Route>
                            <PrivateRoute path="/protected">
                                <ProtectedPage />
                            </PrivateRoute>
                        </Switch>
                    </div>
                </Router>
            </ProvideAuth>
        </Container>
    );
}

const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = (cb) => fakeAuth.signin(() => {
        setUser('user');
        cb();
    });

    const signout = (cb) => fakeAuth.signout(() => {
        setUser(null);
        cb();
    });

    return {
        user,
        signin,
        signout,
    };
}

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

function AuthButton() {
    const history = useHistory();
    const auth = useAuth();

    return auth.user ? (
        <p>
            Welcome!
            {' '}
            <button
                type="button"
                onClick={() => {
                    auth.signout(() => history.push('/'));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();
    return (
        <Route
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
            render={({ location }) => (auth.user ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location },
                    }}
                />
            ))}
        />
    );
}

function PublicPage() {
    return <h3>Public</h3>;
}

function ProtectedPage() {
    return <h3>Protected</h3>;
}

function LoginPage() {
    const history = useHistory();
    const location = useLocation();
    const auth = useAuth();

    const { from } = location.state || { from: { pathname: '/' } };
    const login = () => {
        auth.signin(() => {
            history.replace(from);
        });
    };

    return (
        <div>
            <p>
                You must log in to view the page at
                {from.pathname}
            </p>
            <button type="button" onClick={login}>Log in</button>
        </div>
    );
}
