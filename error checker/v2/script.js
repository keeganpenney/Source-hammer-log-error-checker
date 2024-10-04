// Error database mapping error patterns to explanations and solutions
const errorDatabase = [
    // General Errors
    {
        pattern: /The system cannot find the file specified/i,
        error: "The System Cannot Find the File Specified",
        explanation: "This error occurs when there is no .BSP file to copy at the end of the compile, or if the destination doesn't exist.",
        solution: "Check the VBSP output for errors, ensure your filename is correct and doesn't include invalid characters, and make sure the destination folder exists."
    },
    {
        pattern: /Error opening .*\.bsp/i,
        error: "Error Opening BSP File",
        explanation: "The compiler can't find the .BSP file for your map or it's corrupted.",
        solution: "Verify that VBSP created the .BSP file without errors and check the file path."
    },
    {
        pattern: /SteamStartup.*failed with error/i,
        error: "SteamStartup() Failed",
        explanation: "Steam encountered an error during startup.",
        solution: "Try recompiling your map or restarting Steam."
    },
    {
        pattern: /WARNING node with unbounded volume/i,
        error: "Node with Unbounded Volume",
        explanation: "Part of your map is touching or outside the Hammer grid.",
        solution: "Move your map away from the edges of the grid and check for invalid solids."
    },
    {
        pattern: /\*\*\*\* leaked \*\*\*\*/i,
        error: "Map Leak Detected",
        explanation: "Your map has a leak; the inside isn't properly sealed from the void.",
        solution: "Use the PointFile to locate and seal the leak, then recompile."
    },
    {
        pattern: /.*leaked.*/i,
        error: "Map Leak Detected",
        explanation: "Your map has a leak, which means there's a hole in the map's sealing.",
        solution: "Use the PointFile to locate the leak and seal it with brushes or skybox."
    },
    {
        pattern: /.*Too many t-junctions to fix up.*/i,
        error: "Too Many T-Junctions",
        explanation: "Your map has excessive geometry complexity.",
        solution: "Seal any leaks, reduce the number of func_detail and func_brush entities."
    },
    // Specific Errors from the provided list
    {
        pattern: /.*WARNING, microbrush/i,
        error: "Microbrush Detected",
        explanation: "A brush is too small to be compiled (usually smaller than 1 unit).",
        solution: "Find and delete the brush, then recreate it at a larger scale."
    },
    {
        pattern: /.*FloatPlane: bad normal/i,
        error: "FloatPlane: Bad Normal",
        explanation: "A brush has an unnecessary vertex on a flat plane.",
        solution: "Locate the brush and fix it using the Vertex Tool by merging unnecessary vertices."
    },
    {
        pattern: /Can't find surfaceprop for material.*using default/i,
        error: "Missing Surface Property",
        explanation: "A texture lacks a material surface property.",
        solution: "Replace 'model' textures on world brushes and ensure custom textures have a $surfaceprop value."
    },
    {
        pattern: /Error displacement found on a\(n\) .* entity - not supported/i,
        error: "Displacement on Entity Error",
        explanation: "A displacement is applied to a brush entity, which is unsupported.",
        solution: "Remove the displacement or convert the brush entity back to a world brush."
    },
    {
        pattern: /Error! To use model '.*' with static_prop, it must be compiled with \$staticprop!/i,
        error: "Static Prop Model Error",
        explanation: "A prop_static uses a model not compiled with $staticprop.",
        solution: "Use prop_physics or prop_dynamic_override instead."
    },
    {
        pattern: /Error loading studio model/i,
        error: "Error Loading Studio Model",
        explanation: "A prop model is missing or has an incorrect filename.",
        solution: "Ensure the model exists at the specified path and is correctly named."
    },
    {
        pattern: /Face List Count >= OVERLAY_BSP_FACE_COUNT/i,
        error: "Too Many Overlays on a Face",
        explanation: "A surface has too many overlays applied.",
        solution: "Reduce the number of overlays on the affected surface."
    },
    {
        pattern: /material ".*" not found/i,
        error: "Material Not Found",
        explanation: "A surface or overlay uses a missing or incorrect texture.",
        solution: "Replace the missing texture or correct the texture filename."
    },
    {
        pattern: /Memory leak.*mempool blocks left in memory:/i,
        error: "Memory Leak Detected",
        explanation: "A chronic error that doesn't affect your map.",
        solution: "This error can be safely ignored."
    },
    {
        pattern: /Bad planenum/i,
        error: "Bad Planenum",
        explanation: "The editor didn't save the file correctly.",
        solution: "Re-save your map and check for overlapping brushes."
    },
    {
        pattern: /Tried parent/i,
        error: "Node Without Parent",
        explanation: "A node in the compile has no parent node, possibly due to vertex errors.",
        solution: "Check for invalid brushes created by vertex manipulation and fix them."
    },
    {
        pattern: /.* with splits/i,
        error: "Brush Face Split Error",
        explanation: "A brush face has been improperly split.",
        solution: "Look for tiny brush penetrations and fix overlapping brushes."
    },
    {
        pattern: /Multiple references for cubemap on texture.*!!/i,
        error: "Multiple Cubemap References",
        explanation: "A face is assigned to more than one cubemap.",
        solution: "Find overlapping cubemaps and reassign the affected faces."
    },
    {
        pattern: /Material .* is depending on itself through materialvar \$bottommaterial!/i,
        error: "Material Self-Reference Error",
        explanation: "A material's $bottommaterial references itself.",
        solution: "Correct the $bottommaterial to reference a different material."
    },
    {
        pattern: /couldn't read.*\.prt/i,
        error: "Couldn't Read Portal File",
        explanation: "VVIS can't find the portal file created by VBSP.",
        solution: "Check for leaks or errors in VBSP and ensure the map name is valid."
    },
    {
        pattern: /Leaf \(portal \d+\) with too many portals/i,
        error: "Leaf with Too Many Portals",
        explanation: "An area has geometry that's too complex.",
        solution: "Simplify geometry and convert small structures to func_detail."
    },
    {
        pattern: /Texture axis perpendicular to face at \([0-9\-, ]+\)/i,
        error: "Texture Axis Perpendicular to Face",
        explanation: "A surface has incorrect texture alignment.",
        solution: "Find the surface and align the texture to 'World' in Hammer."
    },
    {
        pattern: /Too many light styles on a face \([0-9\-, ]+\)/i,
        error: "Too Many Light Styles on a Face",
        explanation: "A surface is lit by too many effect lights.",
        solution: "Reduce the number of effect lights or ensure lights share names."
    },
    {
        pattern: /\d+ degenerate faces/i,
        error: "Degenerate Faces Detected",
        explanation: "Faces have no or negative area, causing lighting issues.",
        solution: "Fix invalid brushes and check for issues with transparent textures."
    },
    {
        pattern: /warning - face vectors parallel to face normal\. bad lighting will be produced/i,
        error: "Face Vectors Parallel to Face Normal",
        explanation: "Misaligned textures causing bad lighting.",
        solution: "Align the affected face to 'World' or 'Face' and reapply texture settings."
    },
    // Additional Common Errors
    {
        pattern: /.*Attempting to compile a map that contains a func_instance with cordons enabled inside it.*/i,
        error: "Func_Instance with Cordons Error",
        explanation: "Compiling a map with func_instance entities that have cordons enabled can cause compilation errors.",
        solution: "Disable cordons on func_instance entities or remove them if not necessary."
    },
    {
        pattern: /.*Playerclip texture used on displacement brush.*/i,
        error: "Playerclip Texture on Displacement Brush",
        explanation: "Using a playerclip texture on a displacement brush can cause compiler issues.",
        solution: "Remove the playerclip texture from the displacement brush or replace it with a valid texture."
    },
    {
        pattern: /1 unit height displacement with power of 4 on different sides/i,
        error: "Invalid Displacement Settings",
        explanation: "A displacement brush has inconsistent height settings.",
        solution: "Ensure that displacement brushes have uniform height settings across all sides."
    },
    {
        pattern: /Env_cubemaps.*faces directly attached to more than one cubemap/i,
        error: "Env_Cubemaps Overlap",
        explanation: "env_cubemaps have overlapping faces which is not allowed.",
        solution: "Find overlapping cubemaps and reassign the affected faces to the correct cubemap."
    }
    // Add more error patterns here if needed
];

function checkErrors() {
    const logText = document.getElementById('log').value;
    const config = document.getElementById('config').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (!logText) {
        alert('Please paste your compile log.');
        return;
    }

    // Split log text into lines for easier processing
    const logLines = logText.split('\n');

    // Array to store errors with positions
    const foundErrors = [];

    // Iterate over each line to find errors and their positions
    logLines.forEach((line, index) => {
        errorDatabase.forEach(errorEntry => {
            if (errorEntry.pattern.test(line)) {
                foundErrors.push({
                    error: errorEntry.error,
                    explanation: errorEntry.explanation,
                    solution: errorEntry.solution,
                    logLine: line.trim(),
                    lineNumber: index + 1 // Line numbers start at 1
                });
            }
        });
    });

    if (foundErrors.length === 0) {
        resultsDiv.innerHTML = '<p>No errors were found in your compile log.</p>';
        return;
    }

    // Display errors with interactive features
    foundErrors.forEach((errorItem, idx) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.style.position = 'relative';

        const errorTitle = document.createElement('h3');
        errorTitle.textContent = `${errorItem.error} (Line ${errorItem.lineNumber})`;

        // Tooltip for displaying the error as it appears in the log
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = `Log Line ${errorItem.lineNumber}: ${errorItem.logLine}`;

        // Append tooltip to errorDiv
        errorDiv.appendChild(tooltip);

        // Show tooltip on hover
        errorDiv.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
        });
        errorDiv.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });

        // Click event to scroll to the error in the log
        errorTitle.addEventListener('click', () => {
            scrollToLogLine(errorItem.lineNumber);
            highlightLogLine(errorItem.lineNumber);
        });

        const explanationPara = document.createElement('p');
        explanationPara.innerHTML = `<strong>Explanation:</strong> ${errorItem.explanation}`;

        const solutionPara = document.createElement('p');
        solutionPara.innerHTML = `<strong>Solution:</strong> ${errorItem.solution}`;

        errorDiv.appendChild(errorTitle);
        errorDiv.appendChild(explanationPara);
        errorDiv.appendChild(solutionPara);

        resultsDiv.appendChild(errorDiv);
    });
}

