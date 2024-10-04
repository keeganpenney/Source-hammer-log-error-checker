// Error database mapping error patterns to explanations and solutions
const errorDatabase = [
    // Existing errors from previous code
    {
        pattern: /.*leaked.*/i,
        error: "Map Leak Detected",
        explanation: "Your map has a leak, which means there's a hole in the map's sealing.",
        solution: "Use the PointFile to locate the leak and seal it with brushes or skybox."
    },
    {
        pattern: /Too many t-junctions to fix up!/i,
        error: "Too Many T-Junctions",
        explanation: "Your map has excessive geometry complexity.",
        solution: "Seal any leaks, reduce the number of func_detail and func_brush entities."
    },
    // Updated error patterns based on your provided list
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
    // You can add more errors here if needed
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

    // Adjust error patterns based on configuration if needed
    // For simplicity, this example does not modify patterns per config

    let errorsFound = false;

    errorDatabase.forEach(errorEntry => {
        if (errorEntry.pattern.test(logText)) {
            errorsFound = true;
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';

            const errorTitle = document.createElement('h3');
            errorTitle.textContent = errorEntry.error;

            const explanationPara = document.createElement('p');
            explanationPara.innerHTML = `<strong>Explanation:</strong> ${errorEntry.explanation}`;

            const solutionPara = document.createElement('p');
            solutionPara.innerHTML = `<strong>Solution:</strong> ${errorEntry.solution}`;

            errorDiv.appendChild(errorTitle);
            errorDiv.appendChild(explanationPara);
            errorDiv.appendChild(solutionPara);

            resultsDiv.appendChild(errorDiv);
        }
    });

    if (!errorsFound) {
        resultsDiv.innerHTML = '<p>No errors were found in your compile log.</p>';
    }
}
