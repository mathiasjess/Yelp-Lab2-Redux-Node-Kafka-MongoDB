let data = [
    {
        restaurantName: "Cocina Del Charro",
        events: [
            {
                _id: "5f8d43aa0283c34eb49bc104",
                eventName: "E.A.T",
                eventDescription: "Eat and Greet",
                eventTime: "7.00pm onwards",
                eventDate: "2020-11-15T00:00:00.000Z",
                eventLocation: "At the restaurant",
                eventHashtag: "#EAT",
                registeredUsers: [
                    {
                        customerID: "5f8dc93ebe57c183a872f8aa",
                        customerName: "Mike Scott"
                    }
                ]
            },
            {
                _id: "5f8f4d2168ab008038863763",
                eventName: "Karaoke Nights",
                eventDescription: "Singing and Fun",
                eventTime: "8.00pm onwards",
                eventDate: "2020-10-29T00:00:00.000Z",
                eventLocation: "At the restaurant",
                eventHashtag: "#Karaoke",
                registeredUsers: [
                    {
                        customerID: "5f8dc93ebe57c183a872f8aa",
                        customerName: "Mike Scott"
                    },
                    {
                        customerID: "5fa19d18445a13129cfbc9e7",
                        customerName: "Sheldon Cooper"
                    }
                ]
            },
            {
                _id: "5f8f6a682033da8af462e7e9",
                eventName: "Taste of the Mediterranean",
                eventDescription: "Taste of the Mediterranean",
                eventTime: "7.00 pm onwards",
                eventDate: "2020-10-22T00:00:00.000Z",
                eventLocation: "Taste of the Mediterranean",
                eventHashtag: "Taste of the Mediterranean",
                registeredUsers: [
                    {
                        customerID: "5f8dc93ebe57c183a872f8aa",
                        customerName: "Mike Scott"
                    }
                ]
            },
            {
                _id: "5fa0c161758ebc2b40617109",
                eventName: "Event3",
                eventDescription: "Event3",
                eventTime: "Event3",
                eventDate: "2020-11-12T00:00:00.000Z",
                eventLocation: "Event3",
                eventHashtag: "Event3",
                registeredUsers: []
            }
        ]
    }
]

let individualOrder = {}
let OrderHistoryresult = []

// data.map(event=>{
//     for ( let i = 0; i< event.events.length; i++){
//         for (let j = 0; j<event.events[i].registeredUsers.length; j++){
//         console.log(event.restaurantName)
//         console.log(event.events[i].eventName)
//         console.log(event.events[i].registeredUsers[j].customerID)
//         console.log(event.events[i].registeredUsers[j].customerName)
//     }
//     }
// })

// data.map(event=>{
//     event.events.map(event1 =>{
//         event1.registeredUsers.map(reg=>{
//             console.log(event.restaurantName)
//             console.log(event1.eventName)
//             console.log(reg)
//         })


//     })
// })
//         for (let j = 0; j<event.events[i].registeredUsers.length; j++){
//         console.log(event.restaurantName)
//         console.log(event.events[i].eventName)
//         console.log(event.events[i].registeredUsers[j].customerID)
//         console.log(event.events[i].registeredUsers[j].customerName)
//     }
//     }
// })

data.map(event => {
    event.events.map(event1 => {
        event1.registeredUsers.map(reg => {
            if (reg.customerID === "5f8dc93ebe57c183a872f8aa") {
                individualOrder = {
                    restaurantName: event.restaurantName,
                    customerID: reg.customerID,
                    customerName: reg.customerName,
                    eventName: event1.eventName,
                    eventDescription: event1.eventDescription,
                    eventDate: event1.eventDate,
                    eventLocation: event1.eventLocation,
                    eventHashtag: event1.eventHashtag
                }
                OrderHistoryresult.push(individualOrder)
                individualOrder = {}
            }

        })
    })
})

console.log(OrderHistoryresult)