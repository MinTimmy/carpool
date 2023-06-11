var postItem = [
    {
        type: "find_customer",
        id: 1,
        departure_county: "台中",
        destination_county: "南投",
        departure_detail: "台中火車站",
        destination_detail: "暨南大學",
        time: "17:00, Tues, Oct 2, 2017",
        price: 100,
        driver_information: {
            license_plate: "ABC-1234",
            car_model: "mini cooper 藍",
            remain_person: 4
        }
    },
    {
        type: "find_customer",
        id: 2,
        departure_county: "南投",
        destination_county: "台中",
        departure_detail: "暨南大學",
        destination_detail: "台中火車站",
        time: "17:00, Tues, Oct 2, 2017",
        price: 200,
        driver_information: {
            license_plate: "CBA-7777",
            car_model: "Discovery Sport 白",
            remain_person: 4
        }
    }
];

export default postItem;