// Global variables
let array = [];
let arraySize = 50;
let animationSpeed = 50; // Controls animation speed

// Generate a random array based on the size from the slider
function generateArray() {
  disableButtons(); // Disable all buttons 
  arraySize = document.getElementById("sizeRange").value;
  array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500));//random array generation
  createBars();
  enableButtons(); // Enable buttons 
}

// Create bars in the container
function createBars() {
  const container = document.getElementById("array-container");
  container.innerHTML = ''; // Clear previous bars

  array.forEach(value => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value}px`;

    const number = document.createElement('span');
    number.classList.add('bar-number');
    number.innerText = value;

    bar.appendChild(number);
    container.appendChild(bar);
  });
}

// Update speed based on slider input
function updateSpeed() {
  animationSpeed = document.getElementById("speedRange").value;
}


// Disable all buttons
function disableButtons() {
  const buttons = document.querySelectorAll('.sort-btn, #generateBtn');
  buttons.forEach(button => button.disabled = true);
}

// Enable all buttons
function enableButtons() {
  const buttons = document.querySelectorAll('.sort-btn, #generateBtn');
  buttons.forEach(button => button.disabled = false);
}

//Sorting Algorithms

//Bubble Sort
async function bubbleSort() {
  disableButtons();
  document.getElementById("currentAlgorithm").innerText = "Bubble Sort";
  
  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        createBars();
        await new Promise(r => setTimeout(r, 1000 / animationSpeed));
      }
    }
  }

  enableButtons();
}

//Merge Sort
async function mergeSort() {
  disableButtons();
  document.getElementById("currentAlgorithm").innerText = "Merge Sort";
  
  async function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let i = 0; i < n2; i++) R[i] = arr[m + 1 + i];

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
      createBars();
      await new Promise(r => setTimeout(r, 1000 / animationSpeed));
    }

    while (i < n1) {
      arr[k++] = L[i++];
      createBars();
      await new Promise(r => setTimeout(r, 1000 / animationSpeed));
    }

    while (j < n2) {
      arr[k++] = R[j++];
      createBars();
      await new Promise(r => setTimeout(r, 1000 / animationSpeed));
    }
  }

  async function mergeSortHelper(arr, l, r) {
    if (l >= r) return;
    let m = l + Math.floor((r - l) / 2);
    await mergeSortHelper(arr, l, m);//left part
    await mergeSortHelper(arr, m + 1, r);//right part
    await merge(arr, l, m, r);
  }

  await mergeSortHelper(array, 0, array.length - 1);
  enableButtons();
}

//Quick Sort
async function quickSort() {
  disableButtons();
  document.getElementById("currentAlgorithm").innerText = "Quick Sort";
 
  // Explicitly define the swap function
  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) { // Changed < to <= for more stable sorting
        i++;
        swap(arr, i, j);
        createBars();
        await new Promise(r => setTimeout(r, 1000 / animationSpeed));
      }
    }

    swap(arr, i + 1, high);
    createBars();
    await new Promise(r => setTimeout(r, 1000 / animationSpeed));
    return i + 1;
  }

  async function quickSortHelper(arr, low, high) {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  }

  await quickSortHelper(array, 0, array.length - 1);
  enableButtons();
}

// Initial array generation
generateArray();

// Event listeners
// document.getElementById("bubbleSortBtn").addEventListener("click", bubbleSort);
// document.getElementById("mergeSortBtn").addEventListener("click", mergeSort);
// document.getElementById("quickSortBtn").addEventListener("click", quickSort);
// // document.getElementById("generateBtn").addEventListener("click", generateArray);
// document.getElementById("sizeRange").addEventListener("input", generateArray);
// document.getElementById("speedRange").addEventListener("input", updateSpeed);


function toggleComplexityImage() {
  const container = document.getElementById("complexityImageContainer");
  const btn = document.getElementById("showComparisonBtn");

  if (container.style.display === "none") {
    container.style.display = "block";
    btn.innerText = "Hide Time & Space Complexity Comparison";
  } else {
    container.style.display = "none";
    btn.innerText = "Show Time & Space Complexity Comparison";
  }
}



