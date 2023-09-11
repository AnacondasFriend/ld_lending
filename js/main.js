const body = document.querySelector('body');
const buttons = document.querySelectorAll('.btn');
const closebuttons = document.querySelectorAll('.closePopup');
const calcPrice = document.querySelector('.calcPrice');
const res = document.querySelector(".resCalc");
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
var priceForOnePiece;
const sendLittleForm = document.querySelector('.sendLittleForm');
const sendBigForm = document.querySelector('.sendBigForm');
const littleForm = document.querySelector('.popup.littleForm');
const bigForm = document.querySelector('.popup.bigForm');
const textPattern = /^/;
const telPattern = /^/;
const emailPattern = /^/;
const request = new XMLHttpRequest();
const urlLittleForm = "php/littleForm.php";
let params;
request.open("POST", urlLittleForm, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


function calculatePrice(serviceType, area){
    if(serviceType=='fullproject'){
        priceForOnePiece = 500;
    }
    else if(serviceType=='withoutGreenPlan'||serviceType=='greenPlan'){
        priceForOnePiece = 400;
    }
    else if(serviceType=='flowerGarden'){
        priceForOnePiece = 250;
        return priceForOnePiece*Number(area);      
    }
    else if(serviceType=='eskiz'){
        return 1000;
 
    }
    return priceForOnePiece*Number(area)/100;
}


function showPrice(price){
    res.parentNode.style.display = "inline-block";
    res.innerHTML = `${price}`
}
function showNavigation(){
    nav.classList.toggle('show-hide');
    if(nav.classList.length==0){
        burger.querySelector('img').setAttribute('src', 'icons/list.svg')
    }
    else{
        burger.querySelector('img').setAttribute('src', 'icons/x-lg.svg')
    }
    
}

function checkLittleForm(){
    params = '';
    clientName = littleForm.querySelector("input[type='text']").value;
    clientNum = littleForm.querySelector("input[type='tel']").value;
    clientMail = littleForm.querySelector("input[type='email']").value;
    
    params = "&name=" + clientName+ "&phonenumber=" + clientNum + "&email="+clientMail;
    return true;
}
function checkBigForm(){
    params = '';
    textInputs = littleForm.querySelectorAll("input[type='text']");
    clientNum = littleForm.querySelector("input[type='tel']");
    clientMail = littleForm.querySelector("input[type='email']");
    for(let input of textInputs){
        params += `&${input.getAtribute('name')}=`+ `${input.value}`
    }
    return true;
}

function showMessage(){
    littleForm.style.display = 'none';
    body.style.overflow = 'visible';
    body.insertAdjacentHTML('beforeend', '<div class="send-success"><div class="message">Заявка успешно отправлена! Ожидайте звонка.</div></div>');
    setTimeout(()=>{
        mes = body.querySelector('.send-success');
        mes.remove();
    }, 1500)
}

for(btn of buttons){
    btn.addEventListener('click', (e)=>{
       popupClass = e.target.classList[1];
       popupNode = document.querySelector(`.${popupClass}.popup`);
       popupNode.style.display = "inline-block";
       body.style.overflow = 'hidden';
})}

for(btn of closebuttons){
    btn.addEventListener('click', (e)=>{
        e.target.parentNode.parentNode.style.display = "none";
        body.style.overflow = 'visible';
    })
}

calcPrice.addEventListener('click', ()=>{
    const checked = document.querySelector(".checks input[type='radio']:checked").id;
    const area = document.querySelector("#area").value;
    price = calculatePrice(checked, area);
    showPrice(price);
})

burger.addEventListener('click', showNavigation);
sendLittleForm.addEventListener('click', (e)=>{
    e.preventDefault();
    if(checkLittleForm()){
        request.send(params);
    } 
})
sendBigForm.addEventListener('click', (e)=>{
    e.preventDefault();
    if(checkBigForm()){
        request.send(params); 
    } 
})

request.addEventListener("readystatechange", () => {

    if(request.readyState === 4 && request.status === 200) {       
		console.log(request.responseText);
        showMessage();
    }
});