---
author: Brad Bodine
pubDatetime: 2025-07-21
modDatetime: 2025-07-21
title: IdeaCrew Launches Plan Year Reinstatement for Massachusetts Health Connector
slug: ideacrew-launches-plan-year-reinstatement-for-massachusetts-health-connector
featured: true
draft: false
tags:
  - sbm
  - solution
description: IdeaCrew recently completed a significant enhancement for the Massachusetts Health Connector (MHC) platform by launching the “Plan Year Reinstatement” feature.
---

IdeaCrew recently completed a significant enhancement for the Massachusetts Health Connector (MHC) platform by launching the “Plan Year Reinstatement” feature. In Massachusetts, employer organizations are required to request approval for coverage year cancellations and terminations from both the Health Connector and trading partners, each with its own designated request window. Prior to this enhancement, MHC’s operational teams had to manually process coverage year reinstatements, as no automated process existed. The operational burden, especially during the heightened volume of the COVID-19 public health emergency, made this manual process increasingly inefficient.

To address this challenge, IdeaCrew was tasked with automating the reinstatement process. The project involved restoring an organization’s coverage year, including health and dental enrollments for employees, automated EDI sequenced communications, and introducing a web- based form for auditable logging and historical plan year tracking. IdeaCrew’s cross-functional team collaborated closely with DCHBX and MHC staff to understand the Health Connector’s needs. This included performing ticket trend analysis, calculating ROI, conducting JAD sessions to define requirements, and developing a detailed implementation plan alongside other project documentation.

Parallel to requirements gathering, IdeaCrew’s architectural team held internal design meetings to ensure the technical implementation aligned with the project’s objectives. The technical solution leveraged IdeaCrew’s expertise in Ruby on Rails, particularly in object- oriented programming (OOP). Our established development practices, emphasizing modularity, allowed for a seamless extension of functionality to the SHOP model. Employer organizations manage “plan year objects,” each with different states that govern eligibility for enrollment. To restore an organization’s coverage year, IdeaCrew implemented a composite pattern model, adhering to encapsulation principles and maintaining plan year state history. This design enabled multiple state actions to be taken on a single plan year object, while ensuring linked data objects were correctly aligned with the corresponding state.

For streamlined QA, all stakeholders had access to the necessary services for use case validation. Clear task breakdowns with defined acceptance criteria allowed for early and continuous QA throughout the SDLC, promoting effective bug remediation in each development sprint. By the time User Acceptance Testing (UAT) commenced, no defects were reported during regression testing.

As part of the deployment strategy, migrations were tested throughout the SDLC and optimized to complete in under ten minutes. After the deployment and migration were finalized, IdeaCrew’s DevOps team closely monitored user traffic. They identified and swiftly addressed any discrepancies for impacted users—specifically, organizations that had modified or newly created benefit applications during the migration.
