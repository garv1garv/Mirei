// A2Z Learning Curriculum - 17 Steps with Sub-sections
// Every question ID in questions.js is mapped here
const CHAPTERS = [
  {
    id: 1,
    title: "Learn the Basics",
    icon: null,
    subSections: [
      { title: "Lec 1: Basic Maths", questionIds: [1001, 1002, 1003, 1004] },
      { title: "Lec 2: Basic Recursion & Hashing", questionIds: [1005, 1006] }
    ],
    questionIds: [1001, 1002, 1003, 1004, 1005, 1006],
    content: {
      what: `Before jumping into algorithms, you must master the fundamental building blocks of programming. This step covers Basic Math (GCD, prime generation), Basic Recursion (base cases and recursive trees), and Basic Hashing (using arrays/maps for frequency counting).`,
      whyItMatters: `You cannot optimize an algorithm if you don't confidently understand modulo arithmetic, how recursion uses the call stack, or how Hashing achieves O(1) lookups. These are the absolute prerequisites for all FAANG interviews.`,
      concepts: [
        { term: "Modulo Arithmetic", definition: "(A + B) % M = ((A % M) + (B % M)) % M" },
        { term: "Call Stack", definition: "Memory structure that stores info about active subroutines in a computer program." },
        { term: "Hashing", definition: "Mapping data of arbitrary size to fixed-size values (often indices in an array)." }
      ],
      complexity: [
        { operation: "Euclidean GCD", time: "O(log min(a,b))", space: "O(1)" },
        { operation: "HashMap Lookup", time: "O(1) avg", space: "O(N)" }
      ],
      patterns: [
        { name: "Digit Extraction", description: "While n > 0: digit = n % 10; n = n / 10;", example: "Reverse Integer, Palindrome Number" },
        { name: "Frequency Array", description: "Use arr[val]++ for elements in range 0-N instead of a heavy HashMap.", example: "Counting Sort, Finding duplicates" }
      ],
      tips: [
        "Always handle negative inputs in basic math problems.",
        "Draw out the recursion tree on paper. Don't try to visualize complex recursion exclusively in your head.",
        "In languages like Python, integers have arbitrary precision. In Java/C++, watch out for 32-bit integer overflow!"
      ],
      mistakes: [
        "Infinite recursion due to missing base condition.",
        "Integer overflow: doing sum = a + b instead of using Long or modulo."
      ],
      codeTemplates: [
        { name: "Extract Digits (Math)", language: "General", code: "int num = 1234;\nwhile (num > 0) {\n    int digit = num % 10;\n    // Process digit\n    num /= 10;\n}" },
        { name: "Frequency Hashing", language: "C++ / Java", code: "int[] hash = new int[100]; // Assuming max value is 99\nfor (int val : arr) {\n    hash[val]++;\n}" }
      ],
      keywords: [
        { keyword: "digits of a number", pattern: "Modulo 10 Extraction" },
        { keyword: "count occurrences", pattern: "HashMap / Frequency Array" },
        { keyword: "generate combinations", pattern: "Backtracking / Recursion" }
      ],
      resources: [
        { name: "Take U Forward: Learn Basic Math", type: "Article", time: "10 mins", url: "https://takeuforward.org/maths/reverse-a-number/" },
        { name: "Striver's A2Z DSA Course - Basics", type: "Video", time: "25 mins", url: "https://www.youtube.com/watch?v=1pkOgXD63yU" }
      ]
    }
  },
  {
    id: 2,
    title: "Sorting Techniques",
    icon: null,
    subSections: [
      { title: "Lec 1: Sorting I (Merge & Quick Sort)", questionIds: [2001, 2002] },
      { title: "Lec 2: Sorting II (Advanced)", questionIds: [2003] }
    ],
    questionIds: [2001, 2002, 2003],
    content: {
      what: `Sorting algorithms arrange elements in a sequence according to a condition (ascending/descending). We cover O(N^2) sorts (Selection, Bubble, Insertion) and O(N log N) sorts (Merge Sort, Quick Sort).`,
      whyItMatters: `While you rarely write sorting algorithms from scratch in production, interviewers often ask you to modify sorting logic (e.g., finding inversion counts using Merge Sort or finding the Kth largest element using Quick Select).`,
      concepts: [
        { term: "Stable Sort", definition: "Maintains the relative order of records with equal keys." },
        { term: "In-place Sort", definition: "Requires exactly O(1) extra space." },
        { term: "Divide & Conquer", definition: "Breaking a problem into smaller sub-problems, solving recursively, and combining." }
      ],
      complexity: [
        { operation: "Merge Sort", time: "O(N log N)", space: "O(N)" },
        { operation: "Quick Sort", time: "O(N log N) avg, O(N^2) worst", space: "O(log N)" },
        { operation: "Insertion Sort", time: "O(N^2)", space: "O(1)" }
      ],
      patterns: [
        { name: "Divide and Conquer", description: "Split array in half, recurse, merge.", example: "Merge Sort, Count Inversions" },
        { name: "Partitioning", description: "Pick a pivot and rearrange elements so everything left is smaller, everything right is larger.", example: "Quick Sort, Quick Select" }
      ],
      tips: [
        "Merge Sort is stable; Quick Sort is generally not.",
        "Quick Sort is often faster in practice due to better cache locality.",
        "Use Insertion Sort for very small arrays (N < 16) — it has practically zero overhead."
      ],
      mistakes: [
        "Choosing a bad pivot in Quick Sort leading to O(N^2) worst-case time.",
        "Off-by-one errors when merging arrays."
      ]
    }
  },
  {
    id: 3,
    title: "Arrays",
    icon: null,
    subSections: [
      { title: "Easy", questionIds: [1, 2, 3, 20, 27, 28, 37, 38, 41, 42, 45] },
      { title: "Medium", questionIds: [4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 29, 31, 32, 33, 34, 39, 43, 44, 46, 47, 48, 49, 50] },
      { title: "Hard", questionIds: [11, 12, 26, 30, 35, 36, 40] }
    ],
    questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    content: {
      what: `Arrays are contiguous memory structures. This core step ranges from Easy (largest element, rotate array) to Medium (Two Sum, Kadane's, Dutch National Flag) to Hard (Pascal's Triangle, 4Sum, Missing/Repeating logic).`,
      whyItMatters: `Arrays form the largest chunk of coding interviews. Around 40-50% of FAANG interviews start with or heavily feature an Array question. Mastery here guarantees you can clear initial rounds.`,
      concepts: [
        { term: "Contiguous Memory", definition: "All elements sit right next to each other in RAM." },
        { term: "In-place Modification", definition: "Modifying the array without using an extra array of size O(N)." }
      ],
      complexity: [
        { operation: "Access", time: "O(1)", space: "-" },
        { operation: "Linear Search", time: "O(N)", space: "-" }
      ],
      patterns: [
        { name: "Kadane's Algorithm", description: "Keep track of current subarray sum and max subarray sum. Reset current sum to 0 if it goes below 0.", example: "Maximum Subarray" },
        { name: "Dutch National Flag", description: "3-way partitioning using low, mid, and high pointers.", example: "Sort Colors" },
        { name: "Moore's Voting Algorithm", description: "Find majority element by incrementing/decrementing a counter.", example: "Majority Element" }
      ],
      tips: [
        "If the array is sorted, immediately think Binary Search or Two Pointers.",
        "If you need an O(N) solution for subarray sums, think Prefix Sum or HashMap + Prefix Sum.",
        "For O(1) space array transformations, think about using bits or array values as indices."
      ],
      mistakes: [
        "Modifying array length during iteration.",
        "Forgetting to sort the array before applying a Two Pointer approach."
      ]
    }
  },
  {
    id: 4,
    title: "Binary Search",
    icon: null,
    subSections: [
      { title: "BS on 1D Arrays", questionIds: [186, 187, 188, 191, 192, 193, 197, 198, 207, 208] },
      { title: "BS on 2D Arrays", questionIds: [189, 190, 195, 209] },
      { title: "BS on Answers", questionIds: [194, 196, 199, 200, 201, 202, 203, 204, 205, 206, 210] }
    ],
    questionIds: [186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210],
    content: {
      what: `Binary Search algorithms halve the search space at each step. This step moves from 1D Arrays to 2D Matrices, and finally to 'BS on Answers' where you binary search a theoretical value range.`,
      whyItMatters: `When an interviewer asks to optimize an O(N) array lookup, the answer is almost always O(log N) through Binary Search. 'BS on Answer' is a highly favored tricky interview concept.`,
      concepts: [
        { term: "Search Space", definition: "The complete range where the answer could reside." },
        { term: "Monotonicity", definition: "A sequence that is entirely non-increasing or non-decreasing. Required for BS." }
      ],
      complexity: [
        { operation: "Standard Binary Search", time: "O(log N)", space: "O(1)" },
        { operation: "BS on Answer", time: "O(N log(Max Range))", space: "O(1)" }
      ],
      patterns: [
        { name: "Rotated Array", description: "Check which half is perfectly sorted, and see if the target lies there.", example: "Search in Rotated Sorted Array" },
        { name: "BS on Answer", description: "Define a range [low, high]. Check if 'mid' satisfies constraints using a helper function. Adjust range.", example: "Koko Eating Bananas, Book Allocation" }
      ],
      tips: [
        "To avoid integer overflow, compute mid as: left + (right - left) / 2.",
        "Always trace a 2-element array example manually to check your while loop condition (while left <= right vs left < right)."
      ],
      mistakes: [
        "Failing to exit the loop (infinite loop) due to wrong mid calculation.",
        "Using BS on arrays that are not monotonic (sorted)."
      ]
    }
  },
  {
    id: 5,
    title: "Strings",
    icon: null,
    subSections: [
      { title: "Basic", questionIds: [51, 52, 54, 62, 63, 64, 69, 70, 71, 72, 74] },
      { title: "Medium", questionIds: [53, 55, 56, 58, 59, 60, 61, 65, 68, 73, 75, 76, 77, 78, 79, 80, 83, 84, 85, 86, 87, 89] },
      { title: "Hard", questionIds: [57, 66, 67, 81, 82, 88, 90] }
    ],
    questionIds: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    content: {
      what: `Strings handle textual data. Often treated as character arrays, strings feature pattern matching, substrings, and palindromic derivations.`,
      whyItMatters: `String parsing and manipulation are heavily tested. Substring questions directly integrate with Sliding Window techniques.`,
      concepts: [
        { term: "Immutability", definition: "In Java/Python, strings can't be changed. Creating a new string is O(N)." },
        { term: "Substring", definition: "Contiguous portion of a string." }
      ],
      complexity: [
        { operation: "Concatenation (Immutable)", time: "O(N)", space: "O(N)" },
        { operation: "StringBuilder Append", time: "O(1) amortized", space: "O(1)" }
      ],
      patterns: [
        { name: "Character Map", description: "Use ASCII array int[128] or int[26] instead of general HashMaps for performance.", example: "Valid Anagram" },
        { name: "Palindrome Expansion", description: "To find palindromes, expand outwards from every character (and between every character).", example: "Longest Palindromic Substring" }
      ],
      tips: [
        "Use character arrays or StringBuilders for frequent modifications.",
        "For substring problems, immediately think of the Sliding Window template."
      ],
      mistakes: [
        "Concatenating strings inside a loop in Java/Python (results in O(N^2) time!).",
        "Conflating Substrings (contiguous) with Subsequences (non-contiguous)."
      ]
    }
  },
  {
    id: 6,
    title: "Linked List",
    icon: null,
    subSections: [
      { title: "Lec 1: Single Linked List", questionIds: [161, 162, 163, 164, 176, 177, 180, 181, 183] },
      { title: "Lec 2: Doubly LL & Medium Problems", questionIds: [166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 182, 184, 185] },
      { title: "Lec 3: Hard Problems", questionIds: [165, 178, 179] }
    ],
    questionIds: [161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185],
    content: {
      what: `A non-contiguous data structure where each node points to the next. Covers 1D, Doubly LL, and fast/slow pointer algorithms.`,
      whyItMatters: `Linked Lists explicitly test your ability to manage pointers and manual memory references. Extremely common in Microsoft and Amazon interviews.`,
      concepts: [
        { term: "Dummy Node", definition: "A fake head initialized before the real head to simplify edge cases (like inserting at the start)." },
        { term: "Tortoise and Hare", definition: "A slow and fast pointer moving at different speeds." }
      ],
      complexity: [
        { operation: "Head Insert", time: "O(1)", space: "O(1)" },
        { operation: "Search", time: "O(N)", space: "O(1)" }
      ],
      patterns: [
        { name: "Fast/Slow Pointer", description: "Slow moves 1 step, Fast moves 2. Used to find cycles or the middle element.", example: "Linked List Cycle, Find Middle" },
        { name: "In-Place Reversal", description: "Iterate with Prev, Curr, Next pointers and flip arrows.", example: "Reverse Linked List" }
      ],
      tips: [
        "Always ask if you can use extra space, or if the modifications must be purely in-place.",
        "When reversing or deleting, heavily use a whiteboard or paper to draw where arrows should point."
      ],
      mistakes: [
        "Null Pointer Exceptions: Forgetting to check if current Node or its Next is null before accessing parameters.",
        "Losing the head reference entirely during operations."
      ]
    }
  },
  {
    id: 7,
    title: "Recursion & Backtracking",
    icon: null,
    subSections: [
      { title: "Subsequences Pattern", questionIds: [411, 412, 415, 416, 417, 418] },
      { title: "Permutations & Combinations", questionIds: [413, 414, 419, 426, 427, 428, 429, 430] },
      { title: "Hard Backtracking", questionIds: [420, 421, 422, 423, 424, 425, 431, 432, 433, 434, 435] }
    ],
    questionIds: [411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435],
    content: {
      what: `Solving a larger problem by defining it in terms of itself. Moves from basic base cases to Subsequences and Backtracking combinations.`,
      whyItMatters: `Recursion is the mandatory gateway to Trees, Graphs, and Dynamic Programming. Without mastering the recursion tree, DP is impossible.`,
      concepts: [
        { term: "Base Case", definition: "The condition that stops the recursion." },
        { term: "Backtracking", definition: "Doing a choice, recursing, then undoing the choice to explore other paths." }
      ],
      complexity: [
        { operation: "Subsets (include/exclude)", time: "O(2^N)", space: "O(N)" },
        { operation: "Permutations", time: "O(N!)", space: "O(N)" }
      ],
      patterns: [
        { name: "Pick / Not Pick", description: "At each element, make 2 recursive calls: one including it, one omitting it.", example: "Subsets" },
        { name: "Looping Backtrack", description: "Use a for-loop inside the recursive function to try placing elements at specific positions.", example: "Permutations, N-Queens" }
      ],
      tips: [
        "If a problem asks for 'all possible ways/combinations', it implies Backtracking.",
        "Visualize recursion strictly as a tree. Nodes are states, edges are choices."
      ],
      mistakes: [
        "Forgetting to UN-DO a choice in Backtracking (e.g. popping from the tracking list).",
        "Passing lists by reference instead of creating deep copies when saving valid combinations."
      ]
    }
  },
  {
    id: 8,
    title: "Bit Manipulation",
    icon: null,
    subSections: [
      { title: "Concepts & Easy", questionIds: [456, 459, 460, 461, 462, 463] },
      { title: "Medium & Interview Problems", questionIds: [457, 458, 464, 465, 466, 467, 468, 469, 470] }
    ],
    questionIds: [456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470],
    content: {
      what: `Operating on numbers at the binary zero-and-one level. Utilizes operators like AND (&), OR (|), XOR (^), and shifts (<<, >>).`,
      whyItMatters: `Appears frequently in optimal solutions to Array or Math problems (e.g., finding the odd-occurring element in O(1) space).`,
      concepts: [
        { term: "XOR (^)", definition: "Returns 1 if bits are different. A ^ A = 0. A ^ 0 = A." },
        { term: "Bitmask", definition: "Using integer bits to represent a boolean array representing subsets." }
      ],
      complexity: [
        { operation: "Check ith Bit", time: "O(1)", space: "O(1)" },
        { operation: "Clear lowest set bit", time: "O(1)", space: "O(1)" }
      ],
      patterns: [
        { name: "Brian Kernighan's Algorithm", description: "n = n & (n - 1) removes the lowest set bit.", example: "Count Set Bits, Power of Two" },
        { name: "XOR Cancellation", description: "Because identical elements cancel out via XOR, XORing an entire array helps isolate unique items.", example: "Single Number" }
      ],
      tips: [
        "Use 1 << i to create a mask with only the ith bit set.",
        "Check if ith bit is set: if ((N & (1 << i)) != 0)"
      ],
      mistakes: [
        "Operator precedence issues. Bitwise operators have relatively low precedence, always put them in parentheses! e.g., (A & B) == 0."
      ]
    }
  },
  {
    id: 9,
    title: "Stack & Queues",
    icon: null,
    subSections: [
      { title: "Learning", questionIds: [136, 137, 151, 152, 153, 154] },
      { title: "Monotonic Stack", questionIds: [140, 141, 144, 145, 146, 147, 149, 155, 156, 160] },
      { title: "Hard / Implementation", questionIds: [138, 139, 142, 143, 148, 150, 157, 158, 159] }
    ],
    questionIds: [136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160],
    content: {
      what: `LIFO (Stack) and FIFO (Queue) logic arrays. Focuses on Monotonic variants, conversion between types, and applications in implementation interfaces.`,
      whyItMatters: `Monotonic Stacks are highly notorious in interviews for being completely unintuitive until you learn the specific pattern.`,
      concepts: [
        { term: "LIFO", definition: "Last In First Out. Pop retrieves the most recently pushed item." },
        { term: "Monotonic Stack", definition: "A stack whose elements are strictly increasing or strictly decreasing." }
      ],
      complexity: [
        { operation: "Push/Pop", time: "O(1)", space: "O(1)" },
        { operation: "Monotonic Processing", time: "O(N) total", space: "O(N)" }
      ],
      patterns: [
        { name: "Next Greater Element", description: "Use Monotonic decreasing stack. When you see a bigger element, pop the stack and set Answers.", example: "Daily Temperatures" }
      ],
      tips: [
        "If a problem asks to find the 'next largest' or 'closest smaller' elements in an array, immediately think Monotonic Stack.",
        "A queue can be elegantly implemented using exactly two stacks."
      ],
      mistakes: [
        "Popping an empty stack. Always check !stack.isEmpty() first.",
        "Not seeing that pushing indices into the array is usually better than pushing the literal values."
      ]
    }
  },
  {
    id: 10,
    title: "Sliding Window & Two Pointers",
    icon: null,
    subSections: [
      { title: "Two Pointers", questionIds: [111, 112, 113, 114, 125, 126, 129] },
      { title: "Sliding Window", questionIds: [115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 127, 128, 130, 131, 132, 133, 134, 135] }
    ],
    questionIds: [111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135],
    content: {
      what: `Using two boundary trackers across an array to avoid O(N^2) brute force nested loops. Covers both fixed-size windows and flexibly resizing windows.`,
      whyItMatters: `Extremely popular optimal solutions for constraints requiring O(N) sequential subarray metrics.`,
      concepts: [
        { term: "Fixed Size", definition: "The j-i distance is always K. We add one element and remove one element concurrently." },
        { term: "Variable Size", definition: "Expand right bound (i) to fit condition, then shrink left bound (j) if condition is broken." }
      ],
      complexity: [
        { operation: "Window Sliding", time: "O(N) Amortized", space: "O(1) to O(K) maps" }
      ],
      patterns: [
        { name: "Valid/Invalid State", description: "Expand R while state is valid. The moment state is invalid, increment L until valid again.", example: "Longest Subarray with at most K distinct chars" }
      ],
      tips: [
        "In variable-length max-window problems, the window strictly grows or shifts, it never shrinks inside the optimal implementation.",
        "Usually paired with a HashMap keeping track of current window characters."
      ],
      mistakes: [
        "Using a nested loop resulting in O(N^2) instead of a properly maintained left-pointer leading to tight O(N)."
      ]
    }
  },
  {
    id: 11,
    title: "Heaps",
    icon: null,
    subSections: [
      { title: "Learning & Easy", questionIds: [261, 262, 263, 270, 275] },
      { title: "Medium Problems", questionIds: [264, 268, 269, 271, 272, 274, 276, 277] },
      { title: "Hard Problems", questionIds: [265, 266, 267, 273, 278, 279, 280] }
    ],
    questionIds: [261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280],
    content: {
      what: `Priority queues where the root guarantees the highest/lowest attribute element. Used heavily for Top-K queries.`,
      whyItMatters: `Standard arrays take O(N log N) to sort fully. Heaps allow streaming and maintaining the top K parameters dynamically in O(N log K) time.`,
      concepts: [
        { term: "Min-Heap", definition: "Parent nodes are strictly less than their children." },
        { term: "Amortization", definition: "Heapify array in entirely O(N) time instead of pushing one by one." }
      ],
      complexity: [
        { operation: "Insert", time: "O(log N)", space: "O(1)" },
        { operation: "Extract-Min/Max", time: "O(log N)", space: "O(1)" },
        { operation: "Get-Min/Max", time: "O(1)", space: "O(1)" }
      ],
      patterns: [
        { name: "Top K Elements", description: "Maintain a Min-Heap of size K. For each element, insert it and pop the min if heap size > K. You are left with exactly the K largest elements.", example: "Kth Largest Element" },
        { name: "Two Heaps", description: "Maintain one Max-Heap for the left side and one Min-Heap for right side.", example: "Find Median from Data Stream" }
      ],
      tips: [
        "In Java, PriorityQueue is Min-Heap by default. Use Collections.reverseOrder() for Max-Heap.",
        "In Python, heapq only provides Min-Heap natively. Trick: push negative values for a Max-Heap."
      ],
      mistakes: [
        "Oversizing the heap. If asked for K elements, never let heap size exceed K."
      ]
    }
  },
  {
    id: 12,
    title: "Greedy Algorithms",
    icon: null,
    subSections: [
      { title: "Easy", questionIds: [436, 437, 438, 440, 444] },
      { title: "Medium / Hard", questionIds: [439, 441, 442, 443, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455] }
    ],
    questionIds: [436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455],
    content: {
      what: `Algorithm paradigms that make locally optimal choices at each stage with the hope of finding a global optimum. Usually combined with sorting.`,
      whyItMatters: `When applicable, Greedy algorithms perform significantly better than Dynamic Programming solutions. Knowing when Greedy fails is just as important.`,
      concepts: [
        { term: "Local Optimum", definition: "The best choice right now in front of you." },
        { term: "Global Optimum", definition: "The optimal, correct answer for the entire dataset." }
      ],
      complexity: [
        { operation: "Typical Greedy pass", time: "O(N log N) (due to sorting)", space: "O(1)" }
      ],
      patterns: [
        { name: "Intervals - Sort by End Time", description: "When fitting maximize non-overlapping events.", example: "Non-overlapping Intervals" },
        { name: "Jump Tracking", description: "Track furthest reachable index and update current limit boundaries.", example: "Jump Game" }
      ],
      tips: [
        "Whenever given intervals or scheduling goals, immediately sort them. Sort by end-time if picking non-overlapping quantities. Sort by start-time if merging.",
        "If a greedy approach naturally fails in edge cases, you likely need Dynamic Programming."
      ],
      mistakes: [
        "Using Greedy for subset inclusion configurations (e.g. 0/1 Knapsack fails Greedy but works for Fractional)."
      ]
    }
  },
  {
    id: 13,
    title: "Binary Trees",
    icon: null,
    subSections: [
      { title: "Traversals", questionIds: [211, 212, 213, 214, 215, 216, 217, 218, 241, 242, 243, 248, 249, 254, 255] },
      { title: "Medium Problems", questionIds: [219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 236, 237, 238, 240, 244, 245, 246, 250, 251, 252, 253, 256, 257, 258, 259, 260] },
      { title: "Hard Problems", questionIds: [233, 234, 235, 239, 247] }
    ],
    questionIds: [211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260],
    content: {
      what: `Hierarchical acyclic structures where each node has at most two children. Focuses on traversals (In, Pre, Post, Level order) and recursive definitions.`,
      whyItMatters: `Tree algorithms are universally requested. Traversing and altering trees tests complete confidence with Recursive programming.`,
      concepts: [
        { term: "DFS", definition: "Depth-first search. Goes down to the leaves before looking at neighbors." },
        { term: "BFS", definition: "Breadth-first search. Looks horizontally tier by tier (Level Order)." }
      ],
      complexity: [
        { operation: "Traversal", time: "O(N)", space: "O(H) recursion stack" }
      ],
      patterns: [
        { name: "Bottom-Up DFS", description: "Recurse entirely to leaves, return constraints upwards to compute answers.", example: "Diameter of Binary Tree, LCA" },
        { name: "Level Order Queue", description: "Iterative queue logic where size specifies elements per tier.", example: "Binary Tree Right Side View" }
      ],
      tips: [
        "Inorder traversal of a BST yields a fully sorted array.",
        "Post-order is critical for algorithms where a node needs info from its children before computing its own metric."
      ],
      mistakes: [
        "Assuming a tree is balanced. Time complexities can devolve to O(N) if the tree is a skewed straight line."
      ]
    }
  },
  {
    id: 14,
    title: "Hash Map",
    icon: null,
    subSections: [
      { title: "Easy & Fundamentals", questionIds: [91, 95, 96, 97, 98, 100, 104, 107] },
      { title: "Medium & Design", questionIds: [92, 93, 94, 99, 101, 102, 106, 109, 110] },
      { title: "Hard", questionIds: [103, 105, 108] }
    ],
    questionIds: [91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    content: {
      what: `Hash Maps provide O(1) average lookup, insert, and delete. This chapter covers fundamental hash-based patterns from frequency counting to LRU/LFU cache design.`,
      whyItMatters: `Nearly every optimal solution uses a HashMap under the hood. Mastering map-based patterns is non-negotiable for FAANG rounds.`,
      concepts: [
        { term: "Hash Function", definition: "Maps keys to array indices. Collisions handled via chaining or open addressing." },
        { term: "Load Factor", definition: "Ratio of entries to bucket count. High load factor = more collisions." }
      ],
      complexity: [
        { operation: "Insert/Lookup/Delete", time: "O(1) avg", space: "O(N)" }
      ],
      patterns: [
        { name: "Frequency Count", description: "Count occurrences of each element using a map.", example: "Top K Frequent Elements" },
        { name: "Two-Sum Pattern", description: "Store complement values in map for O(N) pair finding.", example: "Two Sum" }
      ],
      tips: [
        "When you need O(1) lookup, always consider a HashMap first.",
        "For ordered keys, use TreeMap (Java) or sorted containers."
      ],
      mistakes: [
        "Not handling hash collisions in custom implementations.",
        "Using mutable objects as keys."
      ]
    }
  },
  {
    id: 15,
    title: "Graphs",
    icon: null,
    subSections: [
      { title: "BFS / DFS", questionIds: [281, 282, 283, 294, 295, 296, 297, 298, 308, 312, 313, 317, 319, 320, 321, 323, 325, 326] },
      { title: "Topological Sort & Cycle Detection", questionIds: [284, 285, 286, 309, 310, 327, 328] },
      { title: "Shortest Path Algorithms", questionIds: [299, 300, 301, 302, 303, 304, 311, 314, 316, 322, 329, 330] },
      { title: "Union Find / MST", questionIds: [287, 288, 289, 290, 291, 305, 306, 307, 315, 324] },
      { title: "Other Graph Problems", questionIds: [292, 293, 318] }
    ],
    questionIds: [281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330],
    content: {
      what: `Non-linear data structures consisting of nodes and edges connecting them. Tracks directed, undirected, unweighted, or weighted edges.`,
      whyItMatters: `Standard algorithms for mapping real-world network dependencies, routing schemas, pathfinding, and geographical structures.`,
      concepts: [
        { term: "Adjacency List", definition: "An array of lists mapped to connections." },
        { term: "Indegree", definition: "Number of edges pointing strictly 'in' to a node." }
      ],
      complexity: [
        { operation: "BFS/DFS", time: "O(V + E)", space: "O(V)" },
        { operation: "Dijkstra (PQ)", time: "O(E log V)", space: "O(V)" }
      ],
      patterns: [
        { name: "Topological Sort", description: "Kahn's algo: Compute indegrees. Process queue of 0-indegree nodes. Removes dependencies.", example: "Course Schedule" },
        { name: "Shortest Path", description: "Use BFS for uniform unweighted paths. Use Dijkstra for weighted graphs strictly without negative edges.", example: "Network Delay Time" }
      ],
      tips: [
        "Always maintain a strictly observed 'visited' array/set to prevent endless cycles.",
        "A matrix grid is fundamentally a graph with strict 4-directional implicit edge connections."
      ],
      mistakes: [
        "Using DFS to find lengths of shortest paths - never optimal."
      ]
    }
  },
  {
    id: 16,
    title: "Dynamic Programming",
    icon: null,
    subSections: [
      { title: "1D DP", questionIds: [331, 355, 356, 362, 363, 364, 386, 387, 390] },
      { title: "2D / Grid DP", questionIds: [341, 342, 343, 344, 345, 384, 388, 391, 392, 393, 394] },
      { title: "Strings DP (LCS, Edit Distance)", questionIds: [334, 335, 348, 349, 365, 369, 370, 371, 372, 373, 374] },
      { title: "Subsequences / Knapsack", questionIds: [332, 333, 336, 337, 338, 339, 340, 366, 367, 368, 385, 389, 399, 407] },
      { title: "Stock Buy & Sell", questionIds: [360, 361] },
      { title: "Interval / Game DP", questionIds: [346, 347, 350, 351, 352, 353, 354, 357, 358, 359, 375, 376, 377, 395, 396, 404, 405] },
      { title: "Hard / Miscellaneous DP", questionIds: [378, 379, 380, 381, 382, 383, 397, 398, 400, 401, 402, 403, 406, 408, 409, 410] }
    ],
    questionIds: [331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410],
    content: {
      what: `Breaking down heavy problems into overlapping subproblems, memoizing/caching previous results so you never compute state variants twice.`,
      whyItMatters: `Often the hardest coding interview category. Differentiates a truly elite candidate from a standard one. Heavily required in HFTs and FAANG.`,
      concepts: [
        { term: "Memoization (Top-Down)", definition: "Recursion with cache. Best for sparse state access." },
        { term: "Tabulation (Bottom-Up)", definition: "Loop-based array filling. Better absolute performance and eliminates call-stack limits." }
      ],
      complexity: [
        { operation: "State Processing", time: "O(Num States * Decisions)", space: "O(Num States)" }
      ],
      patterns: [
        { name: "1D DP", description: "State solely depends on previous 1/2 indices.", example: "Climbing Stairs, House Robber" },
        { name: "2D Grid DP", description: "DP array represents a physical coordinate tracking.", example: "Unique Paths" },
        { name: "0/1 Knapsack", description: "Inclusion/Exclusion against limits, tracked per item and cumulative weights.", example: "Partition Equal Subset Sum" },
        { name: "String LCS", description: "Evaluating overlapping prefix subsets of dual strings.", example: "Longest Common Subsequence" }
      ],
      tips: [
        "Always code the recursive back-tracker first! Then map the states inside it to the DP keys.",
        "If you only look back 1 or 2 steps (like Fibonacci), you can space-optimize from O(N) to O(1)."
      ],
      mistakes: [
        "Rushing arrays instead of defining states precisely (i.e. 'What strictly does dp[i][j] define?')."
      ]
    }
  },
  {
    id: 17,
    title: "Tries & Math",
    icon: null,
    subSections: [
      { title: "Trie Problems", questionIds: [471, 472, 473, 474, 475, 476, 477, 478, 479, 480] },
      { title: "Math Problems", questionIds: [481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495] }
    ],
    questionIds: [471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495],
    content: {
      what: `Tries (Prefix Trees) are multi-way string character-oriented tree data structures. Math problems test number theory, combinatorics, and modular arithmetic.`,
      whyItMatters: `Tries are standard for anything 'auto-complete' or strict word/dictionary matching. Math skills are foundational and appear across all categories.`,
      concepts: [
        { term: "TrieNode", definition: "Contains a marker isEnd and an array of 26 references pointing backwards into the struct." },
        { term: "Modular Arithmetic", definition: "(a*b) % m = ((a%m) * (b%m)) % m — prevents overflow in competitive programming." }
      ],
      complexity: [
        { operation: "Trie Word Process", time: "O(L) string length", space: "O(L)" },
        { operation: "Sieve of Eratosthenes", time: "O(N log log N)", space: "O(N)" }
      ],
      patterns: [
        { name: "Word Search Grid", description: "Using Trie + Matrix DFS heavily truncates state pathways.", example: "Word Search II" },
        { name: "Prime Generation", description: "Sieve to generate all primes up to N efficiently.", example: "Count Primes" }
      ],
      tips: [
        "Implementation relies purely on 26-slot Arrays inside classes instead of normal references.",
        "For large number problems, always consider modular arithmetic to prevent overflow."
      ],
      mistakes: [
        "Not flagging end of words cleanly leading to ghost prefixes.",
        "Integer overflow in math problems — always think about bounds."
      ]
    }
  }
];

export default CHAPTERS;
