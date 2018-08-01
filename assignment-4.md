# Assignment 4

## Introduction

This assignment is a continuation of Assignment 3. If you have successfully completed the previous assignment, you may use your own code, or you can use the sample solution for Assignment 3, posted [here](http://ece.ubc.ca/~kumseok/src/vsp2018/solutions/assignment-3.zip), to complete this assignment.

In this assignment, you will remove the hardcoded list of images from your code, and will also stop using the local image files stored on your computer. You will be using asynchronous requests (AJAX) to receive image URLs from a server, and use them to display the images in the grid.

You will need to first get the server code from [HERE](https://github.com/jungkumseok/ubc-vsp18-server/). Follow the instructions and then confirm that you can see your client application (assignment-3) at `http://localhost:3000/`.

## Tasks

1. For this task, you do not need to change the code which displays images in the grid. Add code to send a GET HTTP request to `http://localhost:3000/images` endpoint which returns a list of image URLs. **Print this list of URLs to the console.**
2. For this task, you will **use the list of image URLs downloaded (via AJAX) in the previous task** to display them in the grid.

## Submission Instructions

- Update either your own code from Assignment 3, or the sample solution code to accommodate the required changes for this assignment.
- Create a branch, and name it appropriately (eg. assignment-4)
- Make sure to push your changes to that branch before midnight (11:59 PM) on the date of the assignment deadline.
