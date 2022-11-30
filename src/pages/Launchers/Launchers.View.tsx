import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getLaunchers } from '../../redux/launchers/launches/launchersActions';

function LauncherView() {
  const { data } = useAppSelector((state) => state.launchers);
  const dispatch = useAppDispatch();

  console.log('data', data);

  useEffect(() => {
    dispatch(getLaunchers());
  }, []);

  return (
    <div style={{ marginTop: 500 }}><p>Terms</p></div>
  );
}

export default LauncherView;
