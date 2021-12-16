# TEMPLATE FOR RETROSPECTIVE (Team P08)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs done : 5 committed and done
- Total points committed vs done : 55 committed and done
- Nr of hours planned vs spent (as a team)
  Planned: 126h45m
  Done: 112h01m

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
| # 0   | 16      | /      | 83h00m     | 65h15m       |
| #14   | 4       | 8      | 14h35m     | 16h00m       |
| #16   | 1       | 8      | 8h00m      | 1h50m        |
| #18   | 3       | 8      | 24h30m     | 14h55m       |
| #19   | 1       | 8      | 6h00m      | 6h40m        |
| #26   | 5       | 8      | 13h35m     | 6h21m        |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation) <br/>
  avg = 3.09h <br/>
  std = 3.15h
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table = 1.13

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated 20h
  - Total hours spent 16h15m
  - Nr of automated unit test cases 221 (to be validate)
  - Coverage (if available) 54.6%
- E2E testing:
  - Total hours estimated 10h
  - Total hours spent 10h
- Code review
  - Total hours estimated (frontend) 16h
  - Total hours spent (frontend) 16h
- Technical Debt management:
  - Total hours estimated (frontend) 16h
  - Total hours spent (frontend) 23h
  - Hours estimated for remediation by SonarQube: 3d 7h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 2h 53min
  - Hours spent on remediation: 3h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.9%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ): RELIABILITY A, MAINTAINABILITY A, SECURITY A, SECURITY REVIEW A, COVERAGE 54.6%, DUPLICATIONS 16.6%. N.B. See sonar Readme for major informations

## ASSESSMENT

- What caused your errors in estimation (if any)?
Not having to write code from scratch has not been taken into account when estimating new apis and frontend, on the contrary some operations of refactoring and testing took slightly more than anticipated due to some strange behaviors from the code

- What lessons did you learn (both positive and negative) in this sprint?
Code does not always need additional functions, we can recycle components and manage what has already been written in order to meet the requirements. Testing on the other end can and should be conducted in a more efficient and automated way (expecially in frontend), fortunately manual testing is still manageable due to the relatively small size of the code and to how the logic of the application has been distributed

- Which improvement goals set in the previous retrospective were you able to achieve?
We returned to the previous configuration of the team, resulting in smoother planning and estimation as well as a better coordination between the two sides.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
More cleanup and refactoring are needed but can be handled alongside the usual amount of stories to commit, the goal for the week is to refine the code as well as committing more stories

> Propose one or two

- One thing you are proud of as a Team!!
We are getting more and more proficient at determining, assessing and approaching each mid term and long term goal we set along the sprint, resulting in high performance and coordination among the members.
