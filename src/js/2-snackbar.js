import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const delay = Number(document.querySelector("input[name='delay']").value);
    const state = document.querySelector("input[name='state']:checked").value;

    createPromise(delay, state)
        .then((delay) => {
            iziToast.success({
                title: '',
                message: `Fulfilled promise in ${delay}ms`,
                position: 'topRight',
                icon: false,
            });
            
        })
        .catch((delay) => {
            iziToast.error({
                title: '',
                message: `Rejected promise in ${delay}ms`,
                position: 'topRight',
                icon: false,
            });
        });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else if (state === "rejected") {
                reject(delay);
            }
        }, delay);
    });
}