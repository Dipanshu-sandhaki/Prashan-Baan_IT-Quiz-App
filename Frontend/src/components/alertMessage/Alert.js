import Swal from "sweetalert2";

const showAlert = ({ title, text, icon }) => {
    return Swal.fire({
        title: title || "Notification",
        text: text || "",
        icon: icon || "info",
    });
};

export default showAlert;