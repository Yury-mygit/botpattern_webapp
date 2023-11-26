// @flow
import * as React from 'react';
import {Link, NavLink, Outlet, useNavigate} from 'react-router-dom';

const allowedUsers : number[] = [
    // 565047052,
    565047052
];
const superUsers: number[] = [/*...list of super user IDs...*/];

type Props = {
    id:number,
};
export  const Root = (props: Props) => {

      const navigate = useNavigate();

  React.useEffect(() => {
    if (allowedUsers.includes(props.id)) {
      navigate('/calendar');
    } else if (superUsers.includes(props.id)) {
      navigate('/superadmin');
    } else {
      navigate('/user');
    }
  }, [navigate]);

    return (
        <div className="flex flex-col w-96 p-2 ">
          <div className="flex flex-row justify-between">
          <Link to="calendar">Календарь</Link>
          <Link to="students">Ученики</Link>
          <Link to="employees">Сотрудники</Link>
          <Link to="payments">Платежа</Link>

          </div>
          <Outlet/>
        </div>
    );
};