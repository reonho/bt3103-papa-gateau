var DataObject = {
  Students: [
    {
      Name: "Reon",
      ModulesTaken: ["MA1101R", "CS2030", "CS1010S"],
      Course: "Business Analytics",
      Minor: "",
      SecondMajor: "",
      DoubleDegree: ""
    }
  ],
  Modules: [
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
  Courses: [
    {
      Name: "Business Analytics",
      ModulesNeeded: ["CS1010S", "CS2030", "BT2101", "MA1101R"]
    }
  ],
  Reviews: [
    {
      Module: "CS2030",
      Review: "This is a shit mod",
      Rating: 5
    }
  ],

  faculties: [
    {
      id: 1,
      title: "Arts & Social Sciences"
    },
    {
      id: 2,
      title: "Business"
    },
    {
      id: 3,
      title: "Computing"
    },
    {
      id: 4,
      title: "Continuing and Lifelong Education"
    },
    {
      id: 5,
      title: "Dentistry"
    },
    {
      id: 6,
      title: "Design & Environment"
    },
    {
      id: 7,
      title: "Engineering"
    },
    {
      id: 8,
      title: "Interactive Sciences & Engineering"
    },
    {
      id: 9,
      title: "Law"
    },
    {
      id: 10,
      title: "Medicine"
    },
    {
      id: 11,
      title: "Music"
    },
    {
      id: 12,
      title: "Public Health"
    },
    {
      id: 13,
      title: "Public Policy"
    },
    {
      id: 14,
      title: "Science"
    }
  ],

  semesters: [
    {
      id: 1,
      title: "AY1819 Semester 2"
    },
    {
      id: 2,
      title: "AY1819 Semester 1"
    }
  ],
  staff: [
    {
      id: 1,
      name: "Leong Wai Kay"
    },
    {
      id: 2,
      name: "Ben Leong"
    }
  ],
  grades: [
    {
      id: 1,
      title: "A+"
    },
    {
      id: 2,
      title: "A"
    },
    {
      id: 3,
      title: "A-"
    },
    {
      id: 4,
      title: "B+"
    },
    {
      id: 5,
      title: "B"
    },
    {
      id: 6,
      title: "B-"
    },
    {
      id: 7,
      title: "C+"
    },
    {
      id: 8,
      title: "C"
    },
    {
      id: 9,
      title: "D+"
    },
    {
      id: 10,
      title: "D"
    },
    {
      id: 11,
      title: "F"
    },
    {
      id: 12,
      title: "S"
    },
    {
      id: 13,
      title: "U"
    }
  ],
  reviewData: [
    {
      id: 1,
      module_code: 'BT3103',
      module_name: 'Application Systems for Business Analytics',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
      comment_count: 15,
      like_count: 8
    },
    {
      id: 2,
      module_code: 'BT3102',
      module_name: 'Computational Methods for Business Analytics',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
      comment_count: 15,
      like_count: 4
    },
    {
      id: 3,
      module_code: 'CS1010S',
      module_name: 'Programming Methodology I',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
      comment_count: 15,
      like_count: 22
    },


  ]
}

module.exports = DataObject;