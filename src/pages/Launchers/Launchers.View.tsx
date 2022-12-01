import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getLaunchers } from '../../redux/launchers/launches/launchersActions';
import {
  UserOutlined,
} from '@ant-design/icons';
import {
  Card, Col, Divider, MenuProps, Row,
  Layout, Menu, Input,
} from 'antd';
import { AnyArray } from 'immer/dist/internal';

const {
  Header, Content, Sider,
} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

function LauncherView() {
  const { data, loading } = useAppSelector((state) => state.launchers);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState<AnyArray>([]);
  const [allUsers, setAllUsers] = useState<AnyArray>([]);

  const items: MenuItem[] = [
    getItem('Users', 'sub1', <UserOutlined />),
  ];
  const personData = Object.values(data);
  const personDataArray = personData.filter((item: any) => item !== true);

  useEffect(() => {
    dispatch(getLaunchers());
    setAllUsers(personDataArray);
    setSearchedUsers(personDataArray);
  }, []);
  const onChangeSearch = (val: string) => {
    setSearch(val);
    if (val === '') {
      setSearchedUsers(allUsers);
      return;
    }

    const matchedUsers = allUsers.filter(
      (obj: any) => JSON.stringify(obj.username).toLowerCase().includes(val.toLowerCase()),
    );
    setSearchedUsers(matchedUsers);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value: any) => setCollapsed(value)}>
        <div className="logo" />
        <Menu style={{ marginTop: 50 }} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px', maxHeight: '100vh', overflow: 'scroll' }}>
          <h3 style={{ padding: 20 }}>Search by username</h3>
          <Input value={search} onChange={(e: any) => onChangeSearch(e.target.value)} placeholder="Search by username" />
          <Row gutter={16} style={{ marginBottom: 200 }}>
            {searchedUsers?.length > 0 && searchedUsers?.map((item: any) => (
              <Col key={item.id} className="gutter-row" span={6}>
                <Card title={`Username: ${item.username}`} bordered={false} style={{ width: 350, marginTop: 20 }} loading={loading}>
                  <p>
                    Name :
                    {item.name}
                  </p>
                  <p>
                    Email :
                    {item.email}
                  </p>
                  <p>
                    Phone :
                    {item.phone}
                  </p>
                  <p>
                    Website :
                    {item.website}
                  </p>
                  <Divider>Conpany Info</Divider>
                  <p>
                    Company :
                    {item?.company?.name}
                  </p>
                  <Divider>Address</Divider>
                  <p>
                    {item?.address?.suite}
                    ,
                    {' '}
                    {item?.address?.street}
                    ,
                    {item?.address?.city}
                  </p>
                </Card>
              </Col>
            ))}

          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LauncherView;
