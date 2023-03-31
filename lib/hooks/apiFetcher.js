import Cookies from "universal-cookie";

const buildQuery = ({ page, params }) => {
  let queryString = "?";
  if (page) {
    queryString += `page=${page}&`;
  }
  if (!(params && typeof params === "object" && !Array.isArray(params)))
    return queryString;
  const query = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return queryString + query;
  // Object.keys(params).forEach((e, i) => {
  //   if (i !== 0) queryString += '&';
  //   queryString += `${e}=${params[e]}`;
  // });
};
export const basePath = "http://localhost:3008/admin";

export default async function apiFetcher({
  method,
  url,
  data,
  params,
  page,
  token,
  isFormData,
}) {
  const headers = new Headers();
  const cookies = new Cookies();
  const BEARER_TOKEN = cookies.get("accessor");
  console.log("(((((( form data", isFormData);
  headers.append("Accept", "application/json");

  if (!isFormData) {
    headers.append("Content-Type", "application/json");
  }
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  } else if (BEARER_TOKEN) {
    headers.append("Authorization", `Bearer ${BEARER_TOKEN}`);
  }
  const queryString = params || page ? buildQuery({ page, params }) : "";

  const requestOptions = {
    // mode: 'no-cors',
    method: method ?? "GET",
    headers,
    body: isFormData ? data : JSON.stringify(data) ?? undefined,
    redirect: "follow",
  };
  const requestUrl = basePath + url + queryString;

  console.log("request data", { url, requestOptions, requestUrl, queryString });
  try {
    const response = await fetch(requestUrl, requestOptions);
    console.log("apifetcher response", response);

    // if (response.status === 404 || response.status === 400) {
    //   return {
    //     message: "Something is not quite right ...",
    //   };
    // }
    const responseObject = await response.text();
    const res = JSON.parse(responseObject);
    res.statusCode = response.status;
    console.log("=====", requestUrl, res, "=====");
    return res;
  } catch (error) {
    console.log(error);
    return { message: "Please check your connection and try again" };
  }
}
