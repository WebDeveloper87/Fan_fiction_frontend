import MainPage from "../pages/MainPage";
import CreateStoryPage from "../pages/CreateStoryPage";
import FanficsPage from "../pages/FanficsPage";
import UserPage from "../pages/UserPage";
import StoryPage from "../pages/StoryPage";

export const privatRoutes = [
    {path: '/story/create', component: CreateStoryPage },
    {path: '/fanfics', component: FanficsPage },
    {path: '/user', component: UserPage },
    { path:'/user/:username', component: UserPage },
    { path:'/story/:id', component: StoryPage },
]

export const publicRoute = [
    {path: '/', component: MainPage },
]