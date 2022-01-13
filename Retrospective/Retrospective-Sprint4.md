# TEMPLATE FOR RETROSPECTIVE (Team P08)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs done : 8 committed and done
- Total points committed vs done : 84 committed and done
- Nr of hours planned vs spent (as a team)
  Planned: 105h30m
  Done: 103h00m

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
| # 0   | 10      | /      | 80h30m     | 64h50m       |
| #40   | 2       | 21     | 3h10m      | 2h10m        |
| #41   | 5       | 13     | 12h00m     | 7h15m        |
| #42   | 3       | 8      | 3h30m     | 16h45m       |
| #43   | 2       | 8      | 2h00m      | 5h30m        |
| #44   | 1       | 8      | 1h00m     | 1h00m        |
| #45   | 3       | 8      | 2h40m     | 2h40m        |
| #46   | 2       | 13     | 0h30m     | 1h10m        |
| #47   | 2       | 5      | 0h30m     | 0h40m        |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation) <br/>
  avg = 3.43h <br/>
  std = 4.84h
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table = 1.24

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated 21h
  - Total hours spent 19h55m
  - Nr of automated unit test cases 188
  - Coverage (if available) 68.6% (overall code)
- E2E testing:
  - Total hours estimated 11h
  - Total hours spent 9h
- Code review
  - Total hours estimated (frontend) 16h
  - Total hours spent (frontend) 16h
- Technical Debt management:
  - Total hours estimated (frontend) 16h
  - Total hours spent (frontend) 23h
  - Hours estimated for remediation by SonarQube: 1d 2h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 6h 17min
  - Hours spent on remediation: 5h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.1%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ): RELIABILITY A, MAINTAINABILITY A, SECURITY A, SECURITY REVIEW A, COVERAGE 68.6% (overall code), DUPLICATIONS 7.4%.

## ASSESSMENT

- What caused your errors in estimation (if any)?
  Refactoring went way more smoothly than anticipated but due to some changes on the db backend stories have been more complex to handle and by direct consequence so did all test cases

- What lessons did you learn (both positive and negative) in this sprint?
  Having files with thousands of lines of code is impossible to deal with, expecially when the project is growing by a significant amount every week, that said the framework we selected for this project is very easily scalable and with little work the project can be greatly improved

- Which improvement goals set in the previous retrospective were you able to achieve?
  We managed to commit more stories again as well as refactoring the code

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  At this point the refactoring process should have left a modular code to help any further development effort, for next sprint we plan additional fixes to the code and to improve automated testing

> Propose one or two

- One thing you are proud of as a Team!!
  The group is well organized and we managed to divide well the workload according to personal preferences and skills, there was space for learning as well due to the large variety of tools we used during development and this had an impact on the evolution of the project itself.
