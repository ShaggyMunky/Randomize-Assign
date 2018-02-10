const femaleGroup = [];
const maleGroup = [];

$(document).ready(InitializeApp);

function InitializeApp(){
    console.log("Initializing App");
    $("#data-enter").submit(function(event){
        event.preventDefault();
        let name = event.target[0].value;
        let gender = event.target[1].value;

        if(gender === "female"){
            femaleGroup.push(new Person(name, gender));
            $(this).closest('form').find("input[type=text], textarea").val("");
        }else{
            maleGroup.push(new Person(name, gender));
            $(this).closest('form').find("input[type=text], textarea").val("");
        }
    });
}

function handleFormSubmit(event){
    event.preventDefault();
    console.log(event);
}

class Person{
    constructor(name, gender){
        this.name = name;
        this.gender = gender;
        this.table1Visit = false;
        this.table2Visit = false;
        this.table3Visit = false;
        this.table4Visit = false;
    }
    storeGenderGroup(){
        if (this.gender === "female"){
            femaleGroup.push(Person)
        }
        else{
            maleGroup.push(Person)
        }
    }
}
var inputs = ['male','Clyde','male','Cecil','female','Gennie','male','Horace','female','Chuck'];
const people = [];
var cont = true;
while(inputs.length){
    cont = false;
    let gender = inputs.shift();
    var personname = inputs.shift();

    people.push(new Person(personname, gender));


}


const sortedPeople = {
    male: [],
    female: []
};

people.forEach( person => { sortedPeople[person.gender].push(person); });

const groupedPeople = [];

while(sortedPeople.male.length>0 && sortedPeople.female.length>0){
    let maleIndex = (sortedPeople.male.length * Math.random()) >>0;
    let femaleIndex = (sortedPeople.female.length * Math.random()) >>0;
    groupedPeople.push( {male: sortedPeople.male.splice(maleIndex,1)[0], female: sortedPeople.female.splice(femaleIndex,1)[0]});
}
console.log("grouped",groupedPeople,"remaining", sortedPeople);

