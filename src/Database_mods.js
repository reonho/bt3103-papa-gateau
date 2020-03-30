var DataObject = {
  Modules: [
    {
      moduleCode: "ACC1002",
      title: "Financial Accounting",
      description:
        "The course provides an introduction to financial accounting. It examines accounting from an external user's perspective: an external user being an investor or a creditor. Such users would need to understand financial accounting in order to make investing or lending decisions. However, to attain a good understanding, it is also necessary to be familiar with how the information is derived. Therefore, students would learn how to prepare the reports or statements resulting from financial accounting and how to use them for decision-making.",
      moduleCredit: "4",
      department: "Accounting",
      faculty: "NUS Business School",
      workload: [2, 2, 0, 3, 4],
      preclusion:
        "Students who have passed FNA1002 are not allowed to take ACC1002.",
      attributes: {
        su: true
      },
      semesterData: [
        {
          semester: 1,
          examDate: "2018-12-01T01:00:00.000Z",
          examDuration: 120
        },
        {
          semester: 2
        }
      ]
    },
    {
      moduleCode: "ACC1002X",
      title: "Financial Accounting",
      description:
        "The course provides an introduction to financial accounting. It examines accounting from an external user's perspective: an external user being an investor or a creditor. Such users would need to understand financial accounting in order to make investing or lending decisions. However, to attain a good understanding, it is also necessary to be familiar with how the information are derived. Therefore, students would learn how to prepare the reports or statements resulting from financial accounting and how to use them for decision-making.",
      moduleCredit: "4",
      department: "Accounting",
      faculty: "NUS Business School",
      preclusion:
        "Students who have passed CS1304 or EC3212 or BK1003 or BZ1002 or BH1002 or BZ1002E or BH1002E or FNA1002E or FNA1002X are not allowed to take ACC1002X.",
      attributes: {
        su: true
      },
      semesterData: [
        {
          semester: 1,
          examDate: "2018-12-01T01:00:00.000Z",
          examDuration: 120
        },
        {
          semester: 2,
          examDate: "2019-05-04T01:00:00.000Z",
          examDuration: 120
        }
      ]
    },
    {
      moduleCode: "ACC1006",
      title: "Accounting Information Systems",
      description:
        "This course aims to help students understand the role of information systems in accounting and other areas of business. \n\nIn particular, it examines the innovative applications of information systems to streamline business operations and enhance competitive advantage. \n\nStudents will understand various accounting/business cycles and learn about how information systems are used in different functional areas such as finance/accounting, marketing, operations and supply chain, and HR/management.",
      moduleCredit: "4",
      department: "Accounting",
      faculty: "NUS Business School",
      workload: [0, 3, 0, 4, 3],
      prerequisite: "FNA1002 or ACC1002",
      preclusion:
        "Students who have passed FNA1006 are not allowed to take ACC1006.",
      attributes: {
        su: true
      },
      semesterData: [
        {
          semester: 1,
          examDate: "2018-12-06T05:00:00.000Z",
          examDuration: 120
        },
        {
          semester: 2,
          examDate: "2019-05-09T05:00:00.000Z",
          examDuration: 120
        }
      ]
    },
    {
      moduleCode: "ACC1701",
      title: "Accounting for Decision Makers",
      description:
        "The course provides an introduction to accounting from a user perspective. Financial reporting is covered from the viewpoint of an external investor. The focus is on how accounting can help investors make better decisions. Book-keeping and preparation of financial statements are also covered at an introductory level, as investors need to be aware of how the financial statements are derived.",
      moduleCredit: "4",
      department: "Accounting",
      faculty: "NUS Business School",
      workload: [2, 1, 0, 4, 3],
      preclusion: "ACC1002; ACC1002X; EC2204",
      attributes: {
        su: true,
        sfs: true,
        ssgf: true
      },
      semesterData: [
        {
          semester: 1,
          examDate: "2018-12-01T01:00:00.000Z",
          examDuration: 120
        },
        {
          semester: 2,
          examDate: "2019-05-04T01:00:00.000Z",
          examDuration: 120
        }
      ]
    },
    {
      moduleCode: "IS2103",
      title: "Enterprise Systems Server-side Design and Development",
      description:
        "This module aims to train students to be conversant in backend or server-side development for Enterprise Systems. It complements IS3106, which focuses on front-end development aspects for Enterprise Systems. Students will learn modern development techniques such as component-based development, service-oriented development and object-relational mapping. One or more established development platforms would be carefully chosen to allow students to put into practice the various concepts that are taught in the module.\nAn emphasis would also be placed on Enterprise Systems security.",
      moduleCredit: "4",
      department: "Information Systems and Analytics",
      faculty: "Computing",
      workload: [2, 0, 1, 3, 4],
      prerequisite: "CS1020 or CS2030",
      semesterData: [
        {
          semester: 1,
          examDate: "2018-11-29T05:00:00.000Z",
          examDuration: 120
        },
        {
          semester: 2,
          examDate: "2019-05-06T09:00:00.000Z",
          examDuration: 120
        }
      ]
    },
    {
      moduleCode: "IS2150",
      title: "E-Business Design and Implementation",
      description:
        "This module aims to train students to be conversant in the technologies, approaches, principles and issues in designing effective e-commerce and e-business systems.\n\nMajor topics include: J2EE and .NET for e-commerce, scripting languages (Javascript/JSP/ASP/PHP/Perl), development frameworks (Flex, AJAX, servlets), database design and management for the internet, tracking and analysis of customers, payment services/verification, implementing security, XML,\ninventory/order/shipping management services and systems, planning, designing and deploying web services, and operational considerations and technical tradeoffs.",
      moduleCredit: "4",
      department: "Information Systems and Analytics",
      faculty: "Computing",
      workload: [2, 1, 0, 3, 4],
      prerequisite: "(CS1020 or CS1102 or CS1102S) and IS1112",
      semesterData: []
    },
    {
      moduleCode: "IS3101",
      title: "Management of Information Systems",
      description:
        "The course covers the essentials in management of information systems in an organisational setting. Students will gain an understanding of the managerial issues in the development and operation of information systems. The main topics include: information systems planning, management of systems development and maintenance, implementation management, end-user computing, data centre operations, information systems control and evaluation, acquisition of IS resources and management of IS personnel. Case studies will be used to illustrate the issues and solutions.",
      moduleCredit: "4",
      department: "Information Systems and Analytics",
      faculty: "Computing",
      workload: [2, 1, 0, 3, 4],
      prerequisite: "CS2250 or (IS1103 and IS1105)",
      preclusion: "CS3253",
      semesterData: []
    },
    {
      moduleCode: "IS3102",
      title: "Enterprise Systems Development Project",
      description:
        "Students are required to work (in groups) through a complete Systems Development Life Cycle to develop a business information system based on techniques and tools taught in CS2103 or IS2103. IS3102 can be viewed as a large-scale practical module of CS2103 or IS2103. They will also sharpen communication skills through close team interactions, consultations, and formal presentations. Emphasis will be placed on requirement analysis, system design, user interface design, database design and implementation efficiency. Students will be assessed based on their understanding and ability to apply software engineering knowledge on a real-life application system.",
      moduleCredit: "8",
      department: "Information Systems and Analytics",
      faculty: "Computing",
      workload: [1, 1, 0, 10, 8],
      prerequisite:
        "CS2261 or IS2103 (applicable to intakes from AY2005/06 to AY2007/08) or [(CS2261 or IS2103) and (CS2301 or IS2101)] (applicable to intakes from AY2008/09 onwards)",
      preclusion: "CS3214",
      semesterData: []
    },
    {
      moduleCode: "IS3103",
      title: "Information Systems Leadership and Communication",
      description:
        "Today’s technology leaders need to have a deep understanding of business\nfundamentals, recognize the key drivers of innovation, and develop effective leadership to align and integrate novel technologies and business processes for successful products and services. The course will not only cover major topics relating strategic, tactical and operational facets of thought leadership in propelling IT implementations, adoptions and changes in organization but also equip students with industry-relevant communication skillsets. The strategic facet will explore the various contexts, complex issues and dynamic paths that evoke leadership in information systems, including technology championship, disruptive technology, and IT ecosystem. The tactical facet will strategize a culture to co-create value and nurture technological innovations. Students will be taught effective communication skills for influential communication, change management communication and directional communication. These skillsets will enable them to foster partnership between technology and business stakeholders such as vendors, IT professionals and functional users. The operational facet will include leadership areas in IT portfolio management, change management, and IT applications. Through a synthesis of critical knowledge areas required of technology leaders, students will examine the intersection of technology and business to drive IT-enabled changes in an\norganization. The course will prepare students for senior technology positions, and develop core communication skills that leaders need to be equipped with to be successful in leading technological transformations.",
      moduleCredit: "4",
      department: "Information Systems and Analytics",
      faculty: "Computing",
      workload: [2, 1, 3, 2, 2],
      prerequisite: "(IS1103 or equivalent) and (CS2101 or IS2101)",
      preclusion: "IS3101",
      semesterData: [
        {
          semester: 1
        },
        {
          semester: 2
        }
      ]
    },
    {
      moduleCode: "IS3106",
      title: "Enterprise Systems Interface Design and Development",
      description:
        "This module aims to train students to be conversant in front-end development for Enterprise Systems. It complements IS2103 which focuses on backend development aspects for Enterprise Systems.\n\nTopics covered include: web development scripting languages, web templating design and component design, integrating with backend application, and basic mobile application development.",
      moduleCredit: "4",
      department: "Information Systems and Analytics",
      faculty: "Computing",
      workload: [2, 0, 2, 3, 3],
      prerequisite: "IS2103",
      preclusion: "CS3226",
      semesterData: [
        {
          semester: 1,
          examDate: "2018-12-04T05:00:00.000Z",
          examDuration: 120
        },
        {
          semester: 2,
          examDate: "2019-05-04T01:00:00.000Z",
          examDuration: 120
        }
      ]
    },
    {
      moduleCode: "CS5241",
      title: "Speech Processing",
      description:
        "This module exposes the graduate students to the fundamental theory of speech processing, focusing primarily on automatic speech recognition. Upon completion of this module, students should be able to perform research on speech recognition topics and commercial speech technology development. Topics covered by this module include: speech signal processing, automatic speech recognition (ASR), continuous speech recognition, acoustic modelling using the Hidden Markov Model (HMM), language modelling for ASR and advanced speech recognition techniques for state-of-the-art large vocabulary continuous speech recognition (adaptation and robustness, discriminative training and decoding strategies).",
      moduleCredit: "4",
      department: "Computer Science",
      faculty: "Computing",
      workload: [2, 0, 0, 3, 5],
      prerequisite:
        "(CS1020 or  its equivalent) and CS1231 and (MA1102R or MA1505 or MA1521) and (MA1101R or MA1506)",
      semesterData: []
    },
    {
      moduleCode: "CS5242",
      title: "Neural Networks and Deep Learning",
      description:
        "This module provides students with the knowledge of deep neural network and enables them to apply deep learning methods effectively on real world problems.  The module emphasizes on the understanding of the principles of neural networks and deep learning; practical guidelines and techniques for deep learning; and their applications.  Through assignments and projects, students will design, develop, and evaluate deep learning-based solutions to practical problems, such as those in the areas of computer vision, bioinformatics, fintech, cybersecurity, and games.",
      moduleCredit: "4",
      department: "Computer Science",
      faculty: "Computing",
      workload: [2, 0, 0, 5, 3],
      prerequisite: "CS3244 Machine Learning",
      attributes: {
        lab: true
      },
      semesterData: [
        {
          semester: 1
        },
        {
          semester: 2
        }
      ]
    },
    {
      moduleCode: "CS5246",
      title: "Text Mining",
      description:
        "Text mining concerns the processing of unstructured natural language text to mine information and knowledge. It is distinguished from data mining in its focus on unstructured text rather than structured data present in traditional databases. Topics include text classification, text clustering, sentiment analysis, text summarization, information extraction (named entity recognition, relation and event extraction), and question answering. The module will emphasize the use of machine learning approaches to text mining.",
      moduleCredit: "4",
      department: "Computer Science",
      faculty: "Computing",
      workload: [2, 0, 0, 5, 3],
      prerequisite:
        "CS2103 and \n(MA1101R or MA1311 or MA1506 or MA1508E) and\n(ST1232 or ST2131 or ST2334)",
      semesterData: [
        {
          semester: 2
        }
      ]
    },
    {
      moduleCode: "CS5248",
      title: "Systems Support for Continuous Media",
      description:
        "This module is targeted at computer science graduate students and covers the major aspects of building streaming media applications -- from coding to transmission to playback. Issues such as transport protocols, control protocols, caching, buffering, synchronisation and adaptations will be examined.",
      moduleCredit: "4",
      department: "Computer Science",
      faculty: "Computing",
      workload: [2, 0, 0, 6, 2],
      prerequisite:
        "CS2106 Introduction to Operating Systems and CS4226 Internet Architecture",
      semesterData: []
    },
    {
      moduleCode: "CS5249",
      title: "Audio in Multimedia Systems",
      description:
        "This module aims at providing students with an in-depth understanding of modern audio technologies, ranging from low-level audio representation to high-level content analysis; and from basic waveform to advanced audio compression and compressed domain processing. Upon completion of this module, students should be able to perform research such as narrowing the semantic gap between low-level features and high-level concepts. Topics include: discretization, sampling, audio formats, audio synthesis, spatial audio, feature extraction, speech recognition, audio segmentation and summarization, source separation, and audio compression.",
      moduleCredit: "4",
      department: "Computer Science",
      faculty: "Computing",
      workload: [2, 0, 0, 6, 2],
      prerequisite:
        "CS1020 or its equivalent) and CS1231 and (MA1102R or MA1505 or MA1505C or MA1521) and (MA1101R or MA1506)",
      semesterData: []
    }
  ]
};
module.exports = DataObject;
