import React from 'react';
import ReactDOM from 'react-dom/client';
import './scc/index.css';
import App from './App';
import {User} from './Components/User/User'
import {Root} from "./Components/Root"
import reportWebVitals from './reportWebVitals';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux'
import {store} from "./store/store";
import { useSelector, useDispatch } from 'react-redux'
import {setUser} from "./store/userSlice";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {StudentsView} from "./students/StudentsView";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  allows_write_to_pm: boolean;
}
function isAdmin(user: User) {
  // TODO: Replace with your actual logic
  return true;
}

function getRoutesForUser(user: User) {
  if (isAdmin(user)) {
    return [
      {
        path: "calendar",
        element:<App  />,
        errorElement:<h1 className="flex align-middle justify-center">Возникла ошибка</h1>,
      },
      {
        path: "students",
        element:<StudentsView/>,
        errorElement:<h1 className="flex align-middle justify-center">Возникла ошибка</h1>,
      },
      {
        path: "employees",
        element:<div> employees in process</div>,
        errorElement:<h1 className="flex align-middle justify-center">Возникла ошибка</h1>,
      },
      {
        path: "payments",
        element:<div> payments in process</div>,
        errorElement:<h1 className="flex align-middle justify-center">Возникла ошибка</h1>,
      },

    ];
  } else {
    return [
      {
        path: "user",
        element: <h1> user </h1>,
        errorElement:<h1 className="flex align-middle justify-center">Возникла ошибка</h1>,
      },
    ];
  }
}


declare global {
  interface Window {
    Telegram: any;
  }
}

let tg;
let params;
if ('Telegram' in window) {
  tg = window.Telegram.WebApp;
  params = new URLSearchParams(tg.initData);
}
else {
  params = new URLSearchParams('query_id=AAEM760hAAAAAAzvrSEARQWe&user=%7B%22id%22%3A565047052%2C%22first_name%22%3A%22Yury%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Yury_Gurian%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1699713413&hash=7b9bd0d6adbf4ddb2101728938a63f2a49fac26382dd2fd6b8c1bee5f5561877');
}

const queryId = params.get('query_id');
let user = JSON.parse(decodeURIComponent(params.get('user')!));
const authDate = params.get('auth_date');
const hash = params.get('hash');

if (!user){
  user = {
  id: 565047052,
  first_name: "Yury",
  last_name: "",
  username: "Yury_Gurian",
  language_code: "en",
  allows_write_to_pm: true
};
}

console.log(user)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root id = {user.id}/>,
    errorElement:<h1 className="flex align-middle justify-center">Возникла ошибка</h1>,
    children: getRoutesForUser(user),
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>,
);









  //
  // <div>
  //                   <textarea readOnly value={tg}/>
  //
  //                   <textarea readOnly value={Object.entries(user).map(([key, value]) => `${key}: ${value}`).join('\n')} />
  //                   <textarea readOnly value={Object.entries(user).map(([key, value]) => `${key}: ${value}`).join('\n')} />
  //
  //               </div>,

//565047052

// const user = {
//   id: 565047052,
//   first_name: "Yury",
//   last_name: "",
//   username: "Yury_Gurian",
//   language_code: "en",
//   allows_write_to_pm: true
// };