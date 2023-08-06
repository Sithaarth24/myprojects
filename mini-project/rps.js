const buttons=document.querySelectorAll('#choice');
const res=document.getElementById('result')
const user = document.getElementById('user_score');
const comp = document.getElementById("computer_score");

let uscore = 0;
let cscore = 0;
buttons.forEach(button=>{
    addEventListener('click',get)
});

function get(e)
{
    let f=-1;
    const clas=e.target;
    const user_choice=clas.name;
    const computer_choice=Math.ceil(Math.random()*3);
    if(user_choice==='rock')
    {
        if(computer_choice===1) f=0;
        else if(computer_choice===2) f=1;
    }
    else if(user_choice==='paper')
    {
        if(computer_choice===2) f=0;
        else if(computer_choice===1) f=1;
    }
    else
    {
        if(computer_choice===3) f=0;
        else if(computer_choice===2) f=1;
    }
    console.log(f);
    if(f<0) {
        cscore++;
        res.style.color = 'red';
        res.innerText = 'computer wins!';
    }
    else if(f>0) {
        uscore++;
        res.style.color = 'green';
        res.innerText = 'user wins!';
    }
    else{
        res.style.color = 'yellow';
        res.innerText = 'Tie!'
    }
    user.innerText = uscore;
    comp.innerText = cscore;
}

