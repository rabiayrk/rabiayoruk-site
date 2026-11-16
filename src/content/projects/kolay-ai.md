---
title: "Kolay.AI demand forecasting"
order: 2
summary: "Forecasting for small and medium businesses. Models predicted demand swings and disruptions, and the clients used them to plan inventory."
metric: "82.5%"
metricLabel: "forecast accuracy across about 10 SME clients"
role: "Data Scientist and ML Engineer"
org: "OptiWisdom"
period: "2022 to 2023"
stack: ["Python", "scikit-learn", "OptiScorer", "Docker", "Kubernetes", "CI/CD on AWS and Azure"]
numbers:
  - { value: "82.5%", label: "forecast accuracy" }
  - { value: "10", label: "SME clients using the forecasts, approximately" }
publication: yoruk2025kolayai
chart: forecast
diagram:
  caption: "Kolay.AI forecasting flow, simplified. Several models compete, the best one is kept."
  columns:
    - - { id: sales, label: "Sales data", note: "client exports", kind: external }
      - { id: stock, label: "Inventory data", note: "client exports", kind: external }
    - - { id: etl, label: "ETL", note: "clean, join" }
    - - { id: feat, label: "Features", note: "per client" }
    - - { id: cand, label: "Candidate models", note: "incl. OptiScorer", kind: model }
    - - { id: sel, label: "Model selection", note: "compare, keep best" }
    - - { id: bi, label: "BI dashboard", note: "inventory plans" }
  edges:
    - [sales, etl]
    - [stock, etl]
    - [etl, feat]
    - [feat, cand]
    - [cand, sel]
    - [sel, bi]
---

## Problem

Small businesses run out of stock, or buy too much, because demand changes and nobody sees it coming. They do not have a data team. They need a forecast they can read and act on.

## What I built

- Forecasting models that predicted demand swings and disruptions for about 10 SME clients.
- Several candidate models, including OptiScorer, OptiWisdom's licensed scoring model. They were compared on the same data and the best one was kept.
- Customer segmentation with RFM analysis, used for recommendations and cross selling.
- CI/CD for model versioning, retraining and deployment. Services ran in Docker on Kubernetes and AWS ECS.

The forecasts reached 82.5% accuracy and the clients used them to plan inventory.

## Paper

The platform and its results are described in a sole-author paper in the Journal of Data Analytics and Artificial Intelligence Applications (2025).
