## WordPress (CMS)

### Pros:

* **Quick to launch** - Can have a professional site running in days, not months
* **No coding required for basic changes** - Your non-technical members can update content, add events, post projects
* **Massive plugin ecosystem** - Event calendars, member registration, Discord integration, SEO tools all readily available
* **Low maintenance** - Hosting providers handle updates, security patches
* **Cheap hosting** - $5-20/month for shared hosting, many providers offer one-click installs
* **Themes available** - Can customize existing themes rather than building from scratch
* **Community support** - Huge community, endless tutorials, easy to find help
* **Multiple contributors** - Easy to give different people different access levels (guild coordinators can manage their sections)

### Cons:

* **Performance limitations** - Can be slower, especially with many plugins
* **Security concerns** - Popular target for attacks, requires diligent updates
* **Plugin conflicts** - Sometimes plugins don't play well together
* **Limited customization** - Without coding knowledge, you're constrained by themes/plugins
* **Technical debt** - Can become bloated over time
* **Not ideal for complex custom features** - The concierge registration tool you have might need custom development

## Node.js (Custom Build)

### Pros:

* **Complete control** - Build exactly what you want, no compromises
* **Modern tech stack** - React, Next.js, etc. - very performant and flexible
* **Scalable** - Can handle growth and complex features easily
* **Custom features** - Your concierge registration, cross-guild project tracking, etc. can be built exactly to spec
* **No bloat** - Only what you need, nothing extra
* **Better for complex interactions** - Member dashboards, project collaboration tools, etc.
* **API-first** - Easy to integrate with Discord, external services
* **Developer-friendly** - If you have skilled devs in the group, they'll love working with it

### Cons:

* **Time investment** - Months to build vs. days for WordPress
* **Requires ongoing dev skills** - Need JavaScript/Node developers for maintenance and updates
* **Higher hosting costs** - $10-50+/month for proper hosting (Vercel, AWS, DigitalOcean)
* **Content updates require dev work** - Non-technical people can't easily update content without a custom CMS
* **Maintenance burden** - Security updates, dependency management all on you
* **Reinventing wheels** - Event calendars, user management, etc. all need to be built or integrated
* **Bus factor risk** - If your lead developer leaves, who maintains it?

## My Recommendation for Melbourne Tech Guilds:

### **Start with WordPress, Plan for Evolution**

**Why:**

1. **You need to launch quickly** to capitalize on restructuring momentum
2. **Content will change frequently** - guild coordinators need easy access to update their sections
3. **Your members are diverse in technical skill** - not everyone codes
4. **You're non-commercial** - budget matters
5. **Your core value is community, not technology** - the website is a tool, not the product

**But:**

* Use a **headless WordPress** approach if you have the dev skills - WordPress as a CMS backend, but serve via Next.js/React frontend
* Or use **WordPress with good architecture** - keep it clean, documented, use quality plugins
* Build your **custom features** (like the concierge registration) as separate React apps that can be embedded or linked
* This gives you **quick launch + future flexibility**

**Hybrid Approach:**

* WordPress for: Content pages, blog, events, basic member info
* Custom Node.js tools for: Concierge registration, project tracking, guild dashboards
* They can coexist and link to each other

### Questions to Help Decide:

1. **Do you have 2-3 committed JavaScript developers?** (Not just skilled, but committed to maintaining it)
2. **How soon do you need to launch?** (Weeks = WordPress, Months = Custom)
3. **Who will update content regularly?** (Non-devs = WordPress, Devs = Either)
4. **What's your budget?** (<$50/month = WordPress, >$50/month = More flexibility)
5. **What's your most complex feature?** (Basic content = WordPress, Complex workflows = Custom)

What are your thoughts? And do you have active web developers in the group who'd take ownership of a custom build?
