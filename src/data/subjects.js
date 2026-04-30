export const SUBJECTS = [
  {
    id: 'dbms',
    title: 'DBMS (Database Management)',
    icon: '🗄️',
    description: 'ACID properties, Normalization, Transactions, Concurrency, Indexing.',
    aiPrompt: 'Quiz me on advanced DBMS concepts like B+ trees, isolation levels, and 2-phase locking.',
    detailedNotes: `
# DBMS Core Concepts
Database Management Systems are critical for system design and backend roles.

### 1. ACID Properties
- **Atomicity**: Entire transaction takes place at once or doesn't happen at all.
- **Consistency**: The database must remain in a consistent state before and after the transaction.
- **Isolation**: Multiple transactions occur independently without interference.
- **Durability**: The changes of a successful transaction are permanently stored.

### 2. Normalization
Process of organizing data to minimize redundancy.
- **1NF**: Atomic values, no repeating groups.
- **2NF**: 1NF + no partial dependencies (all non-key attributes depend on the primary key).
- **3NF**: 2NF + no transitive dependencies.
- **BCNF**: Every determinant must be a candidate key.

### 3. Indexing
- **B-Trees / B+ Trees**: Default index structure. B+ trees store all data in leaf nodes with linked lists for fast range queries.
- **Hash Indexes**: O(1) lookup, good for exact matches but bad for range queries.

### 4. Transactions & Concurrency
- **Deadlocks**: Two or more transactions waiting indefinitely for each other.
- **Isolation Levels**: Read Uncommitted, Read Committed, Repeatable Read, Serializable.
`,
    practiceQuestions: [
      {
        q: "What is the difference between TRUNCATE and DELETE?",
        a: "DELETE is a DML command (can be rolled back, logs each row), whereas TRUNCATE is a DDL command (cannot be rolled back easily, deallocates data pages, faster)."
      },
      {
        q: "Explain dirty read, non-repeatable read, and phantom read.",
        a: "Dirty Read: Reading uncommitted data. Non-repeatable read: Reading a row twice and getting different values because another transaction updated it. Phantom read: A query fetching a range of rows gets different counts because another transaction inserted/deleted rows."
      },
      {
        q: "How does a B+ Tree index work?",
        a: "A B+ tree keeps data only in leaf nodes and internal nodes store keys for routing. Leaf nodes are linked, allowing fast sequential range scans."
      }
    ]
  },
  {
    id: 'sql',
    title: 'SQL Queries',
    icon: '📊',
    description: 'Joins, Group By, Window Functions, Subqueries, Optimizations.',
    aiPrompt: 'Give me 3 complex SQL interview questions involving window functions and CTEs. Provide hints before the answers.',
    detailedNotes: `
# SQL & Relational Algebra

### 1. Types of Joins
- **INNER JOIN**: Returns records with matching values in both tables.
- **LEFT JOIN**: Returns all records from the left table, and matched records from the right.
- **RIGHT JOIN**: Returns all records from the right table, and matched records from the left.
- **FULL OUTER JOIN**: Returns all records when there is a match in either left or right table.
- **CROSS JOIN**: Cartesian product of both tables.

### 2. Window Functions
Perform a calculation across a set of table rows that are somehow related to the current row.
- \`ROW_NUMBER()\`: Assigns a unique sequential integer to rows.
- \`RANK()\`: Assigns rank with gaps for ties (1, 2, 2, 4).
- \`DENSE_RANK()\`: Assigns rank without gaps (1, 2, 2, 3).
- \`LEAD() / LAG()\`: Access data from subsequent or previous rows.

### 3. Common Table Expressions (CTEs)
Temporary result set that you can reference within a \`SELECT\`, \`INSERT\`, \`UPDATE\`, or \`DELETE\` statement.
\`\`\`sql
WITH SalesCTE AS (
  SELECT Date, SUM(Amount) as Total FROM Sales GROUP BY Date
)
SELECT * FROM SalesCTE WHERE Total > 1000;
\`\`\`

### 4. Query Optimization
- Avoid \`SELECT *\`.
- Use \`EXPLAIN\` to analyze query plans.
- Create indexes on frequently filtered/joined columns.
`,
    practiceQuestions: [
      {
        q: "Find the 2nd highest salary from an Employee table.",
        a: "Using DENSE_RANK: \`WITH Ranked AS (SELECT Salary, DENSE_RANK() OVER(ORDER BY Salary DESC) as Rnk FROM Employee) SELECT Salary FROM Ranked WHERE Rnk = 2;\` or \`SELECT MAX(Salary) FROM Employee WHERE Salary < (SELECT MAX(Salary) FROM Employee);\`"
      },
      {
        q: "What is the difference between WHERE and HAVING?",
        a: "WHERE filters rows before aggregation (GROUP BY), whereas HAVING filters groups after aggregation."
      },
      {
        q: "Explain the difference between UNION and UNION ALL.",
        a: "UNION combines result sets and removes duplicates (incurs sorting overhead). UNION ALL combines result sets including duplicates (faster)."
      }
    ]
  },
  {
    id: 'webdev',
    title: 'Web Development',
    icon: '🌐',
    description: 'HTML/CSS/JS, React, Node.js, System Architecture, Web Security.',
    aiPrompt: 'Ask me 5 front-end system design questions or tricky JavaScript output questions.',
    detailedNotes: `
# Web Development Core

### 1. JavaScript Execution Context & Event Loop
JS is single-threaded. 
- **Call Stack**: Where execution happens.
- **Web APIs**: Browser APIs like setTimeout, DOM, fetch.
- **Callback Queue (Task Queue)**: Macrotasks (setTimeout).
- **Microtask Queue**: Promises, MutationObserver. (Higher priority than Callback Queue).

### 2. Closures
A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).
- Used for data privacy, currying, and memoization.

### 3. React Concepts
- **Virtual DOM**: In-memory representation of real DOM. React diffs it to minimize actual DOM updates.
- **Hooks**: \`useState\` (state), \`useEffect\` (side effects), \`useMemo\` (cache computation), \`useCallback\` (cache function definition).
- **Reconciliation**: The algorithm React uses to diff one tree with another to determine what needs updating.

### 4. Web Security
- **XSS (Cross-Site Scripting)**: Injecting malicious scripts into web pages. Prevented via sanitization.
- **CSRF (Cross-Site Request Forgery)**: Tricking a user into executing unwanted actions on a site where they are authenticated. Prevented via Anti-CSRF tokens.
- **CORS**: Cross-Origin Resource Sharing. Server explicitly allows origins.
`,
    practiceQuestions: [
      {
        q: "What is event delegation?",
        a: "Attaching a single event listener to a parent element to handle events for multiple child elements, utilizing the event bubbling phase. Improves performance."
      },
      {
        q: "Difference between var, let, and const?",
        a: "\`var\` is function-scoped and hoisted with \`undefined\`. \`let\` and \`const\` are block-scoped and hoisted but reside in the Temporal Dead Zone until initialized. \`const\` cannot be reassigned."
      },
      {
        q: "How does React handle state updates?",
        a: "State updates are asynchronous and batched for performance. React queues the state changes, triggers a re-render, diffs the Virtual DOM, and commits minimal changes to the real DOM."
      }
    ]
  },
  {
    id: 'llms',
    title: 'LLMs & AI',
    icon: '🤖',
    description: 'Transformers, Prompt Engineering, RAG, Fine-tuning, Embeddings.',
    aiPrompt: 'Explain how Retrieval-Augmented Generation (RAG) works in LLMs like I am 5 years old.',
    detailedNotes: `
# Large Language Models (LLMs)

### 1. Transformers Architecture
Introduced in "Attention is All You Need".
- **Self-Attention**: Allows the model to weigh the importance of different words in a sequence regardless of their position.
- **Encoder-Decoder**: BERT is encoder-only (understanding). GPT is decoder-only (generation). T5 uses both.

### 2. Embeddings & Vector Databases
- **Embeddings**: Dense numerical vector representations of text where semantically similar words/sentences are close in vector space.
- **Vector DBs**: Databases (like Pinecone, Milvus, Chroma) optimized for storing embeddings and performing cosine-similarity searches.

### 3. RAG (Retrieval-Augmented Generation)
Addresses LLM hallucinations and knowledge cutoffs.
1. Document is chunked and embedded into a Vector DB.
2. User query is embedded.
3. Top-K similar chunks are retrieved.
4. Chunks are prepended to the prompt as context.
5. LLM generates an answer based on the context.

### 4. Fine-Tuning
- **Full Fine-Tuning**: Updating all weights (expensive).
- **PEFT / LoRA**: Low-Rank Adaptation. Freezes original weights and trains a small, low-rank matrix adapter. Highly memory efficient.
`,
    practiceQuestions: [
      {
        q: "What is the Context Window in LLMs?",
        a: "The maximum number of tokens an LLM can process in a single pass (both input prompt and generated output combined). Memory usage scales quadratically with context length in standard attention."
      },
      {
        q: "Why do LLMs hallucinate, and how do you reduce it?",
        a: "They generate statistically likely text that isn't factually grounded. Reduced via RAG (grounding in retrieved facts), lower temperature, prompt engineering (asking model to cite sources or say 'I don't know')."
      },
      {
        q: "What is Temperature in text generation?",
        a: "A hyperparameter controlling randomness. Lower temperature (e.g., 0.1) makes output deterministic and focused. Higher temperature (e.g., 0.9) makes it more creative and diverse."
      }
    ]
  },
  {
    id: 'os',
    title: 'Operating Systems',
    icon: '💻',
    description: 'Processes, Threads, Deadlocks, Memory Management, Scheduling.',
    aiPrompt: 'Explain the difference between a process and a thread, and how deadlocks occur.',
    detailedNotes: `
# Operating Systems

### 1. Processes vs. Threads
- **Process**: An executing instance of a program. Has its own independent memory space. Heavyweight context switching.
- **Thread**: A path of execution within a process. Shares memory and resources with other threads in the same process. Lightweight context switching.

### 2. Deadlocks
A state where two or more processes are waiting for each other to release resources, causing a freeze.
**Coffman Conditions (all 4 must hold for deadlock):**
1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait

### 3. Memory Management
- **Paging**: Eliminates external fragmentation. Logical memory is divided into Pages, physical memory into Frames. Page Table maps them.
- **Virtual Memory**: Allows execution of processes not entirely in RAM. Uses paging to swap data between RAM and Disk.
- **Thrashing**: When a system spends more time paging/swapping than executing actual instructions.

### 4. CPU Scheduling
- **FCFS**: First Come First Serve.
- **SJF**: Shortest Job First (optimal for average waiting time).
- **Round Robin**: Time quantum based, fair sharing. Good for interactive systems.
`,
    practiceQuestions: [
      {
        q: "What is a Mutex vs. Semaphore?",
        a: "Mutex is a locking mechanism used to synchronize access to a resource (only one thread at a time, ownership required). Semaphore is a signaling mechanism (can allow N threads, no ownership)."
      },
      {
        q: "What is a Context Switch?",
        a: "The process of storing the state of an active thread/process and restoring the state of another. Involves saving registers, program counter, and updating PCB/TCB. Expensive operation."
      },
      {
        q: "Explain Belady's Anomaly.",
        a: "In page replacement algorithms (specifically FIFO), increasing the number of page frames results in an INCREASE in the number of page faults, contrary to intuition."
      }
    ]
  },
  {
    id: 'cn',
    title: 'Computer Networks',
    icon: '📡',
    description: 'OSI Model, TCP/UDP, HTTP/HTTPS, DNS, Load Balancing.',
    aiPrompt: 'Walk me through what happens when I type google.com in the browser.',
    detailedNotes: `
# Computer Networks

### 1. OSI Model
1. **Physical**: Bits over medium (Cables, Hubs).
2. **Data Link**: Frames, MAC Addresses, Switch.
3. **Network**: Packets, IP Addresses, Router.
4. **Transport**: Segments, TCP/UDP, Ports.
5. **Session**: Establish, maintain, terminate sessions.
6. **Presentation**: Data formatting, encryption, compression.
7. **Application**: HTTP, FTP, DNS (where apps interact).

### 2. TCP vs. UDP
- **TCP (Transmission Control Protocol)**: Connection-oriented (3-way handshake), reliable, ordered, error-checked, flow control (congestion avoidance). Slower.
- **UDP (User Datagram Protocol)**: Connectionless, unreliable, no ordering, fast. Used in video streaming, gaming, VoIP.

### 3. Web Protocols
- **HTTP/1.1**: Persistent connections, but suffers from Head-of-Line blocking.
- **HTTP/2**: Multiplexing over a single TCP connection, binary framing, server push.
- **HTTPS**: HTTP over SSL/TLS. Secures data via asymmetric encryption (for handshake) and symmetric encryption (for data transfer).

### 4. DNS (Domain Name System)
Translates human-readable domain names (\`google.com\`) to IP addresses.
- Checks Browser Cache -> OS Cache -> Router Cache -> ISP Resolver -> Root Server -> TLD Server -> Authoritative Name Server.
`,
    practiceQuestions: [
      {
        q: "What happens when you type google.com in your browser?",
        a: "1. DNS lookup to get IP. 2. Browser initiates TCP 3-way handshake. 3. TLS handshake for HTTPS. 4. Browser sends HTTP GET request. 5. Server responds with HTML. 6. Browser renders HTML, fetches CSS/JS."
      },
      {
        q: "What is the TCP 3-Way Handshake?",
        a: "1. SYN (Client -> Server). 2. SYN-ACK (Server -> Client). 3. ACK (Client -> Server). Establishes connection parameters."
      },
      {
        q: "What is the difference between MAC and IP Address?",
        a: "MAC is a physical address assigned to the NIC by the manufacturer (Layer 2, used within local network). IP is a logical address assigned by the network (Layer 3, used across different networks/internet)."
      }
    ]
  }
];
