# mini-project-02-spring2026

Today, we will add “actions and interactivity” to our webpage that we created last week. To do so, we will need to know the basics of JavaScript.

### JavaScript:

- Modern JavaScript is a safe programming language. It does not provide low-level access to memory or the CPU, because it was initially created for browsers that do not require it.

- In-browser JavaScript can do everything related to webpage manipulation, interaction with the user, and the web server.

- JavaScript’s capabilities greatly depend on the environment it’s running in. For instance, Node.js (https://nodejs.org/en) supports functions that allow JavaScript to read/write arbitrary files, perform network requests, etc.
  - Node.js is a free, open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser, typically for server-side development. Built on Google's fast V8 JavaScript engine, it enables the creation of scalable and efficient network applications.

### Basic Syntax:

- Once you have downloaded or cloned the repo, check script01.js ( inside test-project02a).
- If you have Node.js installed, it would be easy to run the script from your VSCode terminal with the command:

* Once you have downloaded or cloned the repo, check `script01.js` ( inside `test-project02a`).

* If you have Nodejs installed, it would be easy to run the script from your VSCode terminal with command: .

```

node script01.js

```

- I have added examples that would help you understand the following:
  - declare variables (let, const)
  - add comments (single line, multi-line)
  - print output (on console)
  - conditional statements
  - repetition (for/while loop)
  - function definition (traditional vs arrow functions)
  - objects and type checking

- Uncomment each part of the code and test.

- Naming convention: camelCase

- To learn more, you may check out the Resources section.

### Connecting HTML to Your JavaScript:

- Open the _index.html_ in a browser.

- When you open the index.html source in VSCode, you will notice that it is linked to a script, _factorialRelatedScript.js_. Check the script file out.

```
<script src="./factorialRelatedScript.js">
</script>
```

- Note how the **button** (`get factorial`) in your _index.html_ is connected to the function `getResult()` and how the `getResult()` function accesses and draws information and user input from different **DOM (Document Object Model)** elements.
  - Note: The **HTML DOM (Document Object Model)** is a programming interface for web documents. It represents the structure of an HTML page as a logical tree of objects, allowing programming languages like JavaScript to dynamically access and update the page's content, structure, and style.

  - Check: https://www.w3schools.com/js/js_htmldom.asp

  - You may use tools like (https://codu-code.github.io/dom-visualizer/index.html) to visualize the DOM tree. Open the visualizer and paste the raw HTML file there.

- **getElementById(...)**: retrieves an HTML element by its unique `id`.

- Some common and similar functions are:

      - `getElementsByClass(...)`
      - `getElementsByTagName(...)`
      - `querySelector(...)`
      - `querySelectorAll(...)`

- This page can help you understand more on them:
  - https://www.w3schools.com/js/js_htmldom_elements.asp

### To-Do 01 [5 + 5 = 10 points]:

#### To-Do 01 (a):

- In _index.html_, there is a `div block` right below `<hr/>` (in the same index.html), which is commented out. Uncomment it.

- This `div` needs to be associated with functions defined in `seriesRelatedScript.js`. Add proper instructions so the `div` becomes interactive, and when the **Generate Series** button is pressed, it displays the arithmetic series given $a$, $n$, and $d$.

- Note: in this case, instead of using `onclick` to connect the button **Generate Series** to `seriesRelatedScript.js`, I have used `addEventListener`, which is another way to add control to the HTML components.

- Test this part of the code. You may notice that for every button click, it generates a new series and keeps adding it to the same div, without removing the previous ones.
  - Make necessary adjustments to fix the issue (previous series should be gone).
  - Show your work to the professor before proceeding to the next step.

#### To-Do 01 (b):

- Add a new div to the HTML file with a button and a way to pass a string input. When the button is pressed, check whether the string is a palindrome and print a message (`alert`) accordingly. Make sure to use two different colors to demonstrate two different messages (whether it's a palindrome or not).

### To-Do 02 [30 points]:

- Check the link: https://besd-emergency-call-directory.netlify.app/

- Note:
  - There are several buttons (Call, Send Text, Clear, ThumbsUp, ThumbsDown).
  - Click each of them and check the impacts.
  - Notice how the History is updated based on each call.
  - Also, the message changes when the coins run out.

- Given this sample, add appropriate sections in your **mini-project-01** that have **at least 3 types of buttons** (**each with different functionality**), some labels that are updated based on user input (like "click"), and have a way to display the history of user actions and a button to clear the history.

- Given the idea that you can not only add interactivity to the existing elements but also add new components/elements to the DOM, modify your code/files so that the cards you created for mini-project-01 (in raw HTML) by repeatedly writing the same/similar block of HTML, are now generated by a script.

- Think carefully; there's no need to do it across multiple pages (unless you want to). Run your idea by your professor.

- Write the scripts (necessary functions) as modularly as possible.

- Deploy your updated project. Remember, it should be separate from mini-project-01.

- Make sure ToDo-1 is also added to the submission (it can be in a separate folder; no need to deploy it)..

- README.md:
  - Title: give a nice title to your work.

  - Put the partners' names.

  - Briefly describe the files (contents, functions) you have.

  - Describe the important DOM elements that are interactive and briefly explain the function of each interactive item (like, what happens when the `Z` button is pressed, etc.). You should also mention which DOM manipulators functions (like, getElelemtById(..), etc.) were used to complete the tasks.

  - It might be safe to have the live link at someplace of your README.

### Submission:

- **Feb 12 [11:59 PM], EST**
- Submit the GitHub Repo and the live link for this (on Canvas).

### Rubric:

- part 01 [10 points]
- part 02 [30 points]
  - cards with some active buttons,
  - some dynamic text/labels that changes over button clicks,
  - keep the history of user actions,
  - a button to clear the history
  - at least 3 different types of buttons (e.g., clear history, add to cart, show details, remove, like/dislike)
  - generate the cards using a html script

- presenatation (you must prepare a 2 minute speech, not more) -> [5 points]

- GitHub Repository must have at least 5 meaningful commits (each commit should have proper comment) -> [5 points]

- README: [readme section] -> [10 points]

**You team will get a 0 score if I don't receive the GitHub link and the live link within the deadline.**

### Resources:

- https://javascript.info/

- https://www.w3schools.com/js/
