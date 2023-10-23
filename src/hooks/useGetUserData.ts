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

export const calculateTime = (date: string) => {
  const currentDate = new Date();
  const postDate = new Date(date);

  const diff = currentDate.getTime() - postDate.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor(diff / 1000);

  // shows days hours minutes seconds
  if (hours > 24) {
    return `${Math.floor(hours / 24)} days ago`;
  } else if (minutes > 60) {
    return `${Math.floor(minutes / 60)} hours ago`;
  } else if (seconds > 60) {
    return `${Math.floor(seconds / 60)} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
};
