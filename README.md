# golf
golf club manager
# Golf Club Manager

A comprehensive members-only golf application for tracking scorecards, handicaps, and managing golf rounds at various public courses.

## Features

- **Virtual Scorecard**: Interactive 18-hole scorecard with real-time scoring
- **Handicap Tracking**: Automatic handicap calculation and member leaderboards
- **Round Management**: Schedule, plan, and track golf rounds
- **Member Portal**: Manage club members and their statistics
- **Course Database**: Multiple public courses with ratings and details
- **Dashboard**: Overview of upcoming rounds, recent scores, and club statistics

## Screenshots

![Dashboard](docs/screenshots/dashboard-screenshot.png)
![Scorecard](docs/screenshots/scorecard-screenshot.png)
![Leaderboard](docs/screenshots/leaderboard-screenshot.png)

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/golf-club-manager.git
cd golf-club-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

### Build for Production

```bash
npm run build
```

## Usage

### Managing Members
- Add new members through the Members tab
- Track individual handicaps and statistics
- View member performance history

### Scheduling Rounds
- Use the Rounds tab to schedule new golf rounds
- Select member, course, date, and time
- Optionally add completed scores for past rounds

### Live Scoring
- Start a live scorecard from scheduled rounds
- Enter scores hole-by-hole during play
- Automatic total calculation and round completion

### Viewing Statistics
- Dashboard provides quick overview of club activity
- Leaderboard shows handicap rankings
- Individual member statistics and averages

## Technical Details

### Built With

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Icons and UI elements
- **JavaScript ES6+** - Modern JavaScript features

### Project Structure

```
golf-club-manager/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Scorecard.js
│   │   ├── Members.js
│   │   └── Rounds.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── docs/
│   └── screenshots/
├── package.json
├── README.md
└── LICENSE
```

### Data Structure

The app uses in-memory state management with the following data models:

**Members**
```javascript
{
  id: number,
  name: string,
  email: string,
  handicap: number,
  rounds: number
}
```

**Courses**
```javascript
{
  id: number,
  name: string,
  location: string,
  par: number,
  rating: number,
  slope: number
}
```

**Rounds**
```javascript
{
  id: number,
  memberId: number,
  courseId: number,
  date: string,
  time: string,
  score: number,
  status: 'scheduled' | 'completed',
  holeScores: number[]
}
```

## Customization

### Adding New Courses

Edit the `courses` state in `App.js`:

```javascript
const [courses, setCourses] = useState([
  {
    id: 4,
    name: 'Your Course Name',
    location: 'City, State',
    par: 72,
    rating: 73.1,
    slope: 130
  }
]);
```

### Modifying Handicap Calculation

The handicap calculation follows USGA guidelines and can be customized in the `calculateHandicap` function.

### Styling Customization

The app uses Tailwind CSS. Modify classes in components to change the appearance:

- Primary color: `green-600`
- Secondary color: `blue-600`
- Accent color: `yellow-500`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow React best practices
- Use functional components with hooks
- Maintain responsive design principles
- Write clean, commented code
- Test on mobile and desktop devices

## API Integration (Future Enhancement)

The app is designed to easily integrate with backend APIs. Key integration points:

- Replace state management with API calls
- Add authentication for member login
- Implement real-time score sharing
- Add course booking integration
- Weather API for course conditions

## Deployment Options

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Set up continuous deployment from GitHub

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts for deployment

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/golf-club-manager",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
3. Run: `npm run deploy`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support or questions:
- Create an issue on GitHub
- Documentation: [Wiki](https://github.com/yourusername/golf-club-manager/wiki)

## Roadmap

- [ ] Backend API integration
- [ ] User authentication system
- [ ] Mobile app (React Native)
- [ ] Tournament management
- [ ] Statistical analysis tools
- [ ] Course booking integration
- [ ] Weather integration
- [ ] Social features and round sharing
- [ ] Offline mode support
- [ ] Export functionality (PDF scorecards)

## Acknowledgments

- USGA for handicap calculation guidelines
- Golf course data providers
- React and Tailwind CSS communities
- Beta testers and contributors

---

**Made with ⛳ for golf enthusiasts**
