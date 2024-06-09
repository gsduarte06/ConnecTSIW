const apiBaseUrl = 'http://127.0.0.1:8080'



export async function get(endpoint,token) {
  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

export async function post(endpoint, data, token) {
  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      

    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
}

export async function patch(endpoint, data, token) {
  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      

    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
}

export async function patchForm(endpoint, data, token) {
  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: data,
      

    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
}

export async function postForm(endpoint, data, token) {
  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: data,
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
}



export async function del(endpoint, token,data) {
  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      

    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
}



async function handleResponse(response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `API request failed with status ${response.status}: ${errorMessage}`
    );
  }
  const data = await response.json();
  return data;
}