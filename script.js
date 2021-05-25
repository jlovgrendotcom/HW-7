
let trailsArray = [];


let trailsObject = function (pTrail, pCity, pDifficulty, pRating) {
    this.Trail = pTrail;
    this.City = pCity;
    this.Difficulty = pDifficulty;
    this.Rating = pRating;
}

//---------- wait until document load event --------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    createList();

    document.getElementById("buttonAdd").addEventListener("click", function () {
      trailsArray.push(new trailsObject(document.getElementById("trailname").value, 
      document.getElementById("closestcity").value, document.getElementById("difficulty").value,document.getElementById("ratings").value ));
    });

    document.getElementById("buttonClear").addEventListener("click", function () {
      document.getElementById("trailname").value = "";
      document.getElementById("closestcity").value = "";
      document.getElementById("difficulty").value = "";
      document.getElementById("ratings").value = "";
    });

    document.getElementById("buttonSortTrail").addEventListener("click", function () {
      trailsArray.sort(dynamicSort("Trail"));
      createList();
  });

    document.getElementById("buttonSortCity").addEventListener("click", function () {
      trailsArray.sort(dynamicSort("City"));
      createList();
  });
    document.getElementById("buttonSortDifficulty").addEventListener("click", function () {
      trailsArray.sort(dynamicSort("difficulty"));
      createList();
  });
    document.getElementById("buttonSortRating").addEventListener("click", function () {
      trailsArray.sort(dynamicSort("Rating"));
      createList();
  });
   

  

//---------- page before show ------------------------------------------------------------

  $(document).on("pagebeforeshow", "#list", function (event) { 
  createList();
  });

  $(document).on("pagebeforeshow", "#mapresults", function (event) { 
   createMapList();
});
});
function createList() {
    // clear list
    var theList = document.getElementById("myul");
    theList.innerHTML = "";

    trailsArray.forEach(function (element,) {   
        var li = document.createElement('li');
        li.innerHTML =  element.Trail + ":  " + element.City+ ":  " + element.Difficulty+ ":  " + element.Rating;
        theList.appendChild(li);
    });

};
//  function myfunction(value,index,array){
//     return function(obj) {
//       return obj.City === "Seattle";
//     }
//   }
  function createMapList() {
     // clear list
  let params = new URLSearchParams(window.location.hash);
  console.log(window.location.hash);
  console.log(params);
  for (var param of params ){
    console.log(param);
  }
  let city = params.get("#mapresults?City");
  console.log(city);
  let mapArray = trailsArray.filter((obj) => obj.City === city);
  var theList = document.getElementById("mapul");
    theList.innerHTML = "";
    mapArray.forEach(function (element,) {   
        var li = document.createElement('li');
        li.innerHTML =  element.Trail + ":  " + element.City+ ":  " + element.Difficulty+ ":  " + element.Rating;
        theList.appendChild(li);
    });
 
};
 
  
function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
    }
 
