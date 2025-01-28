export const bio = [
  "Hello, I'm Seima Osako!",
  "I have worked with several startups companies, focusing primarily on supporting the utilization of GPS location data, satellite imagery, and generative AI. In particular, I have been committed to developing technologies aimed at solving global environmental issues and addressing climate change.", 
  "My experience spans a wide range of projects, including using remote sensing in the agricultural and forestry sectors to generate carbon credits and determining optimal locations for solar power installations through the integration of geospatial information and data science.",
  "Currently, I am pursuing an MSc in Geo-Information Science at Wageningen University & Research, aiming to contribute globally in the fields of environmental sustainability and climate action.",
];

export const skills = [
  "Geospatial Information Knowledge & Processing Techniques (Optical & SAR imagery, meteorological & climatic data, GPS location data)",
  "Experience in data science (machine learning, deep learning)",
  "Ability to survey scholarly articles on geospatial information and apply implemented algorithms",
  "Strong commitment and responsibility towards projects",
  "Creation of proposal documents for clients (selection of geospatial data and analytical methods, workflow and schedule management)",
];

export const experience = [
  {
    title: "<a href='https://www.creattura.com/en' target='_blank'>Creattura Co., Ltd.</a>",
    duration: "April 2024 - Present",
    subtitle: "Data Scientist (Contractor)",
    details: [
      `Developed a Digital MRV (Measurement, Reporting, Verification) system for rice paddy carbon credits to support sustainable agriculture initiatives.`,
      `Created irrigation calendars using satellite imagery to optimize water management in rice paddies.`,
    ],
    tags: ["Remote Sensing", "IoT", "Carbon Credits&Markets"],
    icon: "pagelines",
  },
  {
    title: "<a href='https://nowcast.co.jp/en' target='_blank'>Nowcast Inc.</a>",
    duration: "July 2023 - June 2024",
    subtitle: "LLM Engineer (Contractor)",
    details: [
      `Streamlined the extraction of financial data from financial statements using Large Language Models (LLMs).`,
      `Supported the development of an FAQ chatbot to enhance customer support efficiency.`,
    ],
    tags: ["Python","LLMs",],
    icon: "language",
  },
  {
    title: "<a href='https://datafluct.com' target='_blank'>DATAFLUCT Inc.</a>",
    duration: "April 2021 - December 2024",
    subtitle: "Data Scientist (Full-time/Contractor)",
    details: [
      `Visualized foot traffic data to enhance area management efficiency and support urban planning.`,
      `Estimated CO2 emissions from vehicle movement data to aid in environmental assessments.`,
      `Predicted sales performance for new store locations using demographic mesh data and human flow metrics.`,
      `Detected and visualized paddy fields and rice cultivation conditions using machine learning and deep learning techniques.`,
      `Simulated bus operation efficiency by building mathematical optimization models for scheduling.`,
      `Developed estimation models for forest attributes (e.g., tree height, species, canopy, and age) and forest CO2 absorption using satellite imagery and LiDAR data`,
      `Designed logic to identify optimal installation sites for solar photovoltaic (PV) systems by integrating geospatial information data.`,
    ],
    tags: ["Python", "BigQuery", "Google Earth Engine", "Machine Learning", "Deep Learning"],
    icon: "bar-chart",
  },
  {
    title: "<a href='https://www.datawise.co.jp' target='_blank'>DataWise Inc.</a>",
    duration: "August 2019 - April 2020",
    subtitle: "Geospatial Data Analyst Intern",
    details: [
      `Conducted visitor flow and route usage analysis for real estate developers using gps mobile data.`,
      `Analyzed changes in human flow patterns due to the spread of COVID-19 to assess pandemic-related impacts.`,
    ],
    tags: ["Python", "BigQuery", "SAS-SQL", "GPS", "Location Analysis"],
    icon: "pie-chart",
  },
];

export const publication = [
  'Zhao, X., Nishina, K., Izumisawa, H., Masutomi, Y., <strong>Osako, S.</strong>, & Yamamoto, S. (2024). Monsoon Asia Rice Calendar (MARC): a gridded rice calendar in monsoon Asia based on Sentinel-1 and Sentinel-2 images. Earth System Science Data, 16(8), 3893-3911.',
];

export const education = [
  {
    title: "Wageningen University & Research",
    duration: "2024 - Present",
    subtitle: "Master of Science: Geo-Information Science",
    details: ["Short Paper <a href='/documents/AEO_ShortPaper.pdf' target='_blank'>[PDF]</a>: This study compared the forest loss detection capabilities of BFAST Monitor, a trajectory-based approach, with the Global Forest Change (GFC) dataset in tropical forests of Laos. Using MODIS EVI time-series data, BFAST Monitor achieved comparable accuracy to GFC, although potential overestimation was observed in areas of partial forest conversion"],
    tags: [
      "Remote Sensing",
      "Python",
      "R",
      "ArcGIS",
      "ERDAS IMAGINE",
    ],
    icon: "university",
  },
  {
    title: "University of Tsukuba",
    duration: "2019-2021",
    subtitle: "Master of Science: Geosciences",
    details: [
      "I analyzed the environmental conditions associated with extreme snowfall events caused by extratropical cyclone activity in Japan using historical big data. ",
      "Participation in the Workshop on Snowfall and Snow Cover 2020.",

    ],
    tags: ["Meteorology", "Climatology"],
    icon: "graduation-cap",
  },
];

export const footer = [
  //   {
  //     label: "Dev Profiles",
  //     data: [
  //       {
  //         text: "Stackoverflow",
  //         link: "https://stackoverflow.com/users/8461233/vinay-somawat",
  //       },
  //       {
  //         text: "GitHub",
  //         link: "https://github.com/vinaysomawat",
  //       },
  //       {
  //         text: "LeetCode",
  //         link: "https://leetcode.com/somawatvinay/",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Resources",
  //     data: [
  //       {
  //         text: "Enable Dark/Light Mode",
  //         func: "enableDarkMode()",
  //       },
  //       {
  //         text: "Print this page",
  //         func: "window.print()",
  //       },
  //       {
  //         text: "Clone this page",
  //         link: "https://github.com/vinaysomawat/vinaysomawat.github.io",
  //       },
  //     ],
  //   },
  {
    label: "Links",
    data: [
      {
        text: "Linkedin",
        link: "https://www.linkedin.com/in/seima-osako/",
      },
      {
        text: "Qiita",
        link: "https://qiita.com/OSAKO",
      },
    ],
  },
  {
    label: "copyright-text",
    data: [""],
  },
];
