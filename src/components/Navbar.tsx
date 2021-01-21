import { Badge } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUnreadMessages } from '../actions/chatAction'
import { getUnReadNotification } from '../actions/notificationAction'
import { signout } from '../actions/userActions'
import { useSocket } from '../hooks'
import { initialAppStateType } from '../store';


export const Navbar = () => {
    const { socket } = useSocket();
    const signinInfoStore = useSelector((state: initialAppStateType) => state.signinStore);
    const { signinInfo } = signinInfoStore;

    const unReadNotificationsStore = useSelector((state: initialAppStateType) => state.unReadNotificationStore);
    const { notifications: unReadNotifications } = unReadNotificationsStore;

    const unReadMessagesStore = useSelector((state: initialAppStateType) => state.unReadMessagesStore);
    const { messages: unReadMessages } = unReadMessagesStore;


    const dispatch = useDispatch();

    const handleSignout = async () => {
        dispatch(signout());

        socket?.off();
        socket?.emit('disconnected');
    }



    useEffect(() => {
        console.log("네브바 *************************")
        dispatch(getUnReadNotification());
        dispatch(getUnreadMessages());
    }, [dispatch])


    return (
        <div className="nav col-2"> {/* 이 태그의 크기를 항상 10중에 2로 해준다. */}
            <Link to="/" className="redColor"><i className="fas fa-cat"></i></Link>
            <Link to="/"><i className="fas fa-home"></i></Link>
            <Link to="/search/posts"><i className="fas fa-search"></i></Link>

            <Link to="/notification">
                <Badge badgeContent={unReadNotifications && unReadNotifications.length} color="secondary">
                    <i className="fas fa-bell"></i>
                </Badge>
            </Link>
            <Link to="/message">
                <Badge badgeContent={unReadMessages && unReadMessages.length} color="secondary">
                    <i className="fas fa-comment"></i>
                </Badge>
            </Link>
            <Link to={{
                pathname: `/profile/${signinInfo.userName}`,
                state: signinInfo,

            }}><i className="fas fa-user"></i></Link>
            <Link to="/" onClick={handleSignout}><i className="fas fa-sign-out-alt"></i></Link>
        </div>
    )
}
