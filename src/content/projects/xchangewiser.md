---
title: "XchangeWiser"
order: 3
summary: "A stock market product for individual investors. Forecasting and simulation showed each user the projected gains and losses of a decision."
metric: "1,000"
metricLabel: "individual investors over four years, approximately"
role: "Data Scientist and ML Engineer"
org: "OptiWisdom"
period: "2022 to 2023"
stack: ["Python", "Custom forecasting models", "Simulation", "Docker", "Kubernetes"]
numbers:
  - { value: "1,000", label: "individual investors, approximately" }
  - { value: "4 years", label: "in production" }
chart: simulation
diagram:
  caption: "XchangeWiser forecasting and simulation, simplified."
  columns:
    - - { id: mkt, label: "Market data", note: "prices", kind: external }
    - - { id: pipe, label: "Data pipeline", note: "clean, store" }
    - - { id: fc, label: "Forecast models", note: "custom", kind: model }
    - - { id: sim, label: "Simulation", note: "gains, losses", kind: model }
    - - { id: app, label: "Investor app", note: "about 1,000 users" }
  edges:
    - [mkt, pipe]
    - [pipe, fc]
    - [fc, sim]
    - [sim, app]
---

## Problem

New investors often see one number: the price today. They do not see the range of what can happen next. XchangeWiser wanted to show that range before a user makes a decision.

## What I built

- Custom forecasting models for the assets in the product.
- A simulation layer that turns forecasts into projected gains and losses for a user's position.
- The services that ran both in production, with retraining and deployment through CI/CD.

About 1,000 individual investors used it, and it ran for four years.
