import React from 'react';
import { Routes } from 'react-router-dom'
import { Layout, ConfigProvider, theme } from 'antd';
import NavBar from './components/navbar/NavBar'
import PrivateRoute from './components/routes/PrivateRoute';
import { connect } from 'react-redux'

const { Header, Content } = Layout;
const { useToken } = theme;

function App(props) {
  const { token } = useToken();
  const role = props.user.role;
  console.log(role);
  return (
    <div className="App">
      <ConfigProvider>
        <Layout>
          <Header style={{ backgroundColor: token.colorPrimary }}>
            <NavBar />
          </Header>
          <Content style={{ height: '95vh' }}>
            <Routes>
              {PrivateRoute({ role: role })}
            </Routes>
          </Content>
        </Layout>
      </ConfigProvider>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(App)
