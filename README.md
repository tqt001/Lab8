# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   - Github actions

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   - You need to rigourously further test the code to have a reliable product. This single unit test will not cover all the cases of everday use. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   - This would be a valid test as this makes sure the limitations of the message length is accounted for in the case a user will attempt in the future. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   - The Chromium broswer will not appear. 

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
   - Click the settings image and use it as the starting point. Use `await page.click("header > img")`.
