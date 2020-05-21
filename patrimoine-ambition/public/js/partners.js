import axios from 'axios';
import {showAlert} from "./alert";

export const createPartner = async (form) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/pa-api/v1/partners',
            data: form
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Created successfully');
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}

export const deletePartner = async (id) => {
    try {
        const url = `/pa-api/v1/partners/${id}`
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


export const getPartner = async (id) => {
    try {
        const res = await axios.get(`/pa-api/v1/partners/${id}`);

        if (res.data.status === 'success') {
            return res.data.data.data;
        }

    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}


export const updatePartner = async (id, data) => {
    try {
        const url = `/pa-api/v1/partners/${id}`
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

