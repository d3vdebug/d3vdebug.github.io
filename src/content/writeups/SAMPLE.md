---
title: "Sample Writeup: Testing Headings, Images, and TOC"
description: "A sample writeup to verify styling, TOC, captions, and search indexing."
date: 2026-08-09
author: "DevDebug"
category: "Notes"
tags: ["sample", "testing", "seo"]
image: "/images/random/sample-hero.jpg"
unlisted: true
---

# Heading Level 1

Intro paragraph. This is a sample writeup to check how headings render, TOC generation, and caption sizes.

## Heading Level 2 (Section A)

Some content under H2. Include an image with a caption (small):

![Alt text for image](/images/random/sample-1.jpg "Optional title")

<!-- Use data-caption and data-caption-size to test the enhancer -->
<img src="/images/random/sample-2.jpg" alt="Sample with caption" data-caption="This is a small caption" data-caption-size="sm" />

### Heading Level 3 (Subsection A.1)

More content under H3. Add another image with pixel-sized caption:

<img src="/images/random/sample-3.jpg" alt="Pixel caption" data-caption="Pixel-sized caption" data-caption-size="14px" />

## Heading Level 2 (Section B)

Closing notes and some inline code: `console.log('hello')`.

- Bullet one
- `Bullet two`

`[GitHub](https://github.com)`
> Useful information that users should know, even when skimming content.

End of sample.
