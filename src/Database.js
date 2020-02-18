var DataObject = {
  Students:[
    {
      User: "Reon",
      Password: "12345",
      ModulesTaken: ["MA1101R","CS2030","CS1010S"],
      Course: "Business Analytics",
      Minor: "",
      SecondMajor: "",
      DoubleDegree: ""
    },
    {
      User: "Janson",
      Password: "98765",
      ModulesTaken: ["MA1521","CS2030","CS1010S","BT2102"],
      Course: "Business Analytics",
      Minor: "",
      SecondMajor: "",
      DoubleDegree: ""
    }
  ],
  Modules:[
    {
      Name: "CS2030",
      Faculty: "SOC",
      Prereq: ["CS1010S"],
      MCs: 4,
      Details: "This module is taught by proX"
    },
    {
      Name: "MA1101R",
      Faculty: "FOS",
      Prereq: [],
      MCs: 4,
      Details: "This module is taught by proY"
    },
    {
      Name: "BT2101",
      Faculty: "SOC",
      Prereq: ["MA1101R"],
      MCs: 4,
      Details: "This module is taught by proZ"
    }

  ],
  Courses:[
    {
      Name: "Business Analytics",
      ModulesNeeded: ["CS1010S", "CS2030", "BT2101", "MA1101R"]
    }
  ],
  Reviews:[
    {
      Module: "CS2030",
      Review: "This is a shit mod",
      Rating: 5
    }
  ]
}

module.exports = DataObject;