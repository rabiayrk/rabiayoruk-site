---
title: "AI cold outreach platform"
order: 4
summary: "An AI cold outreach platform for sales teams at a US startup. It researches each prospect and drafts a personal email."
metric: "4 months"
metricLabel: "from zero to first trial users"
role: "Senior Software Engineer, AI platform"
org: "AI startup, US (remote)"
period: "Mar 2025 to Jun 2025"
stack: ["React", "Django", "FastAPI", "LLM agents", "RAG", "Cloud deployment"]
numbers:
  - { value: "4 months", label: "from zero to first trial users" }
diagram:
  caption: "Research and drafting flow, simplified. Company details are not public."
  columns:
    - - { id: web, label: "Prospect data", note: "company, web", kind: external }
    - - { id: agent, label: "Research agent", note: "tools, RAG", kind: model }
    - - { id: draft, label: "Draft writer", note: "personal email", kind: model }
    - - { id: api, label: "Django, FastAPI", note: "APIs, jobs" }
      - { id: db, label: "Database", note: "prospects, drafts", kind: store }
    - - { id: ui, label: "React app", note: "sales team" }
  edges:
    - [web, agent]
    - [agent, draft]
    - [draft, api]
    - [db, api]
    - [api, ui]
---

## Problem

Good cold emails need research. A sales person reads the prospect's site and news, then writes. That takes time for each email, so most teams send generic messages instead.

## What I built

- The full product, end to end: React front end, Django and FastAPI back end, database design and cloud deployment.
- LLM features for prospect research and email drafting, with agents and retrieval.

The product went from zero to its first trial users in four months.
