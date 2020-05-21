"use strict";

import "core-js/stable";
import "regenerator-runtime/runtime";
import {login, logout} from './login';
import {getService, updateService, deleteService, createService} from "./services";
import {getEmployee, updateEmployee, deleteEmployee, createEmployee} from "./employees";
import {getPartner, updatePartner, deletePartner, createPartner} from "./partners";
import {updateSettings} from "./updateSettings";

//-------- SELECTORS --------//
            //---buttons
const createButton = document.querySelector('.btn-admin__create');
const deleteButton = document.querySelector('.btn-admin__delete');
const logOutBtn = document.querySelector('.nav__el--logout');
            //---forms
const employeeForm = document.getElementById('form__employee-update');
const formEmployees = document.querySelector('.form__data--employees');
const formPartners = document.querySelector('.form__data--partners');
const formServices = document.querySelector('.form__data--services');
const loginForm = document.querySelector('.form--login');
const partnerForm = document.getElementById('form__partners-update');
const serviceForm = document.getElementById('form__service-update');
const userDataForm = document.querySelector('.form__data--user');
const userPasswordForm = document.querySelector('.form__data--password');
            //---data cards
const employeeBox = document.querySelectorAll('.employees--card_Admin');
const partnerBox = document.querySelectorAll('.partners--card_Admin');
const serviceBox = document.querySelectorAll('.services--card_Admin');
            //---form data
const employeeDesc = document.getElementById('form__employee-description');
const employeeEmail = document.getElementById('form__employee-email');
const employeeId = document.getElementById('form__employee-id');
const employeeImg = document.getElementById('form__employee-image');
const employeeImgToDisplay = document.getElementById('form__employee-imageToShow');
const employeeJob = document.getElementById('form__employee-job');
const employeeSlug = document.getElementById('form__employee-slug');
const employeeName = document.getElementById('form__employee-name');
const employeeRadioBtn = document.querySelectorAll('.form__employee-radio');
const employeeHide = document.getElementById('form__employee-hide');
const employeeShow = document.getElementById('form__employee-show');
const partnerId = document.getElementById('form__partners-id');
const partnerName = document.getElementById('form__partners-name');
const partnerLink = document.getElementById('form__partners-link');
const partnerImg = document.getElementById('form__partners-image');
const partnerImgToDisplay = document.getElementById('form__partners-imageToShow');
const serviceDesc = document.getElementById('form__service-description');
const serviceId = document.getElementById('form__service-id');
const serviceImg = document.getElementById('form__service-image');
const serviceImgToDisplay = document.getElementById('form__service-imageToShow');
const serviceSlug = document.getElementById('form__service-slug');
const serviceTitle = document.getElementById('form__service-title');
const svgItem = document.querySelectorAll('.svg');
const username = document.getElementById('form__user-name');
const userEmail = document.getElementById('form__user-email');
const userImg = document.getElementById('form__user-image');




const resetServiceForm = function () {
    serviceForm.reset();
    serviceImgToDisplay.src = "";
    serviceId.value = undefined;
    serviceId.dataset.hasid = "0";
    serviceSlug.value = undefined;
    formServices.classList.remove('hide');
}
const resetEmployeeForm = function () {
    employeeForm.reset();
    employeeImgToDisplay.src = "";
    employeeId.value = undefined;
    employeeId.dataset.hasid = "0";
    employeeSlug.value = undefined;
    formEmployees.classList.remove('hide');
}
const resetPartnerForm = function () {
    partnerForm.reset();
    partnerImgToDisplay.src = "";
    partnerId.value = undefined;
    partnerId.dataset.hasid = "0";
    partnerForm.classList.remove('hide');
}

const reloadPage = () => {
    window.location.reload();
}

//----------DOMContentLoaded-------------//

