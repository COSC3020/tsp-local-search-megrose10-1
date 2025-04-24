function tsp_ls(distance_matrix) {
    let numOfCities = distance_matrix.length;
    let route = [];
    let bestRoute = [];
    for(let i = 0; i < numOfCities; i++) {
        route.push(i);
    }

    //If there is one city, the distnace is 0
    if(numOfCities <= 1) {
        return 0;
    }

    //Check if the matrix is filled with zeros, so no distances
    let noDistances = true;

    for(let i = 0; i < numOfCities; i++) {
        for(let j = 0; j < numOfCities; j++) {
            if((i != j) && (distance_matrix[i][j] != 0)) {
                noDistances = false;
                break;
            }
        }
        //If there are nodistances, return 0
        if(noDistances) {
            return 0;
        }
    }

    //Fisher Yates Algorithm
    for(let i = numOfCities - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = route[i];
        route[i] = route[j];
        route[j] = tmp;
    }

    //Look at the distance of the recent random route
    let bestRouteDistance = calculateDistance(route, distance_matrix);
    //Unitl we have reached the stopping criteria, keep finding the best route
    let stoppingCriteria = findFactorial(numOfCities);
    let counter = 0;

    let notValidi = null;
    let notValidk = null;

    while(counter < stoppingCriteria) {
        counter++;
        let i;
        let k;
        //Find values for i and k, if i and k are values we cannot use, regenerate them
        do{
            i = Math.floor(Math.random() * (numOfCities - 1));
            k = Math.floor(Math.random() * (numOfCities - i - 1)) + i + 1;
            //console.log("i: " + i + " k: " + k);
        }
        while(i == notValidi && k == notValidk);

        //Call 2optswap method to swap cities i through k
        let newRoute = twoOptSwap(route, i, k);
        //console.log("newRoute: " + newRoute);
        //Find the distance of the new route
        let newDistance = calculateDistance(newRoute, distance_matrix);

        //If the new route is better than the best route's distance, new best route is the curretn route
        if(newDistance < bestRouteDistance) {
            route = [...newRoute];
            bestRoute = [...newRoute];
            bestRouteDistance = newDistance;
            //console.log(route);
            //console.log("best route: " + bestRouteDistance);
            //Next i and k values should not be current i and k, need to try different i and k values
            notValidi = i;
            notValidk = k;
            //console.log("i: " + notValidi + "k: " + notValidk);
        }
    }

    return bestRouteDistance;

}

function twoOptSwap(route, i, k) {
    let updatedRoute = [...route];

    let first = i;
    let last = k;

    //Swap elements from i to k
    while(first < last) {
        let tmp = updatedRoute[first];
        updatedRoute[first] = updatedRoute[last];
        updatedRoute[last] = tmp;
        first++;
        last--;
    }

    return updatedRoute;
}

function calculateDistance(route, distance_matrix) {
    let distance = 0;
    //While you are going through current route, calculate distance
    for(let i = 0; i < route.length - 1; i++) {
        distance = distance + distance_matrix[route[i]][route[i + 1]];
    }

    distance = distance + distance_matrix[route[route.length - 1]][route[0]];

    //console.log(distance);

    return distance;
}

function findFactorial(n) {
    let fac = 1;

    for(let i = 1; i <= n; i++) {
        if(fac > 0) {
          fac *= i;
        }
    }

    return fac;
}

// let dm = [
//     [0,3,4,2,7],
//     [3,0,4,6,3],
//     [4,4,0,5,8],
//     [2,6,5,0,6],
//     [7,3,8,6,0]
// ];
// console.log("Should be: >=13");
// console.log("we got: " + tsp_ls(dm));
