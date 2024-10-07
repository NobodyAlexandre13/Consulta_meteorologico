body = document.querySelector('body');

var data = new Date();
var hora = data.getHours();

if(hora >= 18){
  body.style.backgroundImage = "url('fundo2.jpg')";
}else if(hora <= 5){
  body.style.backgroundImage = "url('fundo2.jpg')";
}else{
  body.style.backgroundImage = "url('fundo.jpg')";
}