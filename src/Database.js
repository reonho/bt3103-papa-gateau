var DataObject = {
  Students: [
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
  Modules: [
    {
      id: 1,
      Name: "CS2030",
      Faculty: "SOC",
      Prereq: ["CS1010S"],
      MCs: 4,
      Details: "This module is taught by proX"
    },
    {
      id: 2,
      Name: "MA1101R",
      Faculty: "FOS",
      Prereq: [],
      MCs: 4,
      Details: "This module is taught by proY"
    },
    {
      id: 3,
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
      comments: 'Overall, I enjoyed the module. The content taught was useful and helped to develop my interest in web development.',
      comment_count: 15,
      like_count: 8,
      lecture_comments: 'Lectures are great! The professor is well-versed in the subject matter and leverages on in-class exercises for students to learn better!',
      tutorial_comments: 'There were no tutorials for this module, as both lectures and tutorials were done together.',
      date: '01/01/2020',
      grade_obtained: 'A',
      sem_taken: 'AY1920 Semester 1'
    },
    {
      id: 2,
      module_code: 'BT3102',
      module_name: 'Computational Methods for Business Analytics',
      comments: 'The module teaches you the theory behind OLS regression, which required a good understanding of linear algebra. Highly advised to take MA1101R before this!',
      comment_count: 15,
      like_count: 4,
      lecture_comments: 'The slides were well-crafted and informative. The professor is knowledgeable and approachable, and provides additional resources in the lecture slides.',
      tutorial_comments: 'Due to the nCov outbreak, the tutorials were delivered in a recording. The materials were helpful in strengthening the understanding of lecture concepts!',
      date: '06/02/2020',
      grade_obtained: 'A',
      sem_taken: 'AY1920 Semester 2'

    },
    {
      id: 3,
      module_code: 'CS1010S',
      module_name: 'Programming Methodology I',
      comments: 'The module was a good primer to python and computational thinking in general. Although the weekly missions were heavy, they were useful in assessing our understanding of lecture concepts. Study and you will do well!',
      comment_count: 15,
      like_count: 22,
      lecture_comments: 'The prof has a knack for explaining concepts well, and manages to keep the students entertained through the power of sorting algorithm dances!',
      tutorial_comments: 'Tutorial exercises were useful in reinforcing concepts taught. My tutor prepared her own slides which was very useful for studying the module!',
      date: '06/08/2019',
      grade_obtained: 'A',
      sem_taken: 'AY1819 Semester 2'
    },


  ]
}

module.exports = DataObject;