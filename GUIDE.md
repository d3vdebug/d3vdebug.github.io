# How to Write SEO-Friendly Writeups

This guide explains how to structure and write blog posts so Google can index them well and readers can find them easily.

## 1. Front Matter (Most Important)

The front matter is the YAML block at the top of every `.md` file. This is what Google and social media see first.

```yaml
---
title: "HTB Walkthrough: Cypher - Medium Difficulty Windows Box"
description: "Complete walkthrough of HTB Cypher covering enumeration, Kerberos ASREPRoasting, hash cracking, and privilege escalation."
date: 2026-08-08
category: "HackTheBox"
tags: ["htb", "windows", "kerberos", "active-directory", "privilege-escalation"]
platform: "HackTheBox"
difficulty: "Medium"
image: "/images/htb-cypher/hero.png"
---
```

### Title Best Practices
- Keep it under 60 characters for Google search results
- Put the most important keyword first
- Make it specific, not generic
- Good: `HTB Walkthrough: Cypher`
- Bad: `My Blog Post`

### Description Best Practices
- Keep it under 160 characters
- Include target keywords naturally
- Make it actionable or intriguing
- Good: `Enumeration, exploitation, and privilege escalation on HTB's Cypher machine. A medium-difficulty Windows box featuring Kerberos misconfigurations.`
- Bad: `This is my writeup`

### Category
- Must match one of the values in `src/content/config.ts`
- Use the most specific category that fits

### Tags
- Use 3-6 relevant tags
- Lowercase for consistency
- Mix of broad and specific tags
- Good: `["htb", "windows", "kerberos", "active-directory"]`
- Bad: `["writeup", "blog", "stuff"]`

### Image
- Always include an image for better OG/social sharing
- Use `/images/[machine-name]/hero.png`
- Recommended size: 1200x630px for best social previews

## 2. Content Structure

### Heading Hierarchy
Use proper heading levels. Don't skip levels.

```markdown
# Reconnaissance          # H1 - only one per post
## Enumeration            # H2 - main sections
### SMB Enumeration       # H3 - subsections
#### Specific Finding     # H4 - rarely needed
```

### Paragraphs
- Keep paragraphs short (3-4 sentences max)
- Use line breaks between paragraphs
- Front-load important information

### Lists
Use lists for steps, findings, and tools:

```markdown
1. First step
2. Second step
3. Third step

- Tool one
- Tool two
- Tool three
```

## 3. Keyword Usage

### Primary Keyword
- Use your main keyword in:
  - Title
  - First paragraph
  - At least one heading
  - Image alt text

### Secondary Keywords
- Use related terms naturally throughout
- Example for HTB Cypher:
  - Primary: `HTB Cypher`
  - Secondary: `Kerberos`, `ASREPRoasting`, `Windows`, `Active Directory`

### Keyword Stuffing
Don't overuse keywords. Write naturally for humans first.

## 4. Images

### Alt Text
Always add descriptive alt text:

```markdown
![Nmap scan results showing open ports 88 and 445](/images/htb-cypher/nmap.png)
```

Good alt text:
- Descriptive
- Includes relevant keywords
- Not too long

Bad alt text:
- `image1.png`
- `screenshot`
- `htb1`

### Image Optimization
- Use PNG for screenshots
- Use JPG for photos
- Compress images before adding
- Recommended tools: TinyPNG, ImageOptim

## 5. Internal Linking

Link to other pages on your site:

```markdown
See also: [HTB Absolute Walkthrough](/blogs/htb-absolute)
Related category: [HackTheBox](/categories/HackTheBox)
Similar tag: [Kerberoasting](/tags/kerberos)
```

Benefits:
- Helps Google discover more pages
- Keeps readers engaged longer
- Spreads link equity across your site

## 6. Readability

### Sentence Length
- Keep sentences under 25 words
- Vary sentence length
- Use active voice

### Tools Mentioned
Always bold tool names for clarity:

```markdown
Used **nmap** to scan the target.
Then ran **enum4linux** for enumeration.
```

### Code Blocks
Use proper language tags for syntax highlighting:

```bash
# Bash commands
nmap -sC -sV target

# PowerShell
Get-UserSPN -User target

# SQL
SELECT * FROM users;
```

## 7. Complete Example

Here's a well-optimized writeup structure:

```markdown
---
title: "HTB Walkthrough: Cypher"
description: "Enumeration, exploitation, and privilege escalation on HTB's Cypher machine. A medium-difficulty Windows box featuring Kerberos misconfigurations."
date: 2026-08-08
category: "HackTheBox"
tags: ["htb", "windows", "active-directory", "kerberos", "privilege-escalation"]
platform: "HackTheBox"
difficulty: "Medium"
image: "/images/htb-cypher/hero.png"
---

# Reconnaissance

Starting with an nmap scan to identify open ports and services:

```bash
nmap -sC -sV -oA cypher 10.10.10.XXX
```

![Nmap scan results showing open ports](/images/htb-cypher/nmap.png)

### Results

Port 88 indicates an Active Directory environment with Kerberos running.

## Enumeration

The machine exposes SMB and Kerberos on port 88.

### SMB Enumeration

```bash
smbclient -L //10.10.10.XXX -N
```

![SMB shares enumeration](/images/htb-cypher/smb.png)

## Exploitation

Found a user with ASREPRoasting enabled.

### Extracting Hash

```bash
impacket-GetNPUsers -dc-ip 10.10.10.XXX domain.local/ -usersfile users.txt
```

## Privilege Escalation

Used Kerberoasting to escalate privileges.

## Flags

```
user.txt: 3******************************
root.txt: f******************************
```

## Remediation

- Disable pre-authentication for service accounts
- Implement strong password policies
- Regular auditing of Kerberos configurations
```

## 8. SEO Checklist Before Publishing

- [ ] Title is under 60 characters
- [ ] Description is under 160 characters
- [ ] Category matches enum in config.ts
- [ ] 3-6 relevant tags added
- [ ] Hero image included
- [ ] Images have descriptive alt text
- [ ] Content has proper heading hierarchy
- [ ] Paragraphs are short and readable
- [ ] Code blocks have language tags
- [ ] Internal links to related posts
- [ ] No duplicate content from other sources

## 9. Common Mistakes to Avoid

| Mistake | Why it's bad | Fix |
|---------|--------------|-----|
| Duplicate titles | Confuses Google | Make every title unique |
| Missing descriptions | Google auto-generates poor snippets | Write custom descriptions |
| Generic tags | Hard to categorize | Use specific, relevant tags |
| No images | Lower engagement | Add at least one image |
| Walls of text | Poor readability | Use short paragraphs and lists |
| Keyword stuffing | Google penalty | Write naturally |
| Missing alt text | Accessibility + SEO | Describe every image |
| No internal links | Missed SEO opportunity | Link to related posts |

## 10. Publishing

1. Save your `.md` file in `src/content/writeups/`
2. Run `npm run dev` to preview
3. Check for typos and formatting
4. Verify images load correctly
5. Commit and push:

```powershell
git add .
git commit -m "Add HTB Cypher walkthrough"
git push
```

GitHub Actions will automatically deploy.
