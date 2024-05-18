import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const Login = () =>
  import("../pages/Login.vue");
const Register = () =>
  import("../pages/Register.vue");
const PostDetail = () =>
  import("../pages/Dashboard/PostDetails.vue");
const Profile = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const HistoricoProfissional = () =>
  import("../pages/HistoricoProfissional.vue");
const Classification = () =>
  import("../pages/Classification.vue");
const Admin = () =>
  import("../pages/Admin.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: '/post/:id', 
        name: 'PostDetail',
        component: PostDetail,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "register",
        name: "register",
        component: Register,
      },
      {
        path: "login",
        name: "login",
        component: Login,
      },
      {
        path: "historicoprofissional",
        name: "historicoprofissional",
        component: HistoricoProfissional,
      },
      {
        path: "classification",
        name: "classification",
        component: Classification,
      },
      {
        path: "admin",
        name: "admin",
        component: Admin,
      },
    ],
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
