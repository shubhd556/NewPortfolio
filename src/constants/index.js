import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  bestresto,
  JCI,
  Google,
  carrent,
  jobit,
  tripguide,
  threejs,
  DSAPrgress,
  DailyPlanner
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "project",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
   {
    id: "certificate",
    title: "Certificates",
  }
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Java SpringBoot Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Software Developer ( Full Stack)",
    company_name: "Johnson Controls",
    icon: JCI,
    iconBg: "#383E56",
    date: "January 2022 - Current",
    points: [
      "Developed a cloud-ready Leave Management System using React, Node.js (Express), and MongoDB, deployed on Azure App Service, reducing HR email traffic by 30% through self-service leave tracking and approvals. ",
      "Built a Project Tracker Dashboard with React (Hooks, Context API) and Node.js REST APIs, integrated with PostgreSQL, and deployed via Docker + Azure Kubernetes Service, enabling 5+ internal teams to monitor tasks and resource allocation in real time. ",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Created an Asset Request Tool using Power Apps + Power Automate for multi-level approvals and automated email notifications, reducing manual intervention. ",
      "Participated in Agile sprints, code reviews, and CI/CD pipelines using GitHub Actions, Azure DevOps, and Docker for containerized deployments. "
    ],
  },
  {
    title: "Front End Dev",
    company_name: "Google Developer Student Clubs, PCCOE",
    icon: Google,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  }
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Best Resto",
    description:
      "Web-based platform BestResto is a modern web application built to help users quickly discover top restaurants in a given area, tailored by cuisine, dietary preferences, service type, and location. Leveraging powerful APIs and a clean intuitive UI, the app makes restaurant-searching faster, smarter and more enjoyable.",
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "Google Places API",
        color: "black-text-gradient",
      },
    ],
    image: bestresto,
    source_code_link: "https://github.com/shubhd556/BestResto/",
  },
  {
    name: "DSA Progress tracker",
    description:
      "The DSAProgresstracker is a personal, web-based application designed to help users track their progress through the NeetCode 150 (a popular curated list of Data Structures and Algorithms problems for interview preparation). It provides a clean, organized interface to mark problems as complete, visualize statistics, and gamify the learning process.",
    tags: [
      {
        name: "HTML",
        color: "blue-text-gradient",
      },
      {
        name: "CSS",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "pink-text-gradient",
      },
    ],
    image: DSAPrgress,
    source_code_link: "https://github.com/shubhd556/DSAProgresstracker",
  },
  {
    name: "Daily Planner",
    description:
      "Daily Planner with Gemini AI This project transforms a standard to-do list into an intelligent productivity tool. Built on Next.js 14, it leverages the Gemini API to offer a conversational interface alongside a traditional UI. Users can type natural instructions like 'Move my gym session to 6 PM and mark it as high priority,' and the AI executes the changes instantly via custom tool-calling.",
    tags: [
      {
        name: "Next.js 14,",
        color: "blue-text-gradient",
      },
      {
        name: "React 18",
        color: "green-text-gradient",
      },
      {
        name: "Google Gemini API",
        color: "black-text-gradient",
      },
    ],
    image: DailyPlanner,
    source_code_link: "https://github.com/shubhd556/DailyPlanner",
  },
];

export { services, technologies, experiences, testimonials, projects };
