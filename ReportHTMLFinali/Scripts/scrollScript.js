const tableContainer=document.querySelector('.container');
let isDown = false;
let startX;
let scrollLeft;

//evento mouse,touch premuto
tableContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - tableContainer.offsetLeft;
    scrollLeft = tableContainer.scrollLeft;
    });
tableContainer.addEventListener('mouseleave', () =>{
    isDown = false;
    });
tableContainer.addEventListener('mouseup', () =>{
    isDown = false;
    });
tableContainer.addEventListener('mousemove', (e) =>{
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - tableContainer.offsetLeft;
    const walk = (x - startX) *2; //velocità di scorrimento
    tableContainer.scrollLeft = scrollLeft - walk;
    });

//supporto dispositivi touch
tableContainer.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - tableContainer.offsetLeft;
    scrollLeft = tableContainer.scrollLeft;
   });
tableContainer.addEventListener('touchend', () => {
    isDown = false;
   });
tableContainer.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - tableContainer.offsetLeft;
    const walk = (x - startX) *2; //velocità di scorrimento
    tableContainer.scrollLeft = scrollLeft - walk;
    }); 
   
