import MainPage from "../pages/MainPage";
import CreateStoryPage from "../pages/CreateStoryPage";
import FanficsPage from "../pages/UserPage";

export const privatRoutes = [
    {path: '/story/create', component: CreateStoryPage },
    {path: '/fanfics', component: FanficsPage },
]

export const publicRoute = [
    {path: '/', component: MainPage },
]