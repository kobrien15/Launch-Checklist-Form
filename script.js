window.addEventListener("load", function() {
	fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
		response.json().then(function(json) {
			const destination = document.getElementById("missionTarget");
			let index = 0;
            destination.addEventListener("click", function(){
				missionTarget.innerHTML = `
				<h2>Mission Destination</h2>
				<ol>
				   <li>Name: ${json[index].name}</li>
				   <li>Diameter: ${json[index].diameter}</li>
				   <li>Star: ${json[index].star}</li>
				   <li>Distance from Earth: ${json[index].distance}</li>
				   <li>Number of Moons: ${json[index].moons}</li>
				</ol>
				<img src="${json[index].image}">
				`;
				index = (index + 1) % json.length;
			});
		});
	});
  let form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
	let pilotName = document.querySelector("input[name=pilotName]");
	let copilotName = document.querySelector("input[name=copilotName]");
	let fuelLevel = document.querySelector("input[name=fuelLevel]");
	let cargoMass = document.querySelector("input[name=cargoMass]");
	let faultyItems = document.querySelector("#faultyItems");
	let launchStatus = document.querySelector("#launchStatus");
	let pilotStatus = document.querySelector("#pilotStatus");
	let copilotStatus = document.querySelector("#copilotStatus");
	let cargoStatus = document.querySelector("#cargoStatus");
	let fuelStatus = document.querySelector("#fuelStatus");

    if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
        alert("All fields are required!");
        event.preventDefault();
	}
	if (isNaN(pilotName.value) === false || isNaN(copilotName.value) === false) {
		alert("Pilot Name and Co-Pilot Name can only contain letters!");
		event.preventDefault();
	} else {
		pilotStatus.innerHTML = `${pilotName.value} Ready`;
		copilotStatus.innerHTML = `${copilotName.value} Ready`;
		console.log("Pilots Statuses Updated");
	}
	if (isNaN(fuelLevel.value) === true || isNaN(cargoMass.value) === true) {
		alert("Fuel Level and Cargo Mass can only contain numbers!");
		event.preventDefault();
		console.log("NaNs Detected");
	} 
	if (fuelLevel.value > 10000 && cargoMass.value < 10000) {
    	launchStatus.innerHTML = `Shuttle is ready for launch!`;
    	launchStatus.style.color = "green";
    	console.log(cargoMass.value);
    	console.log("Shuttle Ready for Launch!");
    } 
    if (fuelLevel.value < 10000) {
    	faultyItems.setAttribute("style", "visibility: visible;");
    	fuelStatus.innerHTML = `There is NOT enough fuel for the journey!`;
    	launchStatus.innerHTML = `Shuttle not ready for launch!`;
    	launchStatus.style.color = "red";
    	console.log("Not enough Fuel.");
    }
    if (cargoMass.value > 10000) {
    	faultyItems.setAttribute("style", "visibility: visible;");
    	cargoStatus.innerHTML = `There is TOO MUCH WEIGHT for launch!`;
    	launchStatus.innerHTML = `Shuttle not ready for launch!`;
    	launchStatus.style.color = "red";
    	console.log("Too Much Weight");
    }
    console.log([pilotName.value, copilotName.value ]);
    event.preventDefault();
  });
});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
