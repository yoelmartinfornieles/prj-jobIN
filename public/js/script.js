document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Proyecto-modelo JS imported successfully!");
    let logged = document.getElementById("logged")
    let buttonLogout = document.querySelector ("#logout-button")
    let buttonRegister = document.querySelector ("#register-button")
    let buttonLogin = document.querySelector ("#login-button")
    let buttonProfile = document.querySelector ("#profile-button")
    let buttonSignin = document.querySelector ("#signin-button")

    if (logged) { 
      console.log(logged)
      buttonLogout.classList.remove("hide");
      buttonRegister.classList.add("hide");
      buttonLogin.classList.add("hide");
      buttonProfile.classList.remove("hide");
      buttonSignin.classList.add("hide");
} 
  },
  false
);
