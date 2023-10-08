export const useGetUSerData = () => {
  const getUserData = async () => {
    return await (
      await fetch("https://lifebookbackend.up.railway.app/api/current_user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      })
    ).json();
  };

  return { getUserData };
};
