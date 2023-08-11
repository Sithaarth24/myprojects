const random_txt_url = 'https://api.quotable.io/random';
const tell = document.getElementById("tell");
const display=document.getElementById("display_txt");
const inp_text = document.getElementById("get_input");
const time = document.getElementById('time');
const speed = document.getElementById('speed');
const acc = document.getElementById('accuracy');
let int = null;
let c=0,w=0,tt=0;
let [milliseconds,seconds,minutes] = [0,60,0];
function get_text()
{
    return fetch(random_txt_url)
        .then( res=> res.json())
        .then(data=> data.content)
}

document.getElementById("get_input").disabled = true;

function min(t)
{
    tt=t
    document.getElementById("get_input").disabled = false;
    display.style.color = "white";
    document.getElementById('b1').disabled = true;
    document.getElementById('b2').disabled = true;
    document.getElementById('b3').disabled = true;
    tell.innerHTML = "Start!!"
    time.innerHTML = ''
    minutes = t-1
    inp_text.focus();
    start_time()
}



let i=0;
inp_text.addEventListener('input',() =>{
    const a = inp_text.value
    const quote_spans = display.querySelectorAll('span')
    const quote_letter = quote_spans[i].innerText
    if(quote_letter===a[a.length-1])
    {
        c++;
        quote_spans[i].classList.add("correct");
    }
    else{
        w++;
        quote_spans[i].classList.add("incorrect");
    }
    if(i+1==quote_spans.length)
    {

        get_text()
        random_txt()
        i=0
    }
    else i++
})

function start_time()
    {
        int = setInterval(displayTimer,100);
    }

function displayTimer(){
    milliseconds+=100;
    if(milliseconds == 1000)
    {
        milliseconds = 0;
        seconds--;
        if(seconds == 0)
        {
            if(minutes == 0) 
            {
                validation()
                clearInterval(int)
            }
            else{
                seconds = 60;
                minutes--;
            }
        }
    }
    let s = (seconds<10)?"0"+seconds:seconds;
    time.innerHTML = ` ${"0" + minutes} : ${s} `;
}

function validation()
{
    time.style.color = "red"
    inp_text.value = ''   
    tell.innerHTML = "Stop!"
    tell.style.color = "red";
    document.getElementById("get_input").disabled = true;
    let s = c/(tt*5.3)
    s=s.toFixed(2)
    speed.innerHTML = "Typing speed : " + s + " wpm";
    let a = (c/(c+w))*100
    a=a.toFixed(2)
    acc.innerHTML = "Accuracy : " + a + "%"
}

function preventBackspace(e) {
    var evt = e || window.event;
    if (evt) {
        var keyCode = evt.charCode || evt.keyCode;
        if (keyCode === 8) {
            if (evt.preventDefault) {
                evt.preventDefault();
            } else {
                evt.returnValue = false;
            }
        }
    }

}

    

async function random_txt()
{
    let txt = await get_text();
    display.innerHTML = ''
    txt=txt.split('')
    txt.forEach(element => {
        const char_span=document.createElement('span')
        char_span.innerText = element;
        display.appendChild(char_span)
    });
    inp_text.value = ''
}
