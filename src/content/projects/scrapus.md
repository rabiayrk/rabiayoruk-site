---
title: "Scrapus"
order: 1
summary: "Web monitoring for the Turkish Pharmacists' Association (TEB). It finds banned medicine listings on online marketplaces and sends them to TEB's systems."
metric: "60,000"
metricLabel: "records a day on average, collection to API"
role: "Co-founder"
org: "Scrapus, Tallinn"
period: "Feb 2025 to now"
stack: ["Python", "FastAPI", "LLM agents", "RAG", "REST API"]
numbers:
  - { value: "60,000", label: "records processed per day for TEB, on average" }
  - { value: "90%", label: "precision and recall for lead qualification, approximately, as reported in the Frontiers paper" }
  - { value: "0.77 to 0.92", label: "extraction F1 with transformer NLP, reported in the paper" }
publication: kaplan2025scrapus
diagram:
  caption: "Scrapus pipeline for TEB, simplified."
  columns:
    - - { id: mk, label: "Marketplaces", note: "public listings", kind: external }
      - { id: cl, label: "Classified ads", note: "public listings", kind: external }
    - - { id: crawl, label: "Crawlers", note: "scheduled runs" }
    - - { id: norm, label: "Normalize", note: "clean, dedupe" }
    - - { id: llm, label: "LLM classify", note: "enrich, qualify", kind: model }
      - { id: ref, label: "Reference corpus", note: "retrieval (RAG)", kind: store }
    - - { id: api, label: "REST API", note: "flagged records" }
    - - { id: teb, label: "TEB systems", note: "client", kind: external }
  edges:
    - [mk, crawl]
    - [cl, crawl]
    - [crawl, norm]
    - [norm, llm]
    - [ref, llm]
    - [llm, api]
    - [api, teb]
screens:
  - src: "../../assets/scrapus/packages.png"
    alt: "Scrapus app, Packages page. Four packages: FindCustomer, FindService, FindJob and FindTalent, each with a credit cost per record."
    caption: "The general product. Each package is a scraping job with a cost per record. Demo account."
  - src: "../../assets/scrapus/learn.png"
    alt: "Scrapus app, Learn page with tutorials on reading result rows, writing prompts and saving credits."
    caption: "In-app guides. Users learn to read a result row and write better prompts."
---

## Problem

Banned medicines are sold on online marketplaces every day. New listings appear faster than people can check them. TEB needed a system that finds them and sends them into its own tools, without a person watching the pipeline.

## What I built

- The whole pipeline, end to end: collection, cleaning, LLM-based classification and enrichment, and API delivery.
- LLM agents with retrieval (RAG) over a domain corpus. The model sees the listing and the relevant reference entries before it decides.
- Delivery through an API, so flagged records arrive in the client's systems and not in a spreadsheet.

The pipeline runs at about 60,000 records a day with minimal maintenance.

## From one client to a product

The same engine now powers a general B2B data product with four packages: FindCustomer, FindService, FindJob and FindTalent. Users pay per record collected. A run that finds nothing costs nothing. The approach is described in a paper in Frontiers in Artificial Intelligence (2025). The FindJob agent is described in a separate D3AI paper.

## What I would measure next

Cost per thousand records, accuracy against a labelled sample, and drift over time. This is the topic of a paper in preparation.
