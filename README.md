# ⏰ TickTodo - Task Timer & Planning Tool

Hi there! This is my first practical utility app - a time management tool designed to help me plan my day and organize my work more effectively.

🌐 **Live Demo:** [https://ticktodo.vercel.app/](https://ticktodo.vercel.app/)

## 🎯 Why I built this

I wanted a simple tool to:
- 📅 Plan out my daily tasks and time blocks
- ⏱️ Track how much time I actually spend on each task
- 📊 Review my productivity patterns
- 🎯 Stay focused with time-boxed work sessions

No fancy features, no distractions - just a clean, functional tool for better time management.

## ✨ What it does

- ✅ **Add tasks** with custom time allocations
- ⏰ **Timer for each task** with visual countdown
- 🎨 **Color-coded alerts** (orange at 5 min, red at 1 min remaining)
- 🎉 **Completion notifications** with encouraging messages
- 📱 **Quick time buttons** (+5min, +10min, +15min, +1hr)
- 📊 **Daily history tracking** to review your completed work
- 💾 **Auto-save** everything in your browser
- 📁 **Export data** to JSON for backup

## 🖥️ How to use it

1. **Plan your day:** Add tasks and estimate time needed
2. **Work with focus:** Start the timer and concentrate on one task
3. **Track progress:** Watch the countdown and get alerts as time runs out
4. **Review & improve:** Check your history to see how you actually spent time

## 🚀 Getting started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your computer

### Installation
```bash
# Clone the repository
git clone https://github.com/Krisyu7/To-Do-List.git
cd To-Do-List

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for production
```bash
npm run build
```

## 🛠️ Tech stack

- **React 18** - Component-based UI
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **LocalStorage** - Browser-based data persistence

## 📁 Project structure

```
src/
├── App.tsx              # Main app with navigation
├── TodoList.tsx         # Task management and timer controls
├── CountdownTimer.tsx   # Individual task timer component
├── HistoryView.tsx      # Completed tasks review
├── DigitalClock.tsx     # Current time display
└── main.tsx             # Application entry point
```

## 🎨 Features I'm proud of

- **Intuitive time management:** Easy to add time blocks with quick buttons
- **Smart visual feedback:** Timer colors change as deadline approaches
- **Persistent data:** Your tasks and history survive browser restarts
- **Clean, distraction-free design:** Focus on productivity, not bells and whistles
- **Responsive layout:** Works well on desktop and mobile devices
- **Export functionality:** Download your productivity data

## 🎓 What I learned building this

- **Practical TypeScript:** Converting a working JS app to TS for better reliability
- **State management:** Handling timers, task lists, and history data
- **Browser APIs:** LocalStorage, Notifications, and Timer management
- **Time handling:** Working with milliseconds, formatting, and countdown logic
- **User experience:** Creating helpful visual cues and feedback
- **Deployment:** Using Vercel for continuous deployment from Git

## ⚡ Performance notes

- Lightweight and fast - loads in under 1 second
- Minimal dependencies for faster loading
- Efficient timer implementation to avoid browser lag
- Responsive design works on all screen sizes

## 🔮 Future improvements

- [ ] Pomodoro technique integration (25min work + 5min break cycles)
- [ ] Task categories and color coding
- [ ] Weekly/monthly productivity analytics
- [ ] Sound notifications (with volume control)
- [ ] Dark mode theme
- [ ] Keyboard shortcuts for power users
- [ ] CSV export for spreadsheet analysis

## 🐛 Known limitations

- Data is stored locally (no cloud sync between devices)
- Timer accuracy depends on browser/system performance
- No user accounts or team collaboration features
- Limited to basic time tracking (no advanced project management)

## 💡 Usage tips

- **Start small:** Begin with 15-30 minute time blocks
- **Be realistic:** Add a buffer when estimating task time
- **Review regularly:** Use the history view to improve your time estimates
- **Take breaks:** The timer stopping is a good reminder to rest

## 📄 License

Open source under the MIT License - feel free to use this for your own productivity needs!

## 🤝 Contributing

This is a personal learning project, but if you find bugs or have suggestions, I'd love to hear them! Feel free to open an issue or reach out.

---

*Built for better time management and focused work* ⏰