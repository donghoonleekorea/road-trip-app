export const addNewCampground = async (campground) => {
  try {
    const response = await fetch(process.env.REACT_APP_DB_URL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify(campground)
    });
    return response.json();
  } catch (error) {
    console.log('Error from addNewCampround in Services')
  }
};