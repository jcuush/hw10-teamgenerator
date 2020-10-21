// TODO: Write code to define and export the Employee class
// Employee is the parents class and will set up common properties for each different type of employee
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;

    }

    getId() {
        return this.id;

    }

    getEmail() {
        return this.email;

    }

    getRole() {
        return "Employee";

    }

 }

 module.exports = Employee;
 