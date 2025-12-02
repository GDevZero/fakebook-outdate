import React from 'react'
import { Row, Col, Button, Avatar, Dropdown, Menu } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/actions'
import logo from '../../images/logo.png'

function NavBar(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    props.logout()
    navigate('/')
    window.location.reload(true);
  }

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: <Link to="/friends">ดูรายชื่อเพื่อน</Link>,
        },
        {
          key: '2',
          label: <Link to="/changepassword">เปลี่ยนรหัสผ่าน</Link>,
        },
        {
          key: '3',
          label: <Link onClick={() => handleLogout()} to='#'>ออกจากระบบ</Link>,
        },
      ]}
    />
  );

  return (
    <Row style={{ height: '100%' }} align="middle">
      <Col span={4} style={{ height: '100%' }}>
        <Link to="/">
          <img src={logo} alt="Logo Fakebook" style={{ height: '5vh' }} />
        </Link>
      </Col>
      <Col span={20}>
        <Row justify="end">
          <Col span={4}>
            <Avatar src={props.user.profilePic} />
          </Col>
          <Dropdown overlay={menu}>
            <Col span={6}>
              <Link to="/my-profile">
                <Button type="link">{props.user.name}</Button>
              </Link>
            </Col>
          </Dropdown>
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logout: logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)