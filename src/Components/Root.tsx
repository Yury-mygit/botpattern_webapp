// @flow
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

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
      navigate('/admin');
    } else if (superUsers.includes(props.id)) {
      navigate('/superadmin');
    } else {
      navigate('/user');
    }
  }, [navigate]);

    return (
        <div>
            {/*<h1>Привет мир!</h1>*/}
            <Outlet/>
        </div>
    );
};