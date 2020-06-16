
import PostCategory from './containers/PostCategory';
import PostDetail from './containers/PostDetail';

import CommentCreate from './containers/CommentCreate';
import CommentsList from './containers/CommentsList';

import ProfileLogin from './containers/ProfileLogin';
import ProfileSignup from './containers/ProfileSignup';


import ProfileEdit from './containers/ProfileEdit';
import ProfileList from './containers/ProfileList';


import PostCreate from './containers/PostCreate';
import PostCreateAuto from './containers/PostCreateAuto';
import PostCreateItem from './containers/PostCreateItem';
import PostUpdate from './containers/PostUpdate';



const Routes = [
    {
        path: "/",
        component: PostCategory
    },

    {
        path: "/detail/:articleID/",
        component: PostDetail
    },
    {
        path: "/comments/create/",
        component: CommentCreate
    },
    {
        path: "/comments/",
        component: CommentsList
    },

    {
        path: "/login/",
        component: ProfileLogin
    },
    {
        path: "/signup/",
        component: ProfileSignup
    },
    
    {
        path: "/profile/edit",
        component: ProfileEdit
    },
    {
        path: "/profile/list",
        component: ProfileList
    },
    {
        path: "/add/",
        component: PostCreateAuto
    },
    {
        path: "/add/item/",
        component: PostCreateItem
    },
    {
        path: "/edit/:articleID/",
        component: PostUpdate
    },
    
];

export default Routes;