document.addEventListener('DOMContentLoaded', () => {

    //--------- SVG HANDLING --------//
    const resizeSVG = () => {

        for (let i = 0; i < svgItem.length; i++) {
            if("matchMedia" in window) {
                if(window.matchMedia("(min-width: 1201px)").matches) {
                    svgItem[i].setAttribute("preserveAspectRatio", "xMidYMid meet");
                    svgItem[i].setAttribute("x", "0");
                    svgItem[i].setAttribute("y", "0");
                    svgItem[i].setAttribute("viewBox", "0 0 450 150")
                    svgItem[i].setAttribute("width", "450")
                    svgItem[i].setAttribute("height", "150")
                } else if(window.matchMedia("(max-width: 1200px)").matches && window.matchMedia("(min-width: 501px)").matches ) {
                    svgItem[i].setAttribute("preserveAspectRatio", "xMidYMid meet");
                    svgItem[i].setAttribute("x", "0");
                    svgItem[i].setAttribute("y", "0");
                    svgItem[i].setAttribute("viewBox", "-10 -40 450 200")
                    svgItem[i].setAttribute("width", "400")
                    svgItem[i].setAttribute("height", "150")
                } else if(window.matchMedia("(max-width: 500px)").matches && window.matchMedia("(min-width: 200px)").matches) {
                    svgItem[i].setAttribute("preserveAspectRatio", "xMidYMid meet");
                    svgItem[i].setAttribute("x", "0");
                    svgItem[i].setAttribute("y", "0");
                    svgItem[i].setAttribute("viewBox", "-30 -40 500 200")
                    svgItem[i].setAttribute("width", "250")
                    svgItem[i].setAttribute("height", "120")
                }
            }
        }

    }
    if(svgItem) {
        resizeSVG();
        window.addEventListener('resize', resizeSVG);
    }


    //--------------------- Login Logout -----------------------//
    if (loginForm)
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);

        });

    if (logOutBtn) logOutBtn.addEventListener('click', logout);

    //--------------------- DISPLAY Form -------------------------//

    if (serviceBox) {
        for (let i = 0; i < serviceBox.length; i++) {
            let el = serviceBox[i];
            el.addEventListener('click', async (e) => {
                let slug = e.currentTarget.dataset.slug;
                const service = await getService(slug);
                formServices.classList.remove('hide');
                serviceId.value = `${service.id}`;
                serviceId.dataset.hasid = "1";
                serviceSlug.value = `${service.slug}`;
                serviceTitle.value = `${service.title}`;
                serviceDesc.value = `${service.description}`;
                serviceImgToDisplay.src = `/img/services/${service.image}`;
            });
        }
    }
    if (employeeBox) {
        for (let i = 0; i < employeeBox.length; i++) {
            let el = employeeBox[i];
            el.addEventListener('click', async (e) => {
                let slug = e.currentTarget.dataset.slug;
                const employee = await getEmployee(slug);
                formEmployees.classList.remove('hide');
                employeeDesc.value = `${employee.description}`;
                employeeEmail.value =`${employee.email}`;
                employeeId.value =`${employee.id}`;
                employeeId.dataset.hasid = "1";
                employeeImgToDisplay.src =`/img/employees/${employee.image}`;
                employeeJob.value = `${employee.jobTitle}`;
                employeeSlug.value = `${employee.slug}`;
                employeeName.value = `${employee.name}`;
                employee.status === 'show' ? employeeShow.checked = true : employeeHide.checked = true;
            });
        }
    }
    if (partnerBox) {
        for (let i = 0; i < partnerBox.length; i++) {
            let el = partnerBox[i];
            el.addEventListener('click', async (e) => {
                let id = e.currentTarget.dataset.getid;
                const partner = await getPartner(id);
                formPartners.classList.remove('hide');
                partnerId.value = id;
                partnerId.dataset.hasid = "1";
                partnerImgToDisplay.src =`/img/partners/${partner.image}`;
                partnerName.value = `${partner.name}`;
                partnerLink.value = `${partner.link}`;
                console.log(id);
            });
        }
    }

    if (createButton) createButton.addEventListener('click', e => {
        if(formServices) {
            resetServiceForm();
        } else if (formEmployees) {
            resetEmployeeForm();
        } else if (formPartners) {
            resetPartnerForm();
        }
    });

    //--------------------- UPDATE Form -------------------------//

    if (formEmployees) {
        formEmployees.addEventListener('submit',  async (e) => {
            e.preventDefault();
            let form = new FormData(formEmployees);
            form.set('name', employeeName.value);
            form.set('email', employeeEmail.value);
            form.set('description', employeeDesc.value);
            form.set('jobTitle', employeeJob.value);

            if (employeeImg.files[0]) {
                form.set('image', employeeImg.files[0]);
            }
            for (let i = 0; i < employeeRadioBtn.length; i++) {
                if (employeeRadioBtn[i].checked === true) form.set('status',employeeRadioBtn[i].value);
            }
            if (employeeId.dataset.hasid === "0") {
                await createEmployee(form);
            } else {
                const slug = employeeSlug.value;
                await updateEmployee(slug, form);
            }
            resetEmployeeForm();
            window.setTimeout(reloadPage, 1000);
        })

        if (deleteButton) {
            deleteButton.addEventListener('click', async e => {
                e.preventDefault();
                const slug = employeeSlug.value;
                const confirmation = confirm("Etes-vous sur de vouloir supprimer cette fiche?");
                if (confirmation) {
                    await deleteEmployee(slug);
                }
                employeeForm.reset();
                window.setTimeout(reloadPage, 1000);
            })
        }
    }
    if (formPartners) {
        formPartners.addEventListener('submit',  async (e) => {
            e.preventDefault();
            let form = new FormData(formPartners);
            form.set('name', partnerName.value);
            form.set('link', partnerLink.value);

            if (partnerImg.files[0]) {
                form.set('image', partnerImg.files[0]);
            }

            if (partnerId.dataset.hasid === "0") {
                await createPartner(form);
            } else {
                const id = partnerId.value;
                console.log(id)
                await updatePartner(id, form);
            }
            resetPartnerForm();
            window.setTimeout(reloadPage, 1000);
        })

        if (deleteButton) {
            deleteButton.addEventListener('click', async e => {
                e.preventDefault();
                const id = partnerId.value;
                const confirmation = confirm("Etes-vous sur de vouloir supprimer ce partenaire?");
                if (confirmation) {
                    await deletePartner(id);
                }
                partnerForm.reset();
                window.setTimeout(reloadPage, 1000);
            })
        }
    }
    if (formServices) {
        formServices.addEventListener('submit',  async (e) => {
            e.preventDefault();
            let form = new FormData(formServices);
            form.set('title', serviceTitle.value);
            form.set('description', serviceDesc.value);
            if (serviceImg.files[0]) {
                form.set('image', serviceImg.files[0]);
            }
            if (serviceId.dataset.hasid === "0") {
                await createService(form);
            } else {
                const slug = serviceSlug.value;
                await updateService(slug, form);
            }
            resetServiceForm();
            window.setTimeout(reloadPage, 1000);
        })

        if (deleteButton) {
            deleteButton.addEventListener('click', async e => {
                e.preventDefault();
                const slug = serviceSlug.value;
                const confirmation = confirm("Etes vous sur de vouloir supprimer ce service?");
                if (confirmation) {
                    await deleteService(slug);
                }
                serviceForm.reset();
                window.setTimeout(reloadPage, 1000);
            })
        }
    }
    //--------------------- USER Form and Update -------------------------//
    if (userDataForm)
        userDataForm.addEventListener('submit', async e => {
            e.preventDefault();
            const form = new FormData();
            form.set('name', username.value);
            form.set('email', userEmail.value);
            if (userImg.files[0]) {
                form.set('image', userImg.files[0]);
            }
            updateSettings(form, 'data');

        });

    if (userPasswordForm)
        userPasswordForm.addEventListener('submit', async e => {
            e.preventDefault();
            document.querySelector('.btn-admin__save-password').textContent = 'Updating...';

            const passwordCurrent = document.getElementById('password-current').value;
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('password-confirm').value;
            await updateSettings(
                { passwordCurrent, password, passwordConfirm },
                'password'
            );

            document.querySelector('.btn-admin__save-password').textContent = 'Save password';
            document.getElementById('password-current').value = '';
            document.getElementById('password').value = '';
            document.getElementById('password-confirm').value = '';
        });

});