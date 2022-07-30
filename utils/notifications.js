import { toast } from 'react-toastify';

const alertParams = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    pauseOnFocusLoss: false,
}

const toastNotify = (status) => {
    if(status === 'add') {
        toast.success('Added to favorites', alertParams);
    } else {
        toast.error('Removed from favorites', alertParams);
    }
}

export { toastNotify, alertParams };