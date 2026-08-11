let object ={
    name: "julie",
    age: 20,
    job: "Developer"
};

console.log(object);


//access value inside object 
console.log(object.age);

console.log(object.name);

console.log(object.job);

//modifying values using literal and property

object.age = 25;

console.log(object.age);

// Removing Property using delete keyword

delete object.age;
console.log(object);

// adding new value and it will be added at the last

object.age = 20;
console.log(object);

//checking if a property exist

console.log("age" in object);

//iterating through object

for (let looping_from in object){
    console.log(looping_from+":"+object[looping_from]);
}


