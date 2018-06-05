const token = '695795109.ca477ed.81debc29770746ef9493c02437cf6007';
const userId = '695795109';

async function getData() {
  try {
    let response = await fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token);
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse.data;
    }
    throw new Error('Request Failed!');
  } catch (error) {
    console.log(error);
  }
}
