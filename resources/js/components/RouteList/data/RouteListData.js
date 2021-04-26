import {
    Welcome,
    Dashboard,
    CreateTask,
    EditTask,
    Empty,
    AuthExample,
    IsLoggedIn,
    Login,
    Register,
    Logout,
    ErrorPage,
} from '../../../pages';

const routeListData = [
    { exact: true, path: '/', content: Welcome },
    { exact: true, path: '/dashboard', content: Dashboard, requiresLogin: true },
    { exact: true, path: '/create-task/:project', content: CreateTask, title: 'Create task' },
    { exact: true, path: '/edit-task/:task', content: EditTask, title: 'Edit task' },
    { exact: true, path: '/empty', content: Empty },
    { exact: true, path: '/example', content: AuthExample, title: 'Authentication Example' },
    { exact: true, path: '/logged-in', content: IsLoggedIn, title: 'Is User Logged In?' },
    { exact: true, path: '/login', content: Login },
    { exact: true, path: '/register', content: Register },
    { exact: true, path: '/logout', content: Logout },
    { exact: true, path: '/private', content: Dashboard },
    { exact: false, path: '', content: ErrorPage, title: 'Error' },
];

export default routeListData;
