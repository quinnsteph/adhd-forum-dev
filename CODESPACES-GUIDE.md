# GitHub Codespaces Setup Guide for ADHD Forum

## 🚀 Getting Started with Codespaces

### 1. Access Your Development Repository
- Go to: https://github.com/quinnsteph/adhd-forum-dev
- This is your dedicated development repository with Codespaces configuration

### 2. Create a Codespace
1. Click the green **"Code"** button
2. Select the **"Codespaces"** tab
3. Click **"Create codespace on main"**
4. Wait for the environment to build (2-3 minutes)

### 3. Automatic Setup
The Codespace will automatically:
- ✅ Install Node.js 20 LTS
- ✅ Run `npm install` to install dependencies
- ✅ Configure VS Code with Astro, Tailwind, and React extensions
- ✅ Set up port forwarding for the dev server

### 4. Start Development
Once the Codespace is ready:
```bash
npm run dev
```

### 5. Access Your Application
- The dev server will start on port 4321
- GitHub will automatically forward the port
- Click the notification or check the "Ports" tab
- Your ADHD Forum will be accessible via the forwarded URL

## 🛠️ Development Workflow

### Daily Development
1. **Open Codespace**: Go to GitHub → Your repo → Codespaces tab
2. **Start Coding**: Your environment is already configured
3. **Run Dev Server**: `npm run dev`
4. **Make Changes**: Edit files in VS Code
5. **Test**: Use the forwarded port URL
6. **Commit**: Use VS Code's Git integration or terminal

### Useful Commands
```bash
npm run dev      # Start development server
npm run build    # Test production build
npm run lint     # Check code quality
npm run preview  # Preview production build
```

### VS Code Extensions (Pre-installed)
- 🚀 Astro Language Support
- 🎨 Tailwind CSS IntelliSense
- ⚛️ TypeScript and React support
- 🔧 ESLint and Prettier
- 📁 Path IntelliSense

## 🎯 Benefits of This Setup

### ✅ Consistency
- Same environment every time
- No "works on my machine" issues
- Pre-configured with all tools

### ✅ Performance
- Runs in the cloud (no laptop resource usage)
- Fast SSD storage
- Reliable network connection

### ✅ Collaboration
- Easy to share development environment
- Consistent setup for all contributors
- No local environment conflicts

### ✅ Reliability
- No local dependency conflicts
- Isolated environment
- Always up-to-date tools

## 🔧 Troubleshooting

### Codespace Won't Start
- Try refreshing the page
- Delete and recreate the Codespace
- Check GitHub status page

### Port Forwarding Issues
- Go to "Ports" tab in VS Code
- Make sure port 4321 is forwarded
- Try running `npm run dev -- --host`

### Slow Performance
- Codespaces run on 2-core machines by default
- You can upgrade to 4-core or 8-core machines in settings
- Close unused browser tabs

### Saving Work
- Codespaces auto-save your work
- Use VS Code's Git integration to commit changes
- Your work is preserved even if Codespace stops

## 📱 Mobile Development
- GitHub Codespaces works on tablets and phones
- Use github.dev for lightweight editing
- Full VS Code experience in browser

## 💰 Billing
- GitHub provides free Codespaces hours monthly
- Usage shows in your GitHub settings
- Consider upgrading if you need more hours

Your ADHD Forum development environment is now ready to use! 🎉