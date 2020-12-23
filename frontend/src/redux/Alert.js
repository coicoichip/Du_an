import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function notifySuccess(msg) {
  if (msg) toast.success(msg);
  else toast.success('Success!');
}

export function notifyErrorMsg(err) {
    console.log(err?.response?.data)
  if (err?.response?.data?.data) toast.error(err?.response?.data?.data);
  else toast.error('Error!');
}

export function notifyInfo() {
  toast.info('You have a new order!');
}


// eslint-disable-next-line react/prop-types
const Noti = ({ reminder: { icon_link, title } }) => (
  <div className="socket-noti">
    <img src={icon_link} alt=""/>
    <div className="socket-noti__title">{title}</div>
  </div>
);

export function showNoti(reminder) {
  toast(<Noti reminder={reminder}/>, {
    bodyClassName: 'toast-noti-body',
    closeButton: false,
    progress: false,
  });
}

// eslint-disable-next-line react/prop-types
const NotiChat = ({ chat: { avatar_url, content, first_name, last_name } }) => (
  <div className="socket-noti">
    <img src={avatar_url} alt=""/>
    <div className="socket-noti__title">
      <div>{`${first_name} ${last_name}`}</div>
      <div>{content}</div>
    </div>
  </div>
);

export function showNotiChat(chat) {
  toast(<NotiChat chat={chat}/>, { bodyClassName: 'toast-noti-body', closeButton: false, progress: false });
}
