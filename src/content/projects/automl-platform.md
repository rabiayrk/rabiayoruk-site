---
title: "AutoML platform for a telecom company"
order: 5
summary: "An AutoML platform for one of Türkiye's largest telecommunications companies. Its data flow module works like KNIME: each data step is a separate node on a canvas. I led the build as tech lead."
metric: "20+"
metricLabel: "client projects delivered by the team I led"
role: "Tech Lead"
org: "OptiWisdom"
period: "2023 to 2025"
stack: ["Next.js", "Python services", "pandas", "Node graph runner", "AWS", "GCP"]
numbers:
  - { value: "20+", label: "node types in the data flow editor" }
  - { value: "5", label: "client projects running in parallel, on average" }
  - { value: "20+", label: "client projects delivered at OptiWisdom" }
diagram:
  caption: "Data flow module, simplified. Each step is its own node. Client details are not public."
  columns:
    - - { id: up, label: "Uploaded datasets", note: "files", kind: external }
      - { id: db, label: "Database tables", note: "connections", kind: external }
    - - { id: pre, label: "Pre-operations", note: "merge, pivot" }
    - - { id: post, label: "Post-operations", note: "filter, fill NA" }
    - - { id: run, label: "Flow runner", note: "node by node" }
    - - { id: gen, label: "Generated dataset", note: "100-row preview", kind: store }
      - { id: exp, label: "Export to DB", note: "table, schema", kind: store }
    - - { id: ml, label: "AutoML experiment", note: "train models", kind: model }
  edges:
    - [up, pre]
    - [db, pre]
    - [pre, post]
    - [post, run]
    - [run, gen]
    - [run, exp]
    - [gen, ml]
---

## Problem

Before a model can be trained, the data has to be joined, reshaped and cleaned. The platform lets teams do these steps visually, one node at a time, and then train models in the same place, without writing code for each step.

## How the data flow works

- Users drag datasets and operation nodes onto a canvas, like in KNIME.
- Each node is a separate step with its own parameters. Pre-operations reshape tables: merge, concat, aggregate, pivot, melt, split, transpose, or a Python script. Post-operations clean columns: filter, sort, rename, fill NA, drop duplicates, type cast, resample, clip.
- The canvas is saved as a graph of nodes and edges. On run, the backend executes it node by node. A node turns yellow while it runs, green when it is done and red when it fails, and the log shows the error.
- The result is a new dataset with a 100-row preview. It goes into an AutoML experiment, or it is exported to a database table.

## What I did

- Led the build of the platform: Next.js front end and Python services.
- Owned architecture and stack decisions for AI, data and software products at OptiWisdom.
- Set up and ran client projects on AWS and GCP, and built event driven services with Kafka and Node.js.
- Ran hiring, agile delivery and performance tracking with the founder.
