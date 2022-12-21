var value="";
function update() {
    var select = document.getElementById('cataddo');
    value = select.options[select.selectedIndex].value;
    console.log(value);
    if(value=="dairy"){
        document.getElementById("subcataddo1").style.display="block";
        document.getElementById("subcataddo2").style.display="none";
        document.getElementById("subcataddo3").style.display="none";
        document.getElementById("subcataddo4").style.display="none";
        document.getElementById("subcataddo4").disabled = true;
        document.getElementById("subcataddo3").disabled = true;
        document.getElementById("subcataddo2").disabled = true;
        document.getElementById("subcataddo1").disabled = false;
    }
    else if(value=="pharma"){
        document.getElementById("subcataddo2").style.display="block";
        document.getElementById("subcataddo1").style.display="none";
        document.getElementById("subcataddo3").style.display="none";
        document.getElementById("subcataddo4").style.display="none";
        document.getElementById("subcataddo4").disabled = true;
        document.getElementById("subcataddo3").disabled = true;
        document.getElementById("subcataddo1").disabled = true;
        document.getElementById("subcataddo2").disabled = false;
    }
    else if(value=="home"){
        document.getElementById("subcataddo3").style.display="block";
        document.getElementById("subcataddo1").style.display="none";
        document.getElementById("subcataddo2").style.display="none";
        document.getElementById("subcataddo4").style.display="none";
        document.getElementById("subcataddo4").disabled = true;
        document.getElementById("subcataddo2").disabled = true;
        document.getElementById("subcataddo1").disabled = true;
        document.getElementById("subcataddo3").disabled = false;
    }
    else if(value=="snacks"){
        document.getElementById("subcataddo4").style.display="block";
        document.getElementById("subcataddo1").style.display="none";
        document.getElementById("subcataddo2").style.display="none";
        document.getElementById("subcataddo3").style.display="none";
        document.getElementById("subcataddo3").disabled = true;
        document.getElementById("subcataddo2").disabled = true;
        document.getElementById("subcataddo1").disabled = true;
        document.getElementById("subcataddo4").disabled = false;
    }
}
update();
function addtodb(){
  document.getElementsByClassName("firstdiv")[0].style.display="none";
  document.getElementsByClassName("fourthdiv")[0].style.display="block";
}
function viewhistory(){
    document.getElementsByClassName("firstdiv")[0].style.display="none";
    document.getElementsByClassName("seconddiv")[0].style.display="block";
}
