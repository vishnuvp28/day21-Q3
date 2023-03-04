let timer
let deleteFirstPhotoDelay

async function dog(){
    try{
        let v = await fetch('https://dog.ceo/api/breeds/list/all')
        let c=await v.json();
        console.log(c.message);
        createBreedList(c.message);

    }catch(e){
        console.log(e)
    }

}dog()

function createBreedList(breedList){
  document.getElementById("breed").innerHTML=`
  <select onchange="loadByBreed(this.value)">
  <option>Choose a dog breed</option>
  ${Object.keys(breedList).map(function(breed){
    return `<option>${breed}</option>`
  }).join("")}
  </select>
  `
   
} 
async function loadByBreed(breed){
    try{
        if(breed !=='Choose a dog breed'){
            let a = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
            let b = await a.json();
            // console.log(b.message);
            createSlideshow(b.message);
        }
    }catch(e){
        console.log(e)
    }
    
} 

function createSlideshow(images){
    let currentPosition=0;
    clearInterval(timer)
    clearInterval(deleteFirstPhotoDelay)

 if(images.length<1){
    document.getElementById("slideshow").innerHTML=`
    <div class="slide"  style="background-image: url('${images[0]}') "></div>  
    <div class="slide"  style="background-image: url('${images[1]}') "></div>
  
    `
    currentPosition +=2;
    if(images.length==2)
     currentPosition=0
   timer= setInterval(nextSlide,3000)
 }else{
    document.getElementById("slideshow").innerHTML=`
    <div class="slide" style="background-image: url('${images[0]}') "></div>  
    <div class="slide"></div>
     `
    // console.log(images)

 }

// function nextSlide(){
//     document.getElementById("slideshow").insertAdjacentHTML("beforeend",`<div class="slide"  style="background-image: url('${images[currentPosition]}') "></div>`)
//     deleteFirstPhotoDelay = setTimeout(function(){
//         document.querySelector('.slide').remove()
//     },1000)
//     if(currentPosition +1 >=images.length){
//         currentPosition=0;
//     }else{
//         currentPosition++;
//     }
//   }
}