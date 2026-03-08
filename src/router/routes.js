import MainPage from "../pages/MainPage";
import CreateStoryPage from "../pages/CreateStoryPage";
import FanficsPage from "../pages/UserPage";
import UserPage from "../pages/UserPage";

export const privatRoutes = [
    {path: '/story/create', component: CreateStoryPage },
    {path: '/fanfics', component: FanficsPage },
    {path: '/user', component: UserPage },
]

export const publicRoute = [
    {path: '/', component: MainPage },
]