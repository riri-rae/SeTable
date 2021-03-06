import Swal from "sweetalert2";

function alert(title, text, icon) {
    Swal.fire(title, text, icon);
}

function alertWithTimer(title, text, icon) {
    return Swal.fire({
        title,
        text,
        showConfirmButton: false,
        timer: 1600,
        icon,
    });
}

function reConfirm(title, text, confirmButtonText) {
    return Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5885AF",
        cancelButtonColor: "#d33",
        confirmButtonText,
    });
}

function alertThankyou() {
    return Swal.fire({
        icon: "success",
        title: "Thank you! Have a nice day!",
        showClass: {
            popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutUp",
        },
        showConfirmButton: false,
        timer: 1800,
    });
}

export { alert, alertWithTimer, reConfirm, alertThankyou };
