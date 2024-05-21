export const BASE_URL = "http://192.168.0.9:3000/api"

export const fetchFromAPI = async (query: string, requestType: string, body?:any) => {
  const item = localStorage.getItem("user");
  let user;
  if (item) {
    user = JSON.parse(item);
  }
  
  const res = await fetch(`${BASE_URL}/${query}`, {
    method: requestType,
    body: JSON.stringify(body), 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`
    }
  });
  const json = await res.json();
  return json;
}