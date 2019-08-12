# What is it?

A single page VAT calculator web app written in React.

This is a follow on from my [original attempt using jQuery](https://github.com/wemsteral/COOKvatCalculator).

# What does it do?

The COOK Vat Calculator takes two values as input, and upon submission, displays the total of those two values, the amount of tax and the grand total; the former two combined.

Extra features:
A reset button to make all displayed totals go to zero
The ability to change the country in question, via drop down box.
Changing currency symbols depending on choice of country.
Changing visible tax rate.
COOK styling!

# How do I use it?

Clone this repo

```
npm i

npm start

or

yarn add

yarn start
```

# Approach

I knew that to begin with at least, the scale of this app would allow me to implement everything via a single component.

I began with a simple app that took two inputted values and displayed the total. I was fortunate to find the npm package 'react-numeric-input' which allowed for much easier formatting and edge-case-guarding. These are visible as `NumericInput` objects in the render.

I also added the npm package 'react-select' for the drop down box.

There are 3 main functions that handle events:
`handleReset`
`handleSubmit`
`selectChange`

I also created an object to hold all of the properties of each nation's taxRate. These are called upon to change the component's state.

Finally, styling. I was fortunate to be able to get the COOK font and background colour by using the dev tools in the browser. Overall, the styling is clean and minimal. I aimed to make use of vertical space so the app can be used on smaller screens with no formatting problems.

# Challenges

As with all user-input-related apps, there were a lot of edge cases that needed guarding against:

Negative numbers
Unrecognised characters
Numbers beyond two decimal places
No entries

Most of these were solved by controlling characteristics of the NumericInput objects.

Another challenge was in figuring out how the external objects (`NumericInput` & `Select` ) worked. I had to read a lot of documentation and debug to figure out how they interacted with events and other objects. However, once this was understood, the virtues were clear. `NumericInput` for example, returns the value of an event automatically, so less code is needed to extract the number from the input. `Select` interacted with my taxRates object in an efficient way, to streamline the process of filling the options and returning the values.
