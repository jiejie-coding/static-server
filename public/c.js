let div = document.createElement('div');

document.querySelector('.bt').addEventListener('click',function() {
  div.style.border = "1px solid red";
  div.style.height = "200px"
  div.style.width = "200px"
  document.body.appendChild(div);
})