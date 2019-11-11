// Your code here
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployees = function(employeeData){
    return employeeData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}


let hoursWorkedOnDate = function(employee, theDate){
    let intime = employee.timeInEvents.find(function(e){
        return e.date === theDate
    })
    let outtime = employee.timeOutEvents.find(function(e){
        return e.date === theDate
    })

    return(outtime.hour - intime.hour)/100
}

let wagesEarnedOnDate = function(employee, theDate){
    return (hoursWorkedOnDate(employee, theDate) * employee.payPerHour)
}

let allWagesFor = function(employee){
    let allDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payments = allDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return payments
}

let calculatePayroll = function(employeeArray){
    return employeeArray.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}

let createEmployeeRecords = function(employees){
    return employees.map(function(row){
        return createEmployeeRecord(row)
    })
}

let findEmployeebyFirstName = function(employees, name){
    return employees.find(function(employee){
        return employee.firstName === name
    })
}