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


