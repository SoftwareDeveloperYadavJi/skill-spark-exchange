### Dynamic Skill Marketplace - Frontend

The **Dynamic Skill Marketplace** frontend delivers a sleek, modern, and user-friendly experience for skill exchange. It facilitates user interactions, profile management, skill matching, Google Meet scheduling, and more.

---

## Features

- **Google Login Integration**: Simplified login with secure Google OAuth.
- **Responsive User Profiles**: LinkedIn-style profiles to showcase credentials, skills, and experience.
- **Skill Matching & Recommendations**: Discover complementary users for skill exchanges.
- **Hero Section for Beginners**: Prominent beginner-friendly coding sessions.
- **Connection Requests & Chat**: Send requests, chat, and coordinate sessions in real time.
- **Google Meet Scheduling**: Schedule meetings directly through the chat interface.

---

## Tech Stack

- **Framework**: React.js
- **State Management**: Context API / Redux
- **Styling**: Tailwind CSS, Sadcn UI
- **Authentication**: Google OAuth
- **APIs**: Integration with backend REST APIs.

---

## Installation and Setup

1. **Clone the Repository**
    
    ```bash
    git clone https://github.com/SoftwareDeveloperYadavJi/skill-spark-exchange
    ```
    
2. **Install Dependencies**
    
    ```bash
    npm install
    ```
    
3. **Set Up Environment Variables**
    
    Create a `.env.local` file with the following variables:
    ```
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
    NEXT_PUBLIC_API_BASE_URL=your_backend_api_url
    ```
    
4. **Run the Development Server**
    
    ```bash
    npm run dev
    ```
    
5. **Access the App**
    
    Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.
    
---

## Folder Structure

- `src/`: Main source folder.
    - `components/`: Reusable UI components.
    - `pages/`: Next.js page-based routing.
    - `styles/`: Tailwind CSS configurations.
    - `contexts/`: Context API for state management.
    - `utils/`: Helper functions.

---

## Routes

- `/`: Landing page with Hero Section and Google login.
- `/profile`: Profile management and credential display.
- `/explore`: Discover users and send requests.
- `/chat`: Chat with Google Meet scheduling.
- `/hero`: Beginner-friendly coding sessions.

---

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm start`: Run the application in production mode.
- `npm run lint`: Lint the codebase for style and syntax issues.

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/SoftwareDeveloperYadavJi/skill-spark-exchange/blob/main/LICENSE) file for details.

---

### Build an interactive and engaging skill-sharing experience with us!