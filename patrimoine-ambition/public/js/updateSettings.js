import axios from 'axios';
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
    try {
        const url =
            type === 'password'
                ? '/pa-api/v1/users/updateMyPassword'
                : '/pa-api/v1/users/updateMe';

        const res = await axios({
            method: 'PATCH',
            url,
            data
        });

        if (res.data.status === 'success') {
            showAlert('success', `${type.toUpperCase()} updated successfully!`);
            window.location.reload(true);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};
