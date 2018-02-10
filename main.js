const femaleGroup = [];
const maleGroup = [];
const tableGroup = [[], [], [], []];

$(document).ready(InitializeApp);

function InitializeApp(){
    console.log("Initializing App");
    $("#data-enter").submit(handleFormSubmit);
    $("#shuffle").on("click", function (){
        removeFromTables(tableGroup);
        distributeToTables(maleGroup);
        distributeToTables(femaleGroup);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    let name = event.target[0].value;
    let gender = event.target[1].value;
    if (name === ""){
        return;
    } else if (gender === "female") {
        femaleGroup.push(new Person(name, gender));
        $("#female ul").append($("<li>").text(name));
        $(this).closest('form').find("input[type=text], textarea").val("");
    } else {
        maleGroup.push(new Person(name, gender));
        $("#male ul").append($("<li>").text(name));
        $(this).closest('form').find("input[type=text], textarea").val("");
    }
}

function randomizeGroup(genderGroup) {
    let currentIndex = genderGroup.length;
    let indexHolder;
    let indexRandom;

    while (currentIndex) {
        indexRandom = Math.floor(Math.random() * currentIndex--);
        indexHolder = genderGroup[currentIndex];
        genderGroup[currentIndex] = genderGroup[indexRandom];
        genderGroup[indexRandom] = indexHolder;
    }
    return genderGroup;
}

function distributeToTables(genderGroup){
    const genderArray = randomizeGroup(genderGroup);
    let tablePos = 0;
    let repeatCheck = 0;
    while(genderArray.length){
        let currentPerson = genderArray.shift();
        if (currentPerson.tableVisit[tablePos]){
            genderArray.push(currentPerson);
            repeatCheck++;
            if (genderArray.length === 1 || repeatCheck === genderArray.length){
                tablePos++;
                repeatCheck = 0;
            }
        } else{
            currentPerson.tableVisit[tablePos] = true;
            tableGroup[tablePos].push(currentPerson);
            renderToDom(tablePos, currentPerson);
            tablePos++;
            repeatCheck = 0;
        }
        if (tablePos >= tableGroup.length){
            tablePos = 0;
        }
    }
}

function removeFromTables(tableGroup){
    for (let index = 0; index < tableGroup.length; index++){
        while (tableGroup[index].length){
           let currentPerson = tableGroup[index].shift();
           removeFromDom(currentPerson);
           if (currentPerson.tableVisit[0] && currentPerson.tableVisit[1] && currentPerson.tableVisit[2] && currentPerson.tableVisit[3]){
               continue;
           } else {
               switch (currentPerson.gender) {
                   case "female":
                       femaleGroup.push(currentPerson);
                       break;
                   case "male":
                       maleGroup.push(currentPerson);
                       break;
               }
           }
        }
    }
}

function renderToDom(index, personObj){
    $(`#${index} ul.${personObj.gender}`).append($("<li>").text(personObj.name).attr("uid", `${personObj.name}`));
}

function removeFromDom(personObj){
    $(`[uid=${personObj.name}]`).remove();
}

class Person{
    constructor(name, gender){
        this.name = name;
        this.gender = gender;
        this.tableVisit = [false, false, false, false];
    }

}
// var inputs = ['male','Clyde','male','Cecil','female','Gennie','male','Horace','female','Chuck'];
// const people = [];
// var cont = true;
// while(inputs.length){
//     cont = false;
//     let gender = inputs.shift();
//     var personname = inputs.shift();
//
//     people.push(new Person(personname, gender));
//
//
// }
//
// console.log(people);
// const sortedPeople = {
//     male: [],
//     female: []
// };
//
// people.forEach( person => { sortedPeople[person.gender].push(person); });
//
// const groupedPeople = [];
//
// while(sortedPeople.male.length>0 && sortedPeople.female.length>0){
//     let maleIndex = (sortedPeople.male.length * Math.random()) >>0;
//     let femaleIndex = (sortedPeople.female.length * Math.random()) >>0;
//     groupedPeople.push( {male: sortedPeople.male.splice(maleIndex,1)[0], female: sortedPeople.female.splice(femaleIndex,1)[0]});
// }
// console.log("grouped",groupedPeople,"remaining", sortedPeople);
//
