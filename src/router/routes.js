import MainPage from "../pages/MainPage";
import CreateStoryPage from "../pages/CreateStoryPage";
import FanficsPage from "../pages/FanficsPage";
import UserPage from "../pages/UserPage";
import StoryPage from "../pages/StoryPage";
import LeaderboardPage from "../pages/LeaderboardPage";

export const privatRoutes = [
    {path: '/story/create', component: CreateStoryPage },
    {path: '/fanfics', component: FanficsPage },
    {path: '/user', component: UserPage },
    { path:'/user/:username', component: UserPage },
    { path:'/story/:id', component: StoryPage },
    { path:'/leaderboard', component: LeaderboardPage },
]

export const publicRoute = [
    {path: '/', component: MainPage },
]