const apiKey = import.meta.env.VITE_API_KEY;
const clientID = import.meta.env.VITE_CLIENT_ID;

const getToken = async () => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${apiKey}`,
    });

    if (response.ok) {
      const data = await response.json();
      return {token : data.access_token, apiKey, clientID}
      
    } else {
      console.error("Échec de la requête");
    }
  } catch (error) {
    console.error("Une erreur s'est produite", error);
  }
};

export default getToken;
