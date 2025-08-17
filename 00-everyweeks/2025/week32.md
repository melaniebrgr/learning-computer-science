# AI assisted continuous static personal deployment

Some background. I built a portfolio website at the conclusion of a bootcamp, "Thinkful" in 2016 in order to market myself and land my first web development position. I sparsely updated the landing page content and linked CV in 2020, but was too lazy to modernise the stack and my portfolio site remained a time capsule of 2016 web development trends: Angular 1, gulp, and bower. Now in 2025, we have AI. I want to see if, with AI, I can update the stack quickly and conveniently. What follows is back and forth between me and Cursor AI.

## ℹ️ Let's start with the analysis

> Prompt: "Analyse this repo"

---

I'll analyze this repository by examining its structure, files, and configuration to understand what kind of project this is and how it's set up.

- Read file: `README.md`
- Read file: `package.json`
- Read file: `bower.json`
- Read file: `gulpfile.js`
- Read file: `app/index.html`
- Read file: `app/js/app.js`
- Read file: `app/sass/app.scss`
- Ran tool
- Read file: `app/views/home/home.html`

This is a **personal portfolio website** for Melanie Burger, a front-end developer. Here's a comprehensive analysis:

### **Project Overview**

- **Type**: Personal portfolio website
- **Author**: Melanie Burger
- **Purpose**: Showcase web development projects, design work, and professional experience
- **Live Site**: melaniebrgr.com (deployed to AWS S3)

### **Technology Stack**

- **Frontend Framework**: AngularJS 1.7.9 (legacy)
- **Build Tool**: Gulp 3.9.1
- **Package Manager**: Bower (legacy) + npm
- **Styling**: Sass/SCSS with autoprefixer
- **JavaScript**: jQuery 3.5.1
- **Node Version**: 6.17.1 (legacy)

### **Architecture & Structure**

- **Single Page Application (SPA)** using AngularJS routing
- **Modular SCSS** structure with organized partials
- **Static site generation** with Gulp build process
- **Component-based organization** for different portfolio sections

### **Content Sections**

1. **Front-End Web Development**
   - GCTAvatar
   - Lab3D
   - Cocktails Quiz
   - Shopping List
   - Symptom Sleuth

2. **Design & Visual Communication**
   - Aplia redesign
   - Nature cover

3. **Writing & Speaking**
   - Conference presentations and publications

### **Build Process**

- **Development**: `gulp` (starts server with live reload)
- **Production**: `gulp build` (minifies CSS/JS, optimizes HTML)
- **Deployment**: AWS S3 via npm script

### **Key Features**

- **Responsive design** with mobile-first approach
- **Custom SVG logo** with gradient
- **Navigation with dropdown menus**
- **Social media integration**
- **Professional headshot and CV download**

### **Notable Observations**

1. **Legacy Technology**: Uses older versions of AngularJS, Gulp, and Node.js
2. **Historical Context**: Built in 2016, last updated in 2020
3. **Career Evolution**: Shows transition from Toronto to Amsterdam, React development experience
4. **Community Involvement**: Mentions work with Bridgeschool.io and BMCAA
5. **Professional Growth**: Reflects on learning React after working with AngularJS

### **Development Setup**

The project requires:

- Node.js 6.x
- Gulp CLI
- Bower
- Specific build process for CSS generation

This is a well-structured portfolio that demonstrates both technical skills and professional growth, though it uses somewhat outdated technologies by current standards.

## ℹ️ **Info:** My turn again

> Prompt: "what technologies should be updated in this project to meet current standards?"

---

I'll analyze the current technology stack and recommend modern alternatives to bring this project up to current standards.

Read file: app/sass/common/_base.scss
Read file: app/sass/common/_layout.scss
Based on my analysis of the codebase, here are the key technologies that should be updated to meet current standards:

## **Critical Updates Needed**

### **1. Node.js & Package Management**

- **Current**: Node.js 6.17.1 (EOL since 2019)
- **Recommended**: Node.js 18+ LTS or 20+ LTS
- **Impact**: Security vulnerabilities, missing modern features

### **2. Build System**

- **Current**: Gulp 3.9.1 (legacy)
- **Recommended**:
  - **Vite** (fastest, modern)
  - **Webpack 5** (mature, feature-rich)
  - **Parcel** (zero-config)
- **Benefits**: Faster builds, better HMR, modern bundling

### **3. Frontend Framework**

- **Current**: AngularJS 1.7.9 (EOL since 2021)
- **Recommended**:
  - **React 18+** (most popular, great ecosystem)
  - **Vue 3** (progressive, easy migration)
  - **Angular 17+** (if staying in Angular ecosystem)
- **Benefits**: Modern features, better performance, active maintenance

### **4. Package Manager**

- **Current**: Bower (deprecated) + npm
- **Recommended**: npm 9+ or **pnpm** (faster, disk-efficient)
- **Benefits**: Single package manager, better dependency resolution

### **5. CSS/Styling**

- **Current**: Sass with manual autoprefixer
- **Recommended**:
  - **PostCSS** with modern plugins
  - **CSS Modules** or **Styled Components**
  - **Tailwind CSS** (utility-first)
- **Benefits**: Better performance, modern CSS features

## **Recommended Modern Stack**

### **Option 1: React + Vite (Recommended)**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "devDependencies": {
    "vite": "^4.1.0",
    "@vitejs/plugin-react": "^3.1.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

### **Option 2: Vue 3 + Vite**

```json
{
  "dependencies": {
    "vue": "^3.2.0",
    "vue-router": "^4.1.0"
  },
  "devDependencies": {
    "vite": "^4.1.0",
    "@vitejs/plugin-vue": "^4.0.0"
  }
}
```

## **Additional Modernizations**

### **6. JavaScript Features**

- **Current**: ES5/ES6 with jQuery
- **Recommended**: ES2022+ with modern APIs
- **Benefits**: Native DOM manipulation, async/await, modules

### **7. Development Tools**

- **Current**: Basic Gulp watch
- **Recommended**: 
  - **ESLint** + **Prettier**
  - **TypeScript** (type safety)
  - **Vitest** (testing)
- **Benefits**: Code quality, type safety, better DX

### **8. Performance & SEO**

- **Current**: Basic static site
- **Recommended**:
  - **Next.js** (React) or **Nuxt.js** (Vue) for SSR/SSG
  - **Image optimization** (next/image, sharp)
  - **Core Web Vitals** optimization
- **Benefits**: Better SEO, performance, user experience

### **9. Deployment**

- **Current**: AWS S3 (still good)
- **Recommended**:
  - **Vercel** (Next.js)
  - **Netlify** (universal)
  - **Cloudflare Pages** (fast, global)
- **Benefits**: Automatic deployments, better performance

## **Migration Strategy**

1. **Phase 1**: Update Node.js and package management
2. **Phase 2**: Replace Gulp with Vite
3. **Phase 3**: Migrate from AngularJS to React/Vue
4. **Phase 4**: Modernize CSS approach
5. **Phase 5**: Add TypeScript and testing
6. **Phase 6**: Optimize for performance and SEO

## **Estimated Effort**

- **Small**: Node.js update, package management (1-2 days)
- **Medium**: Build system migration (3-5 days)
- **Large**: Framework migration (2-4 weeks)
- **Total**: 3-6 weeks depending on complexity

The most impactful changes would be updating Node.js, replacing Gulp with Vite, and migrating from AngularJS to a modern framework. This would provide immediate benefits in development experience, performance, and maintainability.

## ℹ️ **Info:** Planning

This seems reasonable, so let's start with planning the first phase.
> Prompt: "Make a plan updating Node.js and package management"

---

I'll create a detailed plan for updating Node.js and package management. Let me first examine the current package.json to understand the dependencies better.

Read file: package.json
Now I'll create a comprehensive plan for updating Node.js and package management:

### **Node.js and Package Management Update Plan**

#### **Phase 1: Node.js Version Update**

##### **Step 1: Check Current Environment**

```bash
# Check current Node.js version
node --version
npm --version

# Check if nvm is installed
nvm --version
```

##### **Step 2: Install Node Version Manager (nvm)**

```bash
# Install nvm if not present
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or source profile
source ~/.bashrc  # or ~/.zshrc
```

##### **Step 3: Install and Use Modern Node.js**

```bash
# Install LTS version (recommended: 20.x)
nvm install 20
nvm use 20
nvm alias default 20

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

##### **Step 4: Update package.json**

```json
{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

#### **Phase 2: Package Management Modernization**

##### **Step 1: Remove Bower Dependencies**

```bash
# Remove bower globally
npm uninstall -g bower

# Remove bower.json and bower_components
rm bower.json
rm -rf app/bower_components
```

##### **Step 2: Migrate Bower Dependencies to npm**

Current bower dependencies:

- `jquery: ^3.5.1`
- `angular: ^1.7.9`
- `angular-route: ^1.7.9`

New package.json dependencies:

```json
{
  "dependencies": {
    "jquery": "^3.7.0",
    "angular": "^1.8.3",
    "angular-route": "^1.8.3"
  }
}
```

##### **Step 3: Update HTML to Use npm Packages**

Replace bower references in `app/index.html`:

```html
<!-- OLD (bower) -->
<script src="bower_components/jQuery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-route/angular-route.js"></script>

<!-- NEW (npm) -->
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/angular/angular.min.js"></script>
<script src="node_modules/angular-route/angular-route.min.js"></script>
```

#### **Phase 3: Update Gulp Dependencies**

##### **Step 1: Update package.json with Modern Versions**

```json
{
  "devDependencies": {
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^8.0.0",
    "gulp-clean": "^0.4.0",
    "gulp-clean-css": "^4.3.0",
    "gulp-connect": "^5.7.0",
    "gulp-htmlmin": "^5.0.1",
    "gulp-ng-annotate": "^2.1.0",
    "gulp-sass": "^5.1.0",
    "gulp-sequence": "^1.1.1",
    "gulp-uglify": "^3.0.2",
    "gulp-usemin": "^0.3.30",
    "sass": "^1.60.0"
  }
}
```

##### **Step 2: Update Gulpfile.js for Gulp 4**

Key changes needed:

- Replace `gulpSequence` with `gulp.series` and `gulp.parallel`
- Update task syntax for Gulp 4
- Update sass compilation for newer versions

#### **Phase 4: Implementation Steps**

##### **Step 1: Backup Current State**

```bash
# Create backup branch
git checkout -b backup/legacy-setup
git add .
git commit -m "Backup legacy Node.js and package setup"

# Return to main branch
git checkout main
```

##### **Step 2: Update Node.js**

```bash
# Install new Node.js version
nvm install 20
nvm use 20

# Clear npm cache
npm cache clean --force
```

##### **Step 3: Update Dependencies**

```bash
# Remove old node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install new dependencies
npm install

# Install bower dependencies as npm packages
npm install jquery@^3.7.0 angular@^1.8.3 angular-route@^1.8.3
```

##### **Step 4: Update Build Process**

```bash
# Test build process
npm run build

# Test development server
npm start
```

#### **Phase 5: Verification and Testing**

##### **Step 1: Test Build Process**

```bash
# Clean build
npm run build

# Verify build output
ls -la build/

# Test development server
npm start
# Open http://localhost:8080
```

##### **Step 2: Test All Routes**

- Home page
- All portfolio project pages
- Navigation functionality
- Responsive design

##### **Step 3: Performance Check**

```bash
# Check bundle sizes
du -sh build/

# Test loading times
# Use browser dev tools to check performance
```

#### **Phase 6: Optional - Consider pnpm**

##### **Step 1: Install pnpm**

```bash
npm install -g pnpm
```

##### **Step 2: Migrate to pnpm**

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install with pnpm
pnpm install
```

##### **Step 3: Update scripts**

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

#### **Timeline Estimate**

- **Phase 1-2**: 2-3 hours
- **Phase 3**: 1-2 hours  
- **Phase 4**: 2-3 hours
- **Phase 5**: 1-2 hours
- **Phase 6**: 30 minutes (optional)

**Total**: 6-10 hours

#### **Risk Mitigation**

1. **Backup everything** before starting
2. **Test incrementally** after each phase
3. **Keep legacy branch** for rollback if needed
4. **Document all changes** for future reference

#### **Success Criteria**

- [ ] Node.js 20+ installed and working
- [ ] All npm dependencies installed successfully
- [ ] Build process completes without errors
- [ ] Development server starts and serves content
- [ ] All portfolio pages load correctly
- [ ] No console errors in browser
- [ ] Responsive design still works

This plan provides a safe, incremental approach to modernizing the Node.js and package management setup while maintaining the existing functionality.

## ℹ️ **Info:** Node version management

I have fnm installed and consider it the successor to nvm, but let's check that assumption with a quick comparison. This time I used Warp terminal with Claude Sonnet 4:

> Prompt: "compare fnm and nvm"

---

I'll compare fnm (Fast Node Manager) and nvm (Node Version Manager) for you. These are both popular Node.js version managers, but they have some key differences:

Performance

- fnm: Written in Rust, significantly faster startup time and switching between versions
- nvm: Written in bash, slower due to shell script overhead

Installation & Setup

- fnm: Single binary installation, faster shell integration
- nvm: Shell script installation, requires sourcing in shell profile

Cross-platform Support

- fnm: Native support for Windows, macOS, and Linux
- nvm: Primarily Unix-based (macOS/Linux), separate nvm-windows project needed

Features
Both support:

- Installing multiple Node.js versions
- Switching between versions
- Project-specific version management (.nvmrc/.node-version files)

fnm advantages:

- Faster execution
- Built-in shell completions
- Better Windows support
- Smaller memory footprint

nvm advantages:

- More mature ecosystem
- Wider adoption and community
- More extensive documentation and tutorials
- Some additional features like nvm use system

Syntax Comparison
Both have similar command structures:
bash
Recommendation

- Choose fnm if you prioritize speed and cross-platform compatibility
- Choose nvm if you prefer the established, well-documented solution

Would you like me to help you install or migrate between either of these tools?

## ℹ️ **Info:** Node.js and Package Management Update Plan: Phase 1

I assume Cursor's response surfaced nvm because of broader community adoption and documentation, but I want to stick with fnm. I skipped the nvm instructions and installed the latest version of Node, v24.5.0, with fnm. v24 isn't the active LTS version yet but should be soon. I then specified these version in package.json.

```bash
fnm install 24.5.0
fnm default v24.5.0

fnm list
* v22.18.0
* v24.5.0 default
* system

npm install -g npm@latest

npm --version
11.5.2
```

I had changed machines a few times since I built my porfolio website, so bower was no longer installed. I removed the bower.json file and shifted the depencies to package.json as Cursor AI suggested. I consider fuzzy package versioning (e.g. `^3.7.0`) to be anathema now, so I changed to use the exact version.

On running `npm install` a litany of deprecation warnings appeared in console, and then an error, "npm error path personal-website/node_modules/node-sass". I asked Cursor AI to diagnose the issue.

> Prompt, "what's going wrong when I `npm install`?"

Warp AI then asked to run the command and examine the error and the package.json file, which I allowed.

---

I can see the main issues causing your npm install to fail:

The Problem
The primary issue is node-sass compatibility. Your project is using very old versions of dependencies (from ~2016-2017) that aren't compatible with modern Node.js (you're running v24.5.0). Here are the key issues:

1. node-sass v3.13.1 is extremely outdated and can't build with Node.js v24
2. Python version conflict - node-gyp is trying to use Python 2 syntax with Python 3
3. Many deprecated packages - Angular 1.7.9, old gulp plugins, etc.

Why Dependencies Are Installing
The dependencies are installing - you're seeing all those deprecation warnings because npm is successfully downloading packages. The failure happens during the build step when node-sass tries to compile its native bindings.

Solutions

Quick Fix (Recommended)
Replace the problematic gulp-sass dependency:

...

## ℹ️ **Info:** The plan derails

Gulp won't build. Downgrading from Node 24 to 16 to 14 doesn't help. A flaw in my execution was that I didn't try to ensure I could successfully build the project before making changes to it, but I didn't want to install bower globally or install a downgraded Node v6 temporarily (the version the original site used). I am less inclide now to make an incremental upgrade approach, since fighting versioning issues and build errors doesn't seem worth the effort. I'll try a different approach, starting with a clean project.

---

> ℹ️ **Info:** Success
