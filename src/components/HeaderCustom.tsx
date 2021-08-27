/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { useEffect, useState } from 'react';
// import screenfull from 'screenfull';
// import avater from '../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import { Menu, Layout, Popover, Dropdown } from 'antd';
import { gitOauthToken, gitOauthInfo } from '../service';
import { parseQuery } from '../utils';
import { useHistory } from 'react-router-dom';
// import { PwaInstaller } from './widget';
import { useAlita } from 'redux-alita';
import umbrella from 'umbrella-storage';
import { useSwitch } from '../utils/hooks';
import {
    // ArrowsAltOutlined,
    BarsOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    // NotificationOutlined,
    DownOutlined
} from '@ant-design/icons';
const { Header } = Layout;
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

type HeaderCustomProps = {
    toggle: () => void;
    collapsed: boolean;
    user: any;
    responsive?: any;
    path?: string;
};

const HeaderCustom = (props: HeaderCustomProps) => {
    const [user, setUser] = useState<any>();
    const [responsive] = useAlita('responsive', { light: true });
    const [visible, turn] = useSwitch();
    const history = useHistory();

    useEffect(() => {
        const query = parseQuery();
        let storageUser = umbrella.getLocalStorage('user');

        if (!storageUser && query.code) {
            gitOauthToken(query.code as string).then((res: any) => {
                gitOauthInfo(res.access_token).then((info: any) => {
                    setUser({
                        user: info,
                    });
                    umbrella.setLocalStorage('user', info);
                });
            });
        } else {
            setUser({
                user: storageUser,
            });
        }
    }, []);

    // const screenFull = () => {
    //     if (screenfull.isEnabled) {
    //         screenfull.toggle();
    //     }
    // };
    // const menuClick = (e: any) => {
    //     e.key === 'logout' && logout();
    // };
    const logout = () => {
        umbrella.removeLocalStorage('user');
        history.push('/login');
    };
    const menu = (
        <Menu>
            <Menu.Item>
                <span>修改密码</span>
            </Menu.Item>
            <Menu.Item>
                <span onClick={logout}>退出登录</span>
            </Menu.Item>
        </Menu>
    );
    return (
        <Header className="custom-theme header">
            {responsive?.isMobile ? (
                <Popover
                    content={<SiderCustom popoverHide={turn.turnOff} />}
                    trigger="click"
                    placement="bottomLeft"
                    visible={visible}
                    onVisibleChange={(visible) => (visible ? turn.turnOn() : turn.turnOff())}
                >
                    <BarsOutlined className="header__trigger custom-trigger" />
                </Popover>
            ) : props.collapsed ? (
                <MenuUnfoldOutlined
                    className="header__trigger custom-trigger"
                    onClick={props.toggle}
                />
            ) : (
                <MenuFoldOutlined
                    className="header__trigger custom-trigger"
                    onClick={props.toggle}
                />
            )}
            <span className="user-drop">
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        admin <DownOutlined />
                    </a>
                </Dropdown>
            </span>
        </Header>
    );
};

export default HeaderCustom;

