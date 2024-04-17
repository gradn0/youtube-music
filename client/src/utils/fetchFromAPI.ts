export const BASE_URL = "http://localhost:3000/api"

export const fetchFromAPI = async (query: string, requestType: string, body?:any) => {
  const res = await fetch(`${BASE_URL}/${query}`, {
    method: requestType,
    body: JSON.stringify(body), 
    headers: {
      "Content-Type": "application/json"
    }
  });
  const json = await res.json();
  return json;
}