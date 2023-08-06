const random_txt_url = 'https://api.quotable.io/random';
const display=document.getElementById("display_txt");
const inp_text = document.getElementById("get_input");
function get_text()
{
    return fetch(random_txt_url)
        .then( res=> res.json())
        .then(data=> data.content)
   
}
let i=0
inp_text.addEventListener('input',() =>{
    const key=Event.key;
    if(key === "backspace") return
    const a = inp_text.value
    const quote_spans = display.querySelectorAll('span')
    const quote_letter = quote_spans[i].innerText
    if(quote_letter===a[a.length-1])
    {
        quote_spans[i].classList.add("correct");
    }
    else{
        quote_spans[i].classList.add("incorrect");
    }
    if(i+1==quote_spans.length)
    {
        inp_text.value = ''
        get_text()
        random_txt()
        i=0
    }
    i++;
})

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
    
}