Setup:
1. clone the code from `https://github.com/SibghaIlyas/arqiva.git`
2. Go into the project's directory
3. Run `npm install`

Execute tests:
* Run the command: `npx playwright test` to run in headless mode
* Run the command: `npx playwright test --ui` to run in UI mode
* Look at the report in `test-results/index.html` file. 
* Screenshots can be seen in `screenshots` folder
* I have written an example api test under `tests/` folder. **Please refer to `tests/aoi-tests.spec.js` in order to see how APIs can be automated within this framework.**
* For the CI/CD integration, I have added github actions workflow `playwright.yml` file which runs on every new code push. 
* New changes can be added in the `.yml` file to schedule the build at a particular time. 
* For now, `deploy to staging and production` has been commented out because we aren't doing it, but I added the steps for them just to give an understanding.