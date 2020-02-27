var DataObject = {
  Students: [
    {
      User: "Reon",
      Password: "12345",
      ModulesTaken: ["MA1101R", "CS2030", "CS1010S"],
      Course: "Business Analytics",
      Minor: "",
      SecondMajor: "",
      DoubleDegree: ""
    },
    {
      User: "Janson",
      Password: "98765",
      ModulesTaken: ["MA1521", "CS2030", "CS1010S", "BT2102"],
      Course: "Business Analytics",
      Minor: "",
      SecondMajor: "",
      DoubleDegree: ""
    }
  ],
  Modules: [
    {
      moduleCode: "CS2030",
      title: "Programming Methodology II",
      description: "This module is a follow up to CS1010. It explores two modern programming paradigms, object-oriented programming and functional programming. Through a series of integrated assignments, students will learn to develop medium-scale software programs in the order of thousands of lines of code and tens of classes using objectoriented design principles and advanced programming constructs available in the two paradigms. Topics include\nobjects and classes, composition, association, inheritance, interface, polymorphism, abstract classes, dynamic binding, lambda expression, effect-free programming, first class functions, closures, continuations, monad, etc.",
      moduleCredit: "4",
      department: "Computer Science",
      faculty: "Computing",
      workload: [
        2,
        0,
        2,
        3,
        3
      ],
      prerequisite: "CS1010 or its equivalent",
      preclusion: "CS1020 or its equivalent",
      semesterData: [
        {
          semester: 1,
          examDate: "2019-12-04T09:00:00.000Z",
          examDuration: 120
        },
        {
          semester: 2,
          examDate: "2020-05-05T09:00:00.000Z",
          examDuration: 120
        },
        {
          semester: 3,
          examDate: "2020-06-19T06:30:00.000Z",
          examDuration: 120
        }
      ]
    },
    {
      moduleCode: "MA1101R",
      title: "Linear Algebra I",
      description: "This module is a first course in linear algebra.  Fundamental concepts of linear algebra will be introduced and investigated in the context of the Euclidean spaces R^n.  Proofs of results will be presented in the concrete setting.  Students are expected to acquire computational facilities and geometric intuition with regard to vectors and matrices.  Some applications will be presented. Major topics: Systems of linear equations, matrices, determinants, Euclidean spaces, linear combinations and linear span, subspaces, linear independence, bases and dimension, rank of a matrix, inner products, eigenvalues and eigenvectors, diagonalization, linear transformations between Euclidean spaces, applications.",
      moduleCredit: "4",
      department: "Mathematics",
      faculty: "Science",
      workload: [
        3,
        1,
        1,
        0,
        6
      ],
      prerequisite: "GCE ‘A’ Level or H2 Mathematics or H2 Further Mathematics  or MA1301 or MA1301FC or MA1301X",
      preclusion: "EG1401, EG1402, MA1101, MA1311, MA1506, MA1508, FOE students",
      attributes: {
        "su": true
      },
      semesterData: [
        {
          semester: 1,
          examDate: "2019-11-28T09:00:00.000Z",
          examDuration: 120
        },
        {
          semester: 2,
          examDate: "2020-04-30T09:00:00.000Z",
          examDuration: 120
        }
      ]
    },
    {
      moduleCode: "BT2101",
      title: "Decision Making Methods and Tools",
      description: "This module provides a general introduction to using various IT-driven tools, software and techniques for decision making support. The module will start off by describing the decision-making process in businesses today. It will proceed to cover methods such as prediction and classification methods, markov chain monte carlo, simulation, forecasting time series, and neural network among others. Examples will also be drawn from various industry domains and applications.",
      moduleCredit: "4",
      department: "Information Systems and Analytics",
      faculty: "Computing",
      workload: [
        2,
        1,
        0,
        3,
        4
      ],
      prerequisite: "(CS1010 Programming Methodology or its equivalent) and (MA1521 Calculus for Computing or MA1102R Calculus) and (BT1101 Introduction to Business Analytics)",
      semesterData: [
        {
          semester: 1,
          examDate: "2019-11-28T05:00:00.000Z",
          examDuration: 120
        },
        {
          semester: 2,
          examDate: "2020-04-29T09:00:00.000Z",
          examDuration: 120
        }
      ]
    },
    {
      moduleCode: "AH3202",
      title: "Time Traveller: The Curatorial in Southeast Asia",
      description:
        "The module aims to equip students with curatorial methodologies and theories drawn from the history of exhibitions in Southeast Asia. Students will be introduced to postcolonial theories, approaches and methodologies with an inter-disciplinary focus that can be used to frame the art histories of the region. This module will provide opportunities for students to gain hands-on experience of curatorial practices through workshops with curators, conservators, educators and public programmers by drawing resources from the NUS Museum and the National Gallery Singapore.",
      moduleCredit: "4",
      department: "History",
      faculty: "Arts and Social Science",
      workload: [2, 1, 0, 0, 7],
      prerequisite: "AH2101",
      semesterData: [
        {
          semester: 2
        },
        {
          semester: 3
        }
      ]
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
      module_code: "BT3103",
      module_name: "Application Systems for Business Analytics",
      comments:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
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
      module_code: "BT3102",
      module_name: "Computational Methods for Business Analytics",
      comments:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
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
      module_code: "CS1010S",
      module_name: "Programming Methodology I",
      comments:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
      comment_count: 15,
      like_count: 22,
      lecture_comments: 'The prof has a knack for explaining concepts well, and manages to keep the students entertained through the power of sorting algorithm dances!',
      tutorial_comments: 'Tutorial exercises were useful in reinforcing concepts taught. My tutor prepared her own slides which was very useful for studying the module!',
      date: '06/08/2019',
      grade_obtained: 'A',
      sem_taken: 'AY1819 Semester 2'
    },


  ]
};

module.exports = DataObject;
