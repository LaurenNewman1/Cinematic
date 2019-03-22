const makeGetRequest = async(url) => {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body);
    return body;
};

const makePostRequest = async (url, payload) => {
    let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(url, options);
      return await response.text();
};

const makePutRequest = async (url, payload) => {
  let options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  const response = await fetch(url, options);
  return await response.text();
};

const makeDeleteRequest = async (url) => {
  let options = { method: 'DELETE'};
  const response = await fetch(url, options);
  return await response.text();
};

const heartbeat = async () => {
    return await makeGetRequest('/api/ekg');
};

const createUser = async (username) => {
    return await makePostRequest('/api/users', { username: username });
};

const getEntities = async () => {
  return await makeGetRequest('/api/entities');
}

const getEntity = async (id) => {
  let url = `/api/entity/${id}`;
  return await makeGetRequest(url);
}

const createEntity = async (payload) => {
  return await makePostRequest('/api/entities', payload);
};

const updateEntity = async (id, payload) => {
  let url = `/api/entities/${id}`;
  return await makePutRequest(url, payload);
};

const deleteEntity = async (id) => {
  let url = `/api/entities/${id}`;
  return await makeDeleteRequest(url);
};

export default {
    heartbeat: heartbeat,
    createUser: createUser,
    getEntity: getEntity,
    getEntities: getEntities,
    createEntity: createEntity,
    updateEntity: updateEntity,
    deleteEntity: deleteEntity
};