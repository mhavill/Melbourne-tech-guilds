# Melbourne Tech Guilds

> Where Makers Collaborate

**Website:** [melbourne.techguilds.au](https://melbourne.techguilds.au)
**Status:** Restructuring & Development Phase
**Last Updated:** December 2025

---

## 📋 Table of Contents

- [About](#about)
- [Project Status](#project-status)
- [Repository Structure](#repository-structure)
- [Completed Work](#completed-work)
- [Active Work](#active-work)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Contact](#contact)

---

## 🎯 About

Melbourne Tech Guilds is a non-commercial community of makers, engineers, and technicians across Melbourne. We provide support, mentorship, and resources for individual maker projects while fostering a collaborative environment where members discover new technologies and interests.

### Our Mission

We help makers succeed with their individual projects through:

- Technical support and guidance from experienced members
- Best practices for version control, documentation, and design
- Cross-pollination of ideas across different technologies
- A supportive community that speaks your language

### Our Structure

The community is organized into **5 guilds**, each focused on specific technology domains:

1. **🤖 Robotics** - Sensors, actuators, AI/ML, autonomous systems
2. **⚙️ Mechanics** - CAD/CAM, CNC, 3D printing, laser cutting, fabrication
3. **📡 IoT** - Raspberry Pi, Arduino, ESP32, home automation, sensor networks
4. **💻 Coding** - Embedded systems, Python, C/C++, firmware, software architecture
5. **🔬 Deep Dive** - Applied mathematics, analog/digital electronics, FEA, engineering theory

**Key Principle:** Most members work on their own projects with guild support. Collaborative projects emerge naturally but are not the primary focus.

---

## 📊 Project Status

### Current Phase: Foundation & Development

We are restructuring from our origins as a Raspberry Pi-focused group to a broader tech guild model that better reflects our diverse membership and interests.

**Active Members:** ~50 (from ~1,200 total membership)
**Timeline:** Planning to launch new website mid-2026

---

## 📁 Repository Structure

```
melbourne-tech-guilds/
├── README.md                          # This file
├── docs/
│   ├── guild-charter.md               # Governance and community guidelines
│   ├── organizational-structure.md    # Group, guild, and member relationships
│   └── website-requirements.md        # Feature specifications
├── design/
│   ├── logo/
│   │   ├── mtg-logo.svg             # Primary brand logo
│   │   └── guild-icons.svg           # Individual guild badges
│   └── branding-guidelines.md        # Colors, fonts, usage
├── website/
│   ├── landing-page.html             # Homepage content and design
│   ├── concierge-registration.jsx    # Interactive member onboarding
│   └── content/                      # Page content and copy
├── development/
│   ├── trello-board-structure.md     # Project management setup
│   └── technical-decisions.md        # WordPress vs Node.js, hosting, etc.
└── assets/
    └── Group-Guild-Member-function.md # Organizational diagram
```

---

## ✅ Completed Work

### 1. Foundation Documents

#### Guild Charter (`docs/guild-charter.md`)

Comprehensive governance document covering:

- Core principles (knowledge sharing, collaboration, community-first)
- Safety protocols (physical, digital, privacy)
- Inclusive environment and anti-discrimination standards
- Liability and legal considerations
- Conflict resolution processes

**Status:** ✅ Complete - awaiting member feedback

#### Organizational Structure (assets/Group-Guild-Member-function.md)

Defined three-tier model:

- **Group Level:** Melbourne Tech Guilds (umbrella organization)
- **Guild Level:** 5 specialized communities
- **Member Level:** Individuals participating in 1+ guilds

**Key Features:**

- Project-centric rather than guild-centric
- Members can span multiple guilds
- External collaboration encouraged
- Individual projects are primary focus

**Status:** ✅ Complete - documented in Miro diagram

### 2. Brand Identity

#### Logo & Visual Design

- Main logo with interlocking gears (collaboration + tech)
- Individual guild icons with unique gradients
- Brand colors: Purple gradient (#667eea to #764ba2)
- Tagline: "Where Makers Collaborate"

**Status:** ✅ Complete - SVG files ready for use

### 3. Website Design

#### Landing Page (`website/landing-page.html`)

Modern, responsive homepage featuring:

- SEO-optimized content with specific device mentions (ESP32, Arduino, Raspberry Pi)
- All 5 guilds prominently displayed
- Project showcase section
- Multiple join options (Discord, video, in-person, registration)
- Mobile-responsive design

**Key Messaging:**

- Support for individual projects (primary focus)
- Discovery of new interests through community exposure
- Mentorship and best practices guidance
- Social connection with like-minded makers

**Status:** ✅ Complete - ready for WordPress implementation

#### Concierge Registration (`website/concierge-registration.jsx`)

Interactive onboarding flow that:

- Collects member information and experience level
- Identifies interests across guilds
- Maps existing skills
- Captures current projects and help needed
- Automatically recommends 2-3 guilds based on profile
- Explains next steps clearly

**Status:** ✅ Complete - React component ready for integration

### 4. Development Planning

#### Technical Decisions

- **Platform:** WordPress (quick launch, non-technical contributors, low maintenance)
- **Hosting:** To be determined (SiteGround, Cloudways, or similar)
- **Custom Tools:** React apps for complex features (concierge, etc.)
- **Project Management:** Trello for task tracking

**Rationale:** No committed developers currently, volunteer-driven, need to launch quickly

**Status:** ✅ Complete - documented in `development/technical-decisions.md`

#### Project Tracking Structure (`development/trello-board-structure.md`)

Comprehensive Trello board template with:

- 7 workflow columns (Requirements → Done)
- 30+ predefined cards covering all features
- Priority labeling system (P0-P3)
- Role-based task categorization

**Status:** ✅ Complete - ready to implement in Trello

---

## 🚧 Active Work

### Gathering Member Feedback

- Guild Charter review
- Landing page messaging
- Organizational structure validation
- Feature prioritization

**Next Steps:**

- Consolidate feedback
- Make revisions based on input
- Get final approval from core team

---

## 🗺️ Roadmap

### Phase 1: Foundation (Q1-Q2 2026)

**Goal:** Launch functional website with core features

**Priority Tasks:**

- [ ] Set up WordPress hosting and domain
- [ ] Implement landing page design
- [ ] Configure user roles and permissions
- [ ] Set up guild pages structure
- [ ] Implement basic member registration
- [ ] Configure email system
- [ ] Launch to core members for testing

**Deliverables:**

- Public website at melbourne.techguilds.au
- Working registration flow
- Guild pages with basic content
- Contact and communication channels

### Phase 2: Member Features (Q2-Q3 2026)

**Goal:** Enable member participation and project sharing

**Priority Tasks:**

- [ ] Member profile system
- [ ] Individual project showcase
- [ ] Event calendar and RSVP
- [ ] Discord integration
- [ ] Best practices library
- [ ] "Getting Help" guides

**Deliverables:**

- Members can create and share projects
- Event management system
- Educational resources
- Integrated communication

### Phase 3: Guild Operations (Q3-Q4 2026)

**Goal:** Empower guild coordinators to manage their communities

**Priority Tasks:**

- [ ] Guild editor role implementation
- [ ] Event publisher role
- [ ] Guild-specific email/newsletter
- [ ] Project categorization by guild
- [ ] Cross-guild collaboration tools

**Deliverables:**

- Guild coordinators can manage content
- Automated guild communications
- Clear project-to-guild relationships

### Phase 4: Enhancement (2027+)

**Goal:** Add advanced features based on usage patterns

**Potential Features:**

- [ ] Advanced member matching (skills + needs)
- [ ] Collaborative project workflow
- [ ] External group integration
- [ ] Advanced analytics and insights
- [ ] Mobile app (if needed)

**Note:** This phase is flexible based on what members actually use and request

### Future Considerations

- Expansion to other cities (sydney.techguilds.au, brisbane.techguilds.au)
- Headless WordPress or custom rebuild (if committed developers available)
- Physical space/makerspace (long-term aspiration)

---

## 🎯 Key Principles for Development

### 1. Individual Project Support First

Most members come with their own projects needing help. Guild structure exists to support individual work, not replace it.

### 2. Low Barrier to Entry

Both for members joining and volunteers contributing. WordPress chosen specifically for this reason.

### 3. Community Over Technology

The website is a tool, not the product. Focus on enabling human connections.

### 4. Discovery is Natural

Members come for ESP32 help, discover 3D printing at Show & Tell. Design for this serendipity.

### 5. Best Practices Matter

Encourage GitHub, backups, documentation, good design practices. This is mentorship, not just problem-solving.

### 6. Volunteer Sustainability

No single person is critical. Structure must survive people coming and going.

---

## 👥 Contributing

### For Members

- Review and provide feedback on documentation
- Contribute to content (guild descriptions, best practices)
- Share project showcase examples
- Help test new features

### For Developers

- See `development/trello-board-structure.md` for current tasks
- WordPress theme customization
- React component development for custom features
- Integration work (Discord, email, etc.)

### For Designers

- Refine logo and guild icons
- Create social media graphics
- Design event promotional materials
- Improve UI/UX of website elements

### For Content Creators

- Write best practices guides
- Create tutorial content
- Document case studies
- Develop getting help resources

---

## 📞 Contact

**Discord:** [Join our server](#) (link to be added)
**Email:** info@techguilds.au (to be configured)
**Legacy Site:** [melbourne-rpi.com.au](https://melbourne-rpi.com.au) (being phased out)

---

## 📄 License

All content in this repository is licensed under [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

This means you can:

- Share and adapt the content
- Use it for any purpose, even commercially

Under the following terms:

- Give appropriate credit
- Indicate if changes were made
- Distribute under the same license

**Code components** (React, HTML, etc.) are additionally licensed under the MIT License for maximum flexibility.

---

## 🙏 Acknowledgments

Built with contributions from members across all guilds. Special thanks to:

- Original Melbourne Raspberry Pi User Group community
- Guild coordinators stepping up to lead
- Everyone providing feedback during restructuring
- [Noisebridge](https://www.noisebridge.net/) for guild structure inspiration

---

## 📝 Notes for Repository Users

### For New Contributors

Start by reading:

1. This README (you are here!)
2. `docs/guild-charter.md` - understand our values and principles
3. `docs/organizational-structure.md` - see how we're organized
4. `development/trello-board-structure.md` - find tasks to help with

### For Guild Coordinators

Key documents:

- `docs/guild-charter.md` - your authority and responsibilities
- `website/` folder - content you'll manage
- `development/technical-decisions.md` - platform capabilities

### For Web Developers

Key files:

- `development/technical-decisions.md` - why WordPress
- `development/trello-board-structure.md` - full feature list
- `website/` folder - designs to implement

### Updating This README

This is a living document. Update it as:

- Project status changes
- New artifacts are created
- Decisions are made
- Phases complete

**Last significant update:** December 2025 - Initial repository setup

---

*Melbourne Tech Guilds - Empowering makers, one project at a time.* 🛠️
