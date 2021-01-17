import { API_BASE } from './../config/index';
import Axios from 'axios';
import { REPLY_DELETE_REQUEST, REPLY_DELETE_FAIL, REPLY_DELETE_SUCCESS } from './../constants/replyConstants';
import { ThunkDispatch } from 'redux-thunk';

export const deleteReply = (replyId: string, postId: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: REPLY_DELETE_REQUEST });
    try {
        const { data } = await Axios.delete(`${API_BASE}/reply/delete/${replyId}/${postId}`, {
            withCredentials: true,
        });
        console.log('댓글 딜리트 후에 데이터data', data);
        dispatch({ type: REPLY_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REPLY_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


