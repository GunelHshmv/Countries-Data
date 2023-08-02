const inpPart = document.querySelector("#inpPart");
const inp = document.querySelector("#inp");
const btn= document.querySelector("#btn");
const btnA= document.querySelector("#btnA");
const h3 = document.querySelector("#h3");
const countriesDiv = document.querySelector("#countries");
const h2 = document.querySelector("#h2");
const p = document.querySelector("#p");
const dataDiv = document.querySelector("#div");
const commonDiv=document.querySelector('#commonDiv');
const count=document.querySelector('#count');


inp.addEventListener('input', filterFunc);
btn.addEventListener('click',statistiks);
btnA.addEventListener('click',statistiks);



let dataArr=[];
let pop=[];
let area=[];
let sortedPop;
let sortedArea;
window.onload = function () {
  fetch("https://restcountries.com/v2/all")
    .then((response) => response.json())
    .then((data) => {
        dataArr=data
      dataArr.map((country) => {
        area.push(country.area)
        sortedArea=area.sort((x,y)=>{
          return y-x
     })
        pop.push(country.population)
        sortedPop=pop.sort((x,y)=>{
       return y-x
  })
        createElement(country)
        h3.remove();
      });
    })
    .catch((error) => console.error("Hata:", error));
};
function createElement(country){
 let largeDiv=document.createElement('div')
    largeDiv.className='m-1'
    largeDiv.style.height="320px"
    largeDiv.style.width="240px"
    largeDiv.style.border="2px solid black ";
    let upperDiv=document.createElement('div')
    upperDiv.className='d-flex column justify-content-between mt-2'
    let dataDiv=document.createElement('div')
    dataDiv.className='container-fluid d-flex flex-column'
    let p=document.createElement('p')
    p.innerHTML=`<b>${country.name}</b><br/>
    <b>Capital</b>-<b>${country.capital}</b><br/>
    <b>Region</b>-<b>${country.region}</b><br/>    
    <b>Number Code</b>-<b>${country.numericCode}</b>`;
    p.style.color="orangered"
    let btn=document.createElement('button')
    btn.id=country.alpha2Code;
    btn.innerHTML="<b>More</b>"
    btn.style.color="white"
    btn.style.backgroundColor="orange"
    btn.style.marginLeft="110px"
    btn.style.width="100px"
    btn.style.borderRadius="24px"
    let countryDiv = document.createElement("div");
    countryDiv.style.height = "120px";
    countryDiv.style.backgroundImage=`url(${country.flag})`
    countryDiv.style.backgroundPosition='center'
    countryDiv.style.backgroundSize='contain'
    countryDiv.style.backgroundRepeat='norepeat'
    countryDiv.className='mt-2'
    dataDiv.appendChild(p)
    upperDiv.append(dataDiv)
    largeDiv.append(countryDiv,upperDiv,btn)
    countriesDiv.appendChild(largeDiv);
btn.addEventListener('click',getData);
}
let errDiv = document.createElement("div");

 function filterFunc(e) {
  if ([...e.target.value][0]==([...inp.value][0].toUpperCase())  ) {
    errDiv.innerHTML=""
    let countries = dataArr.filter((country) => {
      if (country.name.includes(inp.value)) {
        countriesDiv.innerHTML = "";
        return country.name;
      }
    });
    countries.map((country) => {
        createElement(country)
    });
  } else {
    errDiv.innerHTML = "<h2>First Letter of Country Name Should Be Upper</h2>";
    errDiv.className =
      "d-flex flex-column justify-content-center text-danger  mt-5";
    errDiv.style.width = "63%";
    errDiv.style.height = "100px";
    errDiv.style.border = "2px dashed red ";
    countriesDiv.innerHTML = "";
    countriesDiv.appendChild(errDiv);
    if(inp.value==""){
        errDiv.innerHTML=""
    }
  }
}

function getData(e){
    commonDiv.innerHTML=""
    commonDiv.className=""
    commonDiv.innerHTML="<h3><b>Loading...</b></h3>"
      dataArr.map((country) => {
        if(e.target.parentElement.id==country.alpha2Code){
            commonDiv.innerHTML=""
            let back=document.createElement('button')
            back.innerHTML="Back"
            back.className="bg-primary"
            h2.innerHTML=country.name
            p.innerHTML=`Area of ${country.name} is <b>${country.area}</b>.<br/>
                         Capital of ${country.name} is <b>${country.capital}</b>.<br/>
                         Alpha2Code of ${country.name} is <b> ${country.alpha2Code}</b>.<br/>
                         Region of ${country.name} is <b>${country.region}</b>.<br/>
                         Capital of ${country.name} is <b>${country.capital}</b>.<br/>
                         Population of ${country.name} is  <b>${country.population}</b>            
            `
        commonDiv.append(h2,p,back)
        back.addEventListener('click',()=>{
            location.reload()
        })
        }
      });
}

function statistiksData(item){
  let statistiksDiv=document.createElement('div');
  statistiksDiv.className='container d-flex justify-content-around mb-5'
  statistiksDiv.style.height="32px";
  let countryName=document.createElement('div');
  countryName.style.width="20%";

  let coloredDiv=document.createElement('div');
  coloredDiv.style.width="84%";
  coloredDiv.className="text-center"

  let sizeDiv=document.createElement('div');
  sizeDiv.style.height="100%";
  coloredDiv.style.border="1px solid"
  sizeDiv.className="bg-warning ";
  coloredDiv.appendChild(sizeDiv);

  let count=document.createElement('div');
  count.id='count'
  count.style.paddingLeft="20px";
  count.style.width="20%";


  dataArr.map((el)=>{
    if(el.population==item ){
      if(item>1000000000){
        sizeDiv.style.width=`${item*7/100000000}%`
      }
      else if(item>100000000 && item<1000000000){
        sizeDiv.style.width=`${item*2.8/10000000}%`
      }
      else if(item>10000000 && item<100000000){
        sizeDiv.style.width=`${item*2.6/10000000}%`
      }
      else if(item>1000000 && item<10000000){
        sizeDiv.style.width=`${item*2.5/10000000}%`
      }
      else{
        sizeDiv.style.width=`${item*2.8/1000000}%`
      }
      
      
      countryName.innerHTML=`<b>${el.name}</b>`
   count.innerHTML=`<b>${item}</b>`
      
    }
    else if(el.area==item ){
      sizeDiv.style.width=`${item*4/100000}px`
      countryName.innerHTML=`<b>${el.name}</b>`
      count.innerHTML=`<b>${item}</b>`
    }
  })
 statistiksDiv.append(countryName,coloredDiv,count);
 countriesDiv.classList.remove("container-fluid")
countriesDiv.classList.add("container")
 countriesDiv.appendChild(statistiksDiv);
}

function statistiks(e){
countriesDiv.innerHTML=""
if(e.target.innerHTML=="Population"){
  sortedPop.map((item)=>{
    statistiksData(item)
})}
else if(e.target.innerHTML=="Area"){
  sortedArea.map((item)=>{
    statistiksData(item)
})
}}


