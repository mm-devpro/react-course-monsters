import axios from 'axios';
import {showAlert} from "./alert";

export const createEmployee = async (form) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/pa-api/v1/employees',
            data: form
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Created successfully');
            console.log('créé')
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}


export const deleteEmployee = async (slug) => {
    try {
        const url = `/pa-api/v1/employees/${slug}`
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


export const getEmployee = async (slug) => {
    try {
        const res = await axios.get(`/pa-api/v1/employees/${slug}`);

        if (res.data.status === 'success') {
            return res.data.data.data;
        }

    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}


export const updateEmployee = async (slug, data) => {
    try {
        const url = `/pa-api/v1/employees/${slug}`
        const res = await axios({
            method: 'PATCH',
            url,
            data
        });
        console.log(res.data);
        if (res.data.status === 'success') {
            showAlert('success', 'Updated successfully');
            console.log('updaté')
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
        console.log('updaté')
    }
}

