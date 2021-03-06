import { notificationType } from './../reducers/notificationReducer';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const timeDifference = (current: number, previous: number) => {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current as number - previous;

    if (elapsed < msPerMinute) {
        if (elapsed / 1000 < 30) return "Just now";
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}




export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);


export const getNotificationTextFilter = (notification: notificationType) => {

    switch (notification.notificationType) {
        case "postLike":
            return "likes your post.";
        case "reply":
            return "replied on your post.";
        case "newMessage":
            return "Sent new message.";
        case "follow":
            return "followed you."
        default:
            return "";
    }

}

export const getNotificationURL = (notification: notificationType) => {
    switch (notification.notificationType) {
        case "postLike":
            return `/profile/${notification.userTo.firstName}`;
        case "reply":
            return `/profile/${notification.userTo.firstName}`;
        case "follow":
            return `/profile/${notification.userFrom.firstName}`;
        default:
            return "#";
    }
}