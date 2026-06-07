---
title: "Resume Analyzer: Algorithmic ATS Scanners"
category: "AI Tool"
description: "A deep dive into building an automated resume scanner using PDF extraction vectors, TF-IDF keyword mapping algorithms, and PuterJS serverless scripts."
tech: ["React", "TypeScript", "PuterJS", "ATS Parsing", "AI Integration"]
liveUrl: "https://resume-analyzer-one-beige.vercel.app/"
githubUrl: "https://github.com/amanshishodia-1/resume-analyzer"
slug: "resume-analyzer"
---

This case study reviews the engineering decisions behind **Resume Analyzer**, an ATS layout auditing application.

## 1. Problem Statement
Applicant Tracking Systems (ATS) reject up to **75%** of resumes before they reach recruiters because of formatting anomalies or missing keywords. Creating a tool to audit resumes requires parsing complex PDF structure layouts (tables, headers, two-column formats) and comparing tokenized contents against job descriptions in real-time, all while keeping API execution costs low and securing private student resume files.

## 2. Engineered Solution
The application implements:
1. **Local PDF Text Extraction**: Utilizing browser-based parser nodes to extract raw text directly on the client, avoiding high file transfer payloads and secure data risks.
2. **TF-IDF Keyword Matching Engine**: An algorithmic comparison index written in TypeScript that calculates term frequencies (TF) and inverse document frequencies (IDF) to identify critical missing phrases.
3. **PuterJS Integration**: Utilizing PuterJS serverless API containers to execute lightweight analysis scripts without hosting dedicated servers.

---

## 3. Data Flow Architecture
The application runs entirely on client-side parsers and serverless nodes to secure files.

```text
[ Resume PDF File ] ──► [ Client PDFJS Parser ] ──► [ Clean Raw Text ]
                                                          │
                                                          ▼ (TF-IDF Indexing)
[ Job Description ] ──► [ Term Tokenizer ] ───────► [ Comparison Engine ]
                                                          │
                                                          ▼ (PuterJS Serverless Node)
[ Actionable Report Dashboard ] ◄────────────────── [ AI Recommendation JSON ]
```

---

## 4. Technical Decisions & Tradeoffs

### Client-side PDFJS Parsing vs. Server-side OCR
- **Decision**: We processed PDFs using clientside libraries rather than server-side OCR (Optical Character Recognition).
- **Tradeoff**: While browser-based parsing cannot extract text from scanned images (resumes saved as JPGs inside PDFs), it handles standard text PDFs instantly (under 200ms) with zero server bandwidth costs and 100% user data privacy.

### PuterJS Serverless vs. Standalone Node.js Server
- **Decision**: Used **PuterJS** for hosting the backend recommendation scripts.
- **Rationale**: PuterJS provides built-in hosting, user key-value storage, and serverless execution environments. This allowed us to deploy the analysis engine as a zero-maintenance, serverless node, avoiding server configurations and database scaling fees.

---

## 5. Engineering Challenges & Resolves

### Challenge: Parsing Two-Column Resume Formats
Many resume templates lay text out in side-by-side columns. Standard top-to-bottom text extractors read across the page, mixing sentences from column 1 and column 2 into gibberish.
- **Resolution**: Implemented layout coordinate mapping. The parser reads individual text box coordinates (`x`, `y` coordinates in the PDF schema) and sorts them into logical columns before mapping terms, maintaining proper context structure for the TF-IDF engine.

---

## 6. Project Results
- **Auditing Latency**: Analyzing a 2-page PDF and generating keyword feedback logs takes under **2 seconds**.
- **Data Privacy**: Resume text is parsed locally inside the browser memory. No files are uploaded to third-party databases, ensuring strict data privacy.

---

## 7. Screenshots
![Resume Analyzer Dashboard](/images/projects/resume-analyzer.png)

---

## 8. Future Improvements
1. **Vector Embeddings**: Replace simple keyword frequency matches (TF-IDF) with vector embeddings (using Pinecone) to perform semantic analysis (matching "React" with "frontend development" even if the word "frontend" is missing).
2. **Dynamic PDF Generation**: Generate a download-ready optimized PDF directly from the dashboard suggestions.
