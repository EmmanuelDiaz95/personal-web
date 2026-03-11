# Week 1, Day 1: Exploring Your Website

**Time:** 1 hour
**Goal:** See your website in action and understand what you've built

---

## 📚 Theory (15 minutes)

### What is a Website?

A website is like a collection of connected documents that live on your computer (during development) or on the internet. Your personal portfolio website is a **Single Page Application (SPA)**, which means:

- It loads once in the browser
- When you click links, it doesn't reload the entire page
- It feels fast and smooth, like using an app

### What Makes Your Website Work?

Think of your website like a car:
- **HTML** = The frame and structure (chassis, body)
- **CSS** = The paint, interior, style (how it looks)
- **JavaScript** = The engine (makes it move and respond)
- **React** = The advanced control system (organizes everything efficiently)

### Your Tech Stack (Simple Explanation)

- **React**: A tool that makes building interactive websites easier by breaking them into reusable pieces
- **React Router**: Handles moving between pages (Home → Projects → Blog)
- **Tailwind CSS**: Pre-made styling classes to make things look good quickly

---

## 🚀 Hands-On Part 1: Run Your Website (20 minutes)

### Step 1: Open Your Terminal

You should already be in your project folder. If not:
```bash
cd /Users/emmanueldiaz/Documents/personal-web
```

### Step 2: Start the Development Server

Type this command and press Enter:
```bash
npm start
```

**What happens?**
- npm = Node Package Manager (a tool that manages your project)
- start = A command we defined that runs the development server
- A development server = A mini web server running on your computer

**Wait for it...**
You'll see something like:
```
Compiled successfully!

You can now view personal-web in the browser.

  Local:            http://localhost:3000
```

Your browser should automatically open to `http://localhost:3000`

**What is localhost:3000?**
- **localhost** = Your own computer (not the internet)
- **3000** = A "port" number (like a door number where the website is served)

### Step 3: Explore Every Page

Click through your website and take notes:

**✓ Home Page (`/`)**
- What information is displayed?
- What catches your eye?
- Notes: _______________

**✓ Projects Page (`/projects`)**
- How many projects do you see?
- What information shows on each project card?
- Notes: _______________

**✓ Individual Project (`/projects/ux-research-platform`)**
- Click on a project - what details appear?
- How do you navigate back?
- Notes: _______________

**✓ Blog Page (`/blog`)**
- What blog posts are shown?
- What information is on each card?
- Notes: _______________

**✓ Individual Blog Post (`/blog/design-thinking-basics`)**
- Click on a blog post - what appears?
- Notes: _______________

**✓ Contact Page (`/contact`)**
- What's on the contact page?
- Try filling out the form (it won't actually send, just a demo)
- Notes: _______________

### Step 4: Test the Features

**Try these interactive features:**

1. **Dark Mode Toggle**
   - Click the sun/moon icon in the top right
   - What changes?
   - Notes: _______________

2. **Navigation**
   - Click different menu items
   - Notice: Does the page reload? (It shouldn't!)
   - Notes: _______________

3. **Browser Back Button**
   - Navigate to Projects, then use your browser's back button
   - Does it work? (It should!)
   - Notes: _______________

4. **Responsive Design**
   - Make your browser window smaller (narrow like a phone)
   - What changes? Does the menu look different?
   - Notes: _______________

---

## 🔍 Investigate (15 minutes)

### Understanding the Browser Developer Tools

**Open Developer Tools:**
- **Mac**: Press `Cmd + Option + I`
- **Windows/Linux**: Press `F12` or `Ctrl + Shift + I`

You'll see a panel appear - this is your developer toolbox!

**Explore the Elements Tab:**
1. Click the Elements (or Inspector) tab
2. Click the "select element" icon (mouse pointer icon)
3. Hover over different parts of your website
4. See how each visual element has code behind it

**Try This:**
- Hover over your name/logo in the header
- Look at the highlighted code in the developer tools
- Can you see words like `<header>`, `<nav>`, `<h1>`?

**Explore the Console Tab:**
1. Click the Console tab
2. Type: `console.log("Hello from the console!")`
3. Press Enter
4. You just ran JavaScript code!

**Try This:**
- Type: `document.title = "My Awesome Portfolio"`
- Press Enter
- Look at your browser tab title - it changed!
- (Refresh the page to reset it)

---

## 📝 Reflection (10 minutes)

### Questions to Think About:

1. **What surprised you most about exploring your website?**

   Your answer: _______________

2. **What features did you find most interesting?**

   Your answer: _______________

3. **What do you want to understand better?**

   Your answer: _______________

4. **If you could change one thing about your website right now, what would it be?**

   Your answer: _______________

---

## ✅ Completion Checklist

Before moving to Day 2, make sure you've:
- [ ] Successfully ran `npm start`
- [ ] Visited every page of your website
- [ ] Tested the dark mode toggle
- [ ] Tried the browser developer tools
- [ ] Made the browser window smaller/bigger to see responsive design
- [ ] Written down your reflections

---

## 🎯 Key Takeaways

By the end of today, you should understand:
- ✅ Your website is a Single Page Application
- ✅ It runs on localhost:3000 during development
- ✅ It has multiple pages connected by React Router
- ✅ It responds to user interactions (clicks, form inputs)
- ✅ It adapts to different screen sizes
- ✅ Browser developer tools let you peek "under the hood"

---

## 🔜 Coming Next

**Day 2:** We'll explore the file structure - where all these pages live in your code!

---

## 💡 Quick Win Challenge (Optional)

If you finish early and want to explore more:
- Open `src/data/projects.js` in your code editor
- Find the `title` of one project
- Change the title text
- Save the file
- Look at your browser - it should automatically update!
- (You can change it back after)

**This is your first code modification!** 🎉

---

**Remember:** There's no pressure to understand everything perfectly today. This is about exploration and getting comfortable with your website. Questions are good - write them down!
