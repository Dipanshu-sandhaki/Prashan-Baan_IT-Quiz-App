export const enableGuestMode = () => {
  localStorage.setItem("guestMode", "true");
  localStorage.setItem("userId", "guest-user"); // dummy user
};