// Function to scroll the log textarea to a specific line
function scrollToLogLine(lineNumber) {
    const logTextarea = document.getElementById('log');
    const lines = logTextarea.value.split('\n');
    let position = 0;

    for (let i = 0; i < lineNumber - 1; i++) {
        position += lines[i].length + 1; // +1 for the newline character
    }

    logTextarea.focus();
    logTextarea.setSelectionRange(position, position);
    // Calculate approximate scroll position
    const approximateScroll = (position / logTextarea.value.length) * logTextarea.scrollHeight;
    logTextarea.scrollTop = approximateScroll;
}

// Function to highlight a specific line in the log
function highlightLogLine(lineNumber) {
    const logTextarea = document.getElementById('log');
    const lines = logTextarea.value.split('\n');
    let positionStart = 0;

    for (let i = 0; i < lineNumber - 1; i++) {
        positionStart += lines[i].length + 1; // +1 for the newline character
    }

    const positionEnd = positionStart + lines[lineNumber - 1].length;

    logTextarea.focus();
    logTextarea.setSelectionRange(positionStart, positionEnd);
    // Optional: Change the selection color temporarily for better visibility
    // Note: Changing selection color via CSS is limited; consider using additional visual cues if needed
}

// Function to update line numbers
function updateLineNumbers() {
    const logTextarea = document.getElementById('log');
    const lineNumbersDiv = document.getElementById('lineNumbers');
    const lineCount = logTextarea.value.split('\n').length;
    let lineNumbers = '';
    for (let i = 1; i <= lineCount; i++) {
        lineNumbers += i + '\n';
    }
    lineNumbersDiv.textContent = lineNumbers;
}

// Function to synchronize scrolling between textarea and line numbers
function syncScroll() {
    const logTextarea = document.getElementById('log');
    const lineNumbersDiv = document.getElementById('lineNumbers');
    lineNumbersDiv.scrollTop = logTextarea.scrollTop;
}

// Function to clear the log and results
function clearAll() {
    document.getElementById('log').value = '';
    document.getElementById('results').innerHTML = '';
    updateLineNumbers();
}

// Function to download the error report as a text file
function downloadReport() {
    const resultsDiv = document.getElementById('results');
    const errors = resultsDiv.querySelectorAll('.error');
    if (errors.length === 0) {
        alert('No errors to download.');
        return;
    }

    let reportContent = 'HL2 Compile Error Report\n\n';
    errors.forEach(errorDiv => {
        const errorTitle = errorDiv.querySelector('h3').textContent;
        const explanation = errorDiv.querySelector('p:nth-of-type(1)').textContent;
        const solution = errorDiv.querySelector('p:nth-of-type(2)').textContent;
        reportContent += `${errorTitle}\n${explanation}\n${solution}\n\n`;
    });

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'error_report.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize line numbers on page load
window.onload = updateLineNumbers;
