# TEMPLATE FOR RETROSPECTIVE (Team P08)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs done : 9 committed and done
- Total points committed vs done : 74 committed and done
- Nr of hours planned vs spent (as a team)
  Planned: 121h10m
  Done: 100h35m

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD

Backend -> db calls respond in a coherent way, requests and responses to frontend are as expected
Frontend -> code is working in a consistent way, integration with backend produces expected results, requests and responses are coherent

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| # 0   | 11      | /      | 29h30m     | 21h50m       |
| #10   | 4       | 8      | 11h00m     | 12h00m       |
| #11   | 1       | 8      | 8h00m      | 1h50m        |
| #12   | 3       | 8      | 7h30m      | 8h30m        |
| #13   | 1       | 8      | 2h00m      | 3h00m        |
| #15   | 5       | 8      | 12h40m     | 10h30m       |
| #17   | 5       | 8      | 13h30m     | 10h30m       |
| # 8   | 5       | 8      | 11h30m     | 9h55m        |
| # 9   | 4       | 8      | 12h00m     | 12h00m       |
| # 7   | 2       | 8      | 8h00m      | 1h30m        |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation) <br/>
  avg = 2.18h <br/>
  std = 1.35h
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table = 1.19

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated 15h
  - Total hours spent 14h40m
  - Nr of automated unit test cases 71 (to be validate)
  - Coverage (if available) 73.5%(backend)
- E2E testing:
  - Total hours estimated 10h
  - Total hours spent 10h
- Code review
  - Total hours estimated (frontend) 8h
  - Total hours spent (frontend) 8h
- Technical Debt management:
  - Total hours estimated (frontend) 10h
  - Total hours spent (frontend) 8h
  - Hours estimated for remediation by SonarQube 1d 4h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues 8h 43min
  - Hours spent on remediation 5h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.8%
  - rating for each quality characteristic reported in SonarQube under "Measures" ( reliability: A, security: A, maintainability: A ):
    RELIABILITY A, MAINTAINABILITY A, SECURITY A, SECURITY REVIEW A, COVERAGE 25.3%, DUPLICATIONS 10.1%.
  N.B. See sonar Readme for major informations

## ASSESSMENT

- What caused your errors in estimation (if any)?
  External sources warned us about Docker resulting in a slight overestimation of the matter that was set up not without issues, but way more quickly than suggested.
  Some frontend tasks are overestimated due to unexpected behavior of the code during last sprint

- What lessons did you learn (both positive and negative) in this sprint?
  Internal fragmentation is a quick way to handle development but we need a shared view of the code itself otherwise the project may fork.

- Which improvement goals set in the previous retrospective were you able to achieve?
  Way better task estimation without losing overall quality of work and number of stories completed

- Which ones you were not able to achieve? Why?
  Comunication among the two ends of the project was reduced significantly, resulting in a discontinuous development. This was later fixed but forced us to use time to handle the situation accordingly

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  The code is two sprints old and we managed to commit many stories, however we are planning a general refactor to transform the current code in a more secure and standard compliant version.

> Propose one or two
> Add more comments, organized according to a common dictionary
> Divide functions in logical blocks, based on the type of data handled and on the different type of action on the system
> Divide larger files into smaller, more readable files across the project, keeping in mind the logical division mentioned in the previous point

- One thing you are proud of as a Team!!

The team is working smoothly and the amount of work we managed to commit is a clear proof. There was neither major disagreement on the workflow and workload distribution or discussion about the development vision.
Of course opinions are exchanged frequently and solutions are shared to ensure that the team effort is directed efficiently to the goal of the sprint.
