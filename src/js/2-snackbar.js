import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const delay = Number(document.querySelector("input[name='delay']").value);
    const state = document.querySelector("input[name='state']:checked").value;

    createPromise(delay, state)
        .then((message) => {
            iziToast.success({
                title: '',
                message: `${message}`,
                position: 'topRight',
                icon: false,
            });
            
        })
        .catch((error) => {
            iziToast.error({
                title: '',
                message: `${error}`,
                position: 'topRight',
                icon: false,
            });
        });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else if (state === "rejected") {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
}