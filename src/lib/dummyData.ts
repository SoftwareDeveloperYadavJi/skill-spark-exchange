export const dummyUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    name: "Admin User",
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "TypeScript"],
    sessions: 15,
    rating: 4.8,
    connections: 128
  },
  {
    id: 2,
    username: "sarah_dev",
    password: "password123",
    name: "Sarah Johnson",
    role: "Frontend Developer",
    skills: ["React", "Vue.js", "CSS"],
    sessions: 12,
    rating: 4.9,
    connections: 75
  },
  {
    id: 3,
    username: "mike_code",
    password: "password123",
    name: "Mike Chen",
    role: "Backend Developer",
    skills: ["Python", "Django", "PostgreSQL"],
    sessions: 8,
    rating: 4.7,
    connections: 50
  }
];

export const dummySessions = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    mentor: "Sarah Johnson",
    date: "Mar 15, 2024",
    time: "2:00 PM EST",
    topics: ["React", "JavaScript", "Hooks"]
  },
  {
    id: 2,
    title: "Building APIs with Node.js",
    mentor: "Mike Chen",
    date: "Mar 16, 2024",
    time: "3:00 PM EST",
    topics: ["Node.js", "REST API", "Express"]
  },
  {
    id: 3,
    title: "CSS Grid Mastery",
    mentor: "Emma Wilson",
    date: "Mar 17, 2024",
    time: "1:00 PM EST",
    topics: ["CSS", "Layout", "Responsive Design"]
  }
];

export const dummyConnections = [
  {
    id: 1,
    userId: 2,
    status: "pending"
  },
  {
    id: 2,
    userId: 3,
    status: "accepted"
  }
];


export const additionalDummySessions : any= [

  {

    id: 1,

    title: "Session 1",

    mentor: "John Doe",

    date: "2023-10-01",

    time: "10:00 AM",

    topics: ["React", "TypeScript"],

    meetingLink: "https://example.com/session1"

  },

  {

    id: 2,

    title: "Session 2",

    mentor: "Jane Smith",

    date: "2023-10-02",

    time: "11:00 AM",

    topics: ["Node.js", "Express"],

    meetingLink: "https://example.com/session2"

  }

];

