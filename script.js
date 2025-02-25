// # EXERCISE ex-js-async-chef

async function fetchDataJson(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

async function getChefBirthday(id) {
  let recipe;
  let user;

  try {
    recipe = await fetchDataJson(`https://dummyjson.com/recipes/${id}`);
    // console.log("recipe: ", recipe);
  } catch {
    throw new Error("Non è stato possibile trovare la ricetta richiesta");
  }

  if (recipe.message) {
    throw new Error(recipe.message);
  }

  try {
    user = await fetchDataJson(`https://dummyjson.com/users/${recipe.userId}`);
    // console.log("User: ", user);
    // console.log("Data di nascita user: ", user.birthDate);
  } catch {
    throw new Error(
      "Non è stato possibile trovare l'utente legato alla ricetta richiesta"
    );
  }

  if (user.message) {
    throw new Error(user.message);
  }

  return dayjs(user.birthDate).format("DD/MM/YYYY");
}

/* getChefBirthday(1)
  .then((birthday) => console.log("Data di nascita dello chef:", birthday))
  .catch((error) => console.error("Errore:", error.message)); */

(async () => {
  try {
    const birthday = await getChefBirthday(1);
    console.log("Data di nascita dello chef:", birthday);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Fine del codice!");
  }
})();
