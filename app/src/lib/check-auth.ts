export const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    const queryParams = new URLSearchParams(window.location.search);
    const altToken = queryParams.get("token");
    if (altToken) {
      localStorage.setItem("token", altToken);
      return true;
    }
    return false;
  }
};
