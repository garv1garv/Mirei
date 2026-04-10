// Code execution utilities — supports Python, JavaScript, TypeScript, C, Go stubs

let pyodide = null;
let pyodideLoading = false;
let pyodideReady = false;

export async function loadPyodideRuntime() {
  if (pyodideReady) return pyodide;
  if (pyodideLoading) {
    while (!pyodideReady) {
      await new Promise(r => setTimeout(r, 100));
    }
    return pyodide;
  }
  
  pyodideLoading = true;
  
  try {
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    
    pyodide = await window.loadPyodide();
    pyodideReady = true;
    return pyodide;
  } catch (e) {
    pyodideLoading = false;
    throw new Error('Failed to load Pyodide: ' + e.message);
  }
}

export async function runPython(code, testInput = '') {
  try {
    const py = await loadPyodideRuntime();
    
    py.runPython(`
import sys
from io import StringIO
_old_stdout = sys.stdout
_old_stderr = sys.stderr
sys.stdout = _captured_stdout = StringIO()
sys.stderr = _captured_stderr = StringIO()
`);
    
    if (testInput) {
      py.runPython(`sys.stdin = StringIO(${JSON.stringify(testInput)})`);
    }
    
    const startTime = performance.now();
    py.runPython(code);
    const elapsed = performance.now() - startTime;
    
    const stdout = py.runPython('_captured_stdout.getvalue()');
    const stderr = py.runPython('_captured_stderr.getvalue()');
    
    py.runPython(`
sys.stdout = _old_stdout
sys.stderr = _old_stderr
`);
    
    return {
      output: stdout.trim(),
      error: stderr || null,
      time: elapsed
    };
  } catch (e) {
    return {
      output: '',
      error: e.message,
      time: 0
    };
  }
}

export function runJavaScript(code) {
  const logs = [];
  const errors = [];
  
  const fakeConsole = {
    log: (...args) => logs.push(args.map(a => 
      typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
    ).join(' ')),
    error: (...args) => errors.push(args.join(' ')),
    warn: (...args) => logs.push('[WARN] ' + args.join(' ')),
    info: (...args) => logs.push(args.join(' ')),
    table: (data) => logs.push(JSON.stringify(data, null, 2)),
    dir: (obj) => logs.push(JSON.stringify(obj, null, 2)),
    assert: (cond, ...args) => { if (!cond) errors.push('Assertion failed: ' + args.join(' ')); },
    time: () => {},
    timeEnd: () => {},
    clear: () => {},
  };
  
  try {
    const startTime = performance.now();
    new Function('console', code)(fakeConsole);
    const elapsed = performance.now() - startTime;
    
    return {
      output: logs.join('\n'),
      error: errors.length > 0 ? errors.join('\n') : null,
      time: elapsed
    };
  } catch (e) {
    return {
      output: logs.join('\n'),
      error: `${e.name}: ${e.message}`,
      time: 0
    };
  }
}

export function runTypeScript(code) {
  // Simple TS → JS transpiler: strip type annotations and compile
  try {
    let jsCode = code;
    // Remove type annotations
    jsCode = jsCode.replace(/:\s*\w+(\[\])?\s*(=)/g, ' $2');  // let x: number = 5
    jsCode = jsCode.replace(/:\s*\w+(\[\])?\s*(;|\)|\,)/g, '$2');  // (x: number) or let x: number;
    jsCode = jsCode.replace(/:\s*\w+(\[\])?\s*$/gm, '');  // trailing type
    jsCode = jsCode.replace(/<\w+(\[\])?>/g, '');  // generics <number>
    jsCode = jsCode.replace(/\bas\s+\w+/g, '');  // type assertions
    jsCode = jsCode.replace(/\binterface\s+\w+\s*\{[^}]*\}/g, '');  // interface
    jsCode = jsCode.replace(/\btype\s+\w+\s*=\s*[^;]+;/g, '');  // type alias
    jsCode = jsCode.replace(/\benum\s+\w+\s*\{[^}]*\}/g, '');  // enum
    return runJavaScript(jsCode);
  } catch (e) {
    return {
      output: '',
      error: `TypeScript Error: ${e.message}\n\nNote: Only basic TypeScript is supported. Complex types, generics, and decorators may not work.`,
      time: 0
    };
  }
}

export async function runPiston(code, language, testInput = '') {
  const versions = {
    cpp: "10.2.0",
    java: "15.0.2",
    go: "1.16.2",
    rust: "1.68.2"
  };
  
  const startTime = performance.now();
  try {
    const payload = {
      language: language,
      version: versions[language] || "*",
      files: [{ content: code }]
    };
    if (testInput) payload.stdin = testInput;

    const res = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const elapsed = performance.now() - startTime;
    
    if (data.compile && data.compile.code !== 0) {
      return { output: '', error: data.compile.output, time: elapsed };
    }
    
    if (data.run && data.run.code !== 0) {
      return { output: data.run.stdout, error: data.run.stderr || data.run.output, time: Math.max(elapsed, 10) };
    }
    
    return { output: data.run ? data.run.output : '', error: null, time: Math.max(elapsed, 10) };
  } catch(e) {
    return { output: '', error: `Remote Execution Engine Failed: ${e.message}.\nPlease check your internet connection or try a local language (Python/JS).`, time: 0 };
  }
}

export async function runCode(code, language, testInput = '') {
  switch (language) {
    case 'python':
      return await runPython(code, testInput);
    case 'javascript':
      // Javascript runs locally, we don't have a stdin mock easily, but we'll leave it as is 
      // since the user might use console.log
      return runJavaScript(code);
    case 'typescript':
      return runTypeScript(code);
    case 'java':
    case 'cpp':
    case 'go':
    case 'rust':
      return await runPiston(code, language, testInput);
    default:
      return { output: '', error: 'Unknown language execution not supported.', time: 0 };
  }
}

// Supported languages metadata
export const LANGUAGES = [
  { id: 'python', name: 'Python 3', executable: true, icon: '🐍' },
  { id: 'javascript', name: 'JavaScript', executable: true, icon: '🟨' },
  { id: 'typescript', name: 'TypeScript', executable: true, icon: '🔷' },
  { id: 'cpp', name: 'C++', executable: true, icon: '⚙️' },
  { id: 'java', name: 'Java', executable: true, icon: '☕' },
  { id: 'go', name: 'Go', executable: true, icon: '🐹' },
  { id: 'rust', name: 'Rust', executable: true, icon: '🦀' },
];
