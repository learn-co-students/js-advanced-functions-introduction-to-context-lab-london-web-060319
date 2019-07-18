// Your code here
const createEmployeeRecord = (employee) => {
    const record = new Object
    debugger // mystery hack to get the tests to work??
    [record.firstName, record.familyName, record.title, record.payPerHour] = employee 
    record.timeInEvents = new Array
    record.timeOutEvents = new Array
    return record
}

const createEmployees = (employees) => {
    const records = employees.map(record => createEmployeeRecord(record))
    return records
}

const createTimeInEvent = (record, timeString) => {
    const [date, hour] = timeString.split(" ")
    record.timeInEvents.push({type: "TimeIn", date: date, hour: parseInt(hour,10)})
    return record
}

const createTimeOutEvent = (record, timeString) => {
    const [date, hour] = timeString.split(" ")
    record.timeOutEvents.push({type: "TimeOut", date: date, hour: parseInt(hour,10)})
    return record
}

const hoursWorkedOnDate = (record, dateString) => {
    const timeIn = record.timeInEvents.find(t => {return t.date === dateString}),
          timeOut = record.timeOutEvents.find(t => {return t.date === dateString})
    return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = (record, dateString) => {
    const rate = record.payPerHour
    return hoursWorkedOnDate(record, dateString) * rate
}

const allWagesFor = (record) => {
    // get array of dates 
    const datesWorked = record.timeInEvents.map(event => {return event.date})
    // pass this array to wagesEarnedOnDate and reduce value
    return datesWorked.reduce((accumulator, dateString) => {return accumulator + wagesEarnedOnDate(record, dateString)}, 0)
}

const calculatePayroll = (records) => {
    return records.reduce((accumulator, record) => {return accumulator + allWagesFor(record)},0)
}

const createEmployeeRecords = (data) => {
    return data.map(record => {return createEmployeeRecord(record)})
}

const findEmployeebyFirstName = (records, firstName) => {
    return records.find(r => {return r.firstName === firstName})
}