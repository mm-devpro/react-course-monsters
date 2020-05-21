import axios from 'axios';
import {showAlert} from "./alert";

export const createService = async (form) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/pa-api/v1/services',
            data: form
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Created successfully');
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}

export const deleteService = async (slug) => {
    try {
        const url = `/pa-api/v1/services/${slug}`
        const res = await axios({
            method: 'DELETE',
            url
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Deleted successfully');
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}


export const getService = async (slug) => {
    try {
        const res = await axios.get(`/pa-api/v1/services/${slug}`);

        if (res.data.status === 'success') {
            return res.data.data.data;
        }

    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}


export const updateService = async (slug, data) => {
    try {
        const url = `/pa-api/v1/services/${slug}`
        const res = await axios({
            method: 'PATCH',
            url,
            data
        });
        console.log('update est appelée', res.data)
        if (res.data.status === 'success') {
            showAlert('success', 'Updated successfully');
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}

