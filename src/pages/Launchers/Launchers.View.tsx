import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getLaunchers } from '../../redux/launchers/launches/launchersActions';
import {
  UserOutlined,
} from '@ant-design/icons';
import {
  Card, Col, Divider, MenuProps, Row,
  Layout, Menu,
} from 'antd';

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

  console.log('data', data);

  useEffect(() => {
    dispatch(getLaunchers());
  }, []);

  const items: MenuItem[] = [
    getItem('Users', 'sub1', <UserOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);

  const personData = Object.values(data);
  const personDataArray = personData.filter((item: any) => item !== true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value: any) => setCollapsed(value)}>
        <div className="logo" />
        <Menu style={{ marginTop: 50 }} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px', maxHeight: '100vh', overflow: 'scroll' }}>
          <Divider orientation="left">Users Data</Divider>
          <Row gutter={16} style={{ marginBottom: 200 }}>
            {personDataArray?.length > 0 && personDataArray?.map((item: any) => (
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
