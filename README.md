# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

 I asked question in office hours, impromptu hours. I referenced https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html which I learned and used the Fisher Yates algorithm, I also looked at this website for randomization as well, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random. I also referenced my old TSP Held Karp and pancake sort and dynamic euler.
I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

For the worst case time complexity, we start at the top which pushing to the route array will give us O(v), the array that checks if we have a zero matrix will be O(v^2), and the for loop that is the Fisher yates Algorithm will also be O(v), and finally (before moving to the iterations) the bestRouteDistance variable will call calculateDistance, which will take O(v). Now onto the iterations, for stopping criteria (how long the while loop will run), we have O(v^2). In each iteration of this, we find the i and k values, next we will call twoOptSwap which will swap our list from our i and k values, which takes O(v), after we will check the distance this new route that has been made is. Once we calculate the distance which is O(v), we will check if the new distance is less than the best route so far. Overall, the worst case time complexity will end up being O(v^2 * v) or O(v^3) since for every iteration, we have operations in these that contribute more than v^2. This is much better than the help karp algorithm, however we are not guaranteed to find the best path with randomness. For memory complexity, although we use some temporary arrays which are O(v), we will only have a space complexity of about O(v^2); this O(v^2) comes from the distance_matrix.
