
document.getElementById("loginbut").addEventListener("mouseover", changeToBlueColor);
document.getElementById("loginbut").addEventListener("mouseout", changeToBlackColor);
document.getElementById("cartbut").addEventListener("mouseover", changeToBlueColor2);
document.getElementById("cartbut").addEventListener("mouseout", changeToBlackColor2);


function changeToBlueColor() {
    document.getElementById("coh").style.color = "white";
    document.getElementById("coh2").style.color = "white";
    document.getElementById("loginbut").style.backgroundColor = "#14afc3";
    document.getElementById("loginbut").style.borderColor = "#12a2b5";
    document.getElementById("loginbut").style.borderWidth = "2.2px";
}
function changeToBlackColor() {
    document.getElementById("coh").style.color = "#12a2b5";
    document.getElementById("coh2").style.color = "#12a2b5";
    document.getElementById("loginbut").style.backgroundColor = "white";
    document.getElementById("loginbut").style.borderColor = "#14afc3";
    document.getElementById("loginbut").style.borderWidth = "2px";
}
function changeToBlueColor2() {
    document.getElementById("coh3").style.color = "#12a2b5";
    document.getElementById("coh4").style.color = "#12a2b5";
    document.getElementById("cartbut").style.backgroundColor = "white";
    document.getElementById("cartbut").style.borderColor = "#14afc3";
    document.getElementById("cartbut").style.borderWidth = "2px";
}
function changeToBlackColor2() {
    document.getElementById("coh3").style.color = "white";
    document.getElementById("coh4").style.color = "white";
    document.getElementById("cartbut").style.backgroundColor = "#12a2b5";
    document.getElementById("cartbut").style.borderColor = "#12a2b5";
    document.getElementById("cartbut").style.borderWidth = "1.3px";
}
for (const s of document.getElementsByClassName("card")) {
  s.style.width = "250px";
  s.style.height = "340px";
  s.style.padding = "10px";
}
for (const tp of document.getElementsByClassName("tpcard")) {
  tp.style.height = "162px";
}
document.getElementById("loginbut").addEventListener("click", function(){
  document.getElementsByClassName("opac")[0].style.opacity="0.5";
  document.getElementsByClassName("whousing")[0].style.display="block";
})
document.getElementById("cb").addEventListener("click", function(){
  document.getElementsByClassName("opac")[0].style.opacity="0.5";
  document.getElementsByClassName("whousing")[0].style.display="none";
  document.getElementsByClassName("loginwindow")[0].style.display="flex";
})
document.getElementById("ab").addEventListener("click", function(){
  document.getElementsByClassName("opac")[0].style.opacity="0.5";
  document.getElementsByClassName("whousing")[0].style.display="none";
  document.getElementsByClassName("adminlogin")[0].style.display="flex";
})
document.getElementsByClassName("cross4")[0].addEventListener("click", function(){
  document.getElementsByClassName("whousing")[0].style.display="none";
  document.getElementsByClassName("opac")[0].style.opacity="1";
})
document.getElementsByClassName("cross")[0].addEventListener("click", function(){
  document.getElementsByClassName("loginwindow")[0].style.display="none";
  document.getElementsByClassName("opac")[0].style.opacity="1";
})
document.getElementsByClassName("Signin")[0].addEventListener("click", function(){
  document.getElementsByClassName("loginwindow")[0].style.display="none";
  document.getElementsByClassName("opac")[0].style.opacity="1";
})
document.getElementsByClassName("Signin2")[0].addEventListener("click", function(){
  document.getElementsByClassName("adminlogin")[0].style.display="none";
  document.getElementsByClassName("opac")[0].style.opacity="1";
})
document.getElementsByClassName("sign-up")[0].addEventListener("click", function(){
  document.getElementsByClassName("opac")[0].style.opacity="0.5";
  document.getElementsByClassName("regwindow")[0].style.display="flex";
})
document.getElementsByClassName("cross2")[0].addEventListener("click", function(){
  document.getElementsByClassName("regwindow")[0].style.display="none";
  document.getElementsByClassName("opac")[0].style.opacity="1";
  document.getElementsByClassName("loginwindow")[0].style.display="none";
})
document.getElementsByClassName("cross3")[0].addEventListener("click", function(){
  document.getElementsByClassName("opac")[0].style.opacity="1";
  document.getElementsByClassName("adminlogin")[0].style.display="none";
})
document.getElementsByClassName("Submit")[0].addEventListener("click", function(){
  document.getElementsByClassName("regwindow")[0].style.display="none";
  document.getElementsByClassName("opac")[0].style.opacity="1";
  document.getElementsByClassName("loginwindow")[0].style.display="none";
})

document.getElementById("doba").addEventListener("click", function(){
  document.getElementById("dobab").style.display="block";
})
document.getElementById("addentered").addEventListener("click", function(){
  document.getElementById("dobab").style.display="none";
})
