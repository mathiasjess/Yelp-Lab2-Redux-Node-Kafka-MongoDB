let events = [
    {
        eventDate: "2020-10-22T00:00:00.000Z",
eventDescription: "Taste of the Mediterranean",
eventHashtag: "Taste of the Mediterranean",
eventID: "5f8f6a682033da8af462e7e9",
eventLocation: "Taste of the Mediterranean",
eventName: "Taste of the Mediterranean",
eventTime: "7.00 pm onwards",
    },
    {
        eventDate: "2020-11-15T00:00:00.000Z",
        eventDescription: "Eat and Greet",
        eventHashtag: "#EAT",
        eventID: "5f8d43aa0283c34eb49bc104",
        eventLocation: "At the restaurant",
        eventName: "E.A.T",
        eventTime: "7.00pm onwards"
    },
    {
        eventDate: "2020-10-29T00:00:00.000Z",
eventDescription: "Singing and Fun",
eventHashtag: "#Karaoke",
eventID: "5f8f4d2168ab008038863763",
eventLocation: "At the restaurant",
eventName: "Karaoke Nights",
eventTime: "8.00pm onwards",
    },
]
edate = "2020-10-29T00:00:00.000Z"
// console.log(edate.slice(0,10))

a = [
    {
        a : 1,
        b : 2,
        c : 3,
    },
    {
        a : 4,
        b : 7,
        c : 1,
    },
    {
        a : 3,
        b : 5,
        c : 2,
    }
]
// const activities = [
//     { title: 'Hiking', date: new Date('2019-06-28') },
//     { title: 'Shopping', date: new Date('2019-06-10') },
//     { title: 'Trekking', date: new Date('2019-06-22') }
//   ]

//   const sortedActivities = activities.sort((a, b) => b.date - a.date)

//   console.log(sortedActivities)
// const sorteda = a.sort((x,y)=>x.a-y.a)
// console.log(sorteda)
const sortedEvents = events.sort((a,b)=>{
    x = new Date(a.eventDate.slice(0,10))
    y = new Date(b.eventDate.slice(0,10))
    return(y-x)
})

console.log(sortedEvents)