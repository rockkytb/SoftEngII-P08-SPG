TEMPLATE FOR RETROSPECTIVE (Team ##)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done : 6 committed and done
- Total points committed vs done : 76 committed and done
- Nr of hours planned vs spent (as a team): 
Planned: 49h30m
Done: 102h40m



**Remember**  a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD: 
Backend -> db calls respond in a coherent way, requests and responses to frontend are as expected
Frontend -> code is working in a consistent way, integration with backend produces expected results, requests and responses are coherent

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
|        |         |    -   |            |              |
|   #0   |   15    |    /   |   21h50m   |   47h10m     |
|   #1   |    7    |    8   |    7h30m   |   10h50m     |
|   #2   |    4    |    5   |    2h20m   |    3h40m     |
|   #3   |   11    |   13   |   13h40m   |   24h30m     |
|   #4   |    4    |   13   |    4h15m   |    7h00m     |
|   #5   |    5    |    8   |    4h20m   |    8h30m     |
|   #6   |    9    |    8   |    1h20m   |    2h00m     |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation) avg = 1.86h st_dev = 1.97h
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table = 0.48

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated (frontend n/a)
  - Total hours spent (frontend n/a)
  - Nr of automated unit test cases 
  - Coverage (if available)
- E2E testing:
  - Total hours estimated (frontend) 10h
  - Total hours spent (frontend) 6h
- Code review 
  - Total hours estimated (frontend) 8h
  - Total hours spent (frontend) 8h
- Technical Debt management:
  - Total hours estimated (frontend) 10h
  - Total hours spent (frontend) 8h
  - Hours estimated for remediation by SonarQube n/a
  - Hours estimated for remediation by SonarQube only for the selected and planned issues n/a
  - Hours spent on remediation n/a
  - debt ratio (as reported by SonarQube under "Measures-Maintainability")
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability: A, security: A, maintainability: A )
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
(Frontend) We considered only the time estimation for development, not taking into account fixes for unexpected behavior from async calls.

- What lessons did you learn (both positive and negative) in this sprint?
(Frontend) We managed to fix most server calls in a consistent way and we produced useful templates for further development sprints

- Which improvement goals set in the previous retrospective were you able to achieve? 
We managed to better organize the sprint and commit a larger number of stories
(Frontend) Better understanding of git and other tools used during development and testing

- Which ones you were not able to achieve? Why?


- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
(Frontend) Better handling of async server calls, produce a tidier code with comment and help to navigate throgh

> Propose one or two
Add comments
Divide functions in logical blocks


- One thing you are proud of as a Team!!
Frontend team is well coordinated both in developing new code and testing, in case of issues/errors help is always offered and it is often useful to speed up fixing.