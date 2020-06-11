import React from 'react';
import { Layout, Menu} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/auth';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                <div className="logo" />
                    <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                    >
                    <Menu.Item key="1">
                        <Link to="/">Башкы бет</Link>
                    </Menu.Item>
                    
                    <Menu.Item key="5">
                        <Link to="/add">Кошуу Машина</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to="/add/item">Кошуу</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to="/profile/edit">Профиль</Link>
                    </Menu.Item>
                    <Menu.Item key="9">
                        <Link to="/profile/list">Менин жарыяларым</Link>
                    </Menu.Item>
                    {
                        this.props.isAuthenticated ?

                        <Menu.Item key="3" onClick={this.props.logout}>
                            Logout
                        </Menu.Item>
                        :
                        <Menu.Item key="2">
                            <Link to="/login">
                                Login
                            </Link>
                        </Menu.Item>
                    }

                </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                ©2020 | Akim Robotics 
                </Footer>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout())
	};
};

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));