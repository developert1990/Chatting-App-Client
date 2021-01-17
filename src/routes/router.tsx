import React, { useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { SigninScreen, HomeScreen, RegisterScreen, ProfileScreen, ChatListScreen, NewMessageScreen } from '../screens/index';
import { PrivateRoute } from '../components/PrivateRoute';
import { CheckValidChatRoute } from '../components/CheckValidChatRoute';
import { InvalidPage } from '../components/InvalidPage';
import { Navbar } from '../components/Navbar';
import { Row } from 'react-bootstrap';
import { ThirdColumn } from '../components/ThirdColumn';
import { SearchScreen } from '../screens/SearchScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { getNotification, getUnReadNotification } from '../actions/notificationAction';
import { useSocket } from '../hooks';
import { getUnreadMessages } from '../actions/chatAction';



export const Router = () => {

    const signinInfoStore = useSelector((state: initialAppStateType) => state.signinStore);
    const { signinInfo } = signinInfoStore;


    const dispatch = useDispatch();
    const { socket } = useSocket();
    console.log("라우터 tsx")
    useEffect(() => {
        if (signinInfo) {
            console.log("소켓 newFollow reveive하러 옴 로그인유저: ", signinInfo._id)
            // newNotificationUsingSocket(signinInfo._id, socket)
            socket.emit("join", signinInfo._id, (error: Error) => {
                if (error) {
                    alert(error);
                }
            })
        }
    }, [signinInfo, signinInfo?._id, socket]);

    // noti 한것을 받는다.
    socket.on("receive notification", () => {
        console.log("노티 받았다.")
        dispatch(getUnReadNotification()); // navbar에 unread 숫자를 리랜더 해서 변화를준다.
        dispatch(getUnreadMessages()); // 읽지 않은 message 가져와서 리랜더 해서 변화를 준다.
        dispatch(getNotification()); // notification 스크린에서 notification들을 받는다. 즉 노티들을 업데이트 해서 보여줌
    })


    return (
        <BrowserRouter >
            <div className="mainScreen">
                <Row className="row">
                    <PrivateRoute component={Navbar} />
                    <PrivateRoute path="/" component={HomeScreen} exact />
                    <PrivateRoute path="/profile/:userId" component={ProfileScreen} />
                    <PrivateRoute path="/search/posts" component={SearchScreen} />
                    <CheckValidChatRoute path="/message/chatRoom/:roomNum" component={() => <ChatScreen socket={socket} />} />
                    <PrivateRoute path="/message" component={ChatListScreen} exact />
                    <PrivateRoute path="/message/new" component={NewMessageScreen} />
                    <PrivateRoute path="/notification" component={NotificationScreen} />
                    <Route path="/invalidPage" component={InvalidPage} />
                    <PrivateRoute component={ThirdColumn} exact />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                </Row>
            </div>
        </BrowserRouter>
    )
}
