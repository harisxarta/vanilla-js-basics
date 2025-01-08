var Scale = pc.createScript('scale');

// Initialize the script
Scale.prototype.initialize = function () {
    // Add event listener for mouse clicks on the 3D entities
    document.addEventListener("click", (event) => {
        event.preventDefault();

        let camera = this.app.root.findByName("Camera");
        if (!camera || !camera.camera) {
            console.error("Camera not found or is missing a camera component.");
            return;
        }

        // Get mouse position and perform raycast
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        let from = camera.camera.screenToWorld(mouseX, mouseY, camera.camera.nearClip);
        let to = camera.camera.screenToWorld(mouseX, mouseY, camera.camera.farClip);

        const result = this.app.systems.rigidbody.raycastFirst(from, to);
        if (result && result.entity) {
            this.selectedEntity = result.entity; // Set the clicked entity as selected
            console.log(`Entity selected: ${result.entity.name}`);
            this.updateEntityName(result.entity.name); // Update the HTML with the selected entity name
            this.toggleBoxVisibility(); // Show the box when an entity is selected

            // Retrieve and apply scale from localStorage
            this.applyStoredScale();

            // Update input fields with the current scale of the selected entity
            this.updateInputFields();
        } else {
            console.log("No entity selected.");
        }
    });

    // Add event listeners for scaling inputs
    this.addInputListeners();

    // Add event listener for toggling visibility using the eye icon (👁️)
    document.getElementById("toggleVisibility").addEventListener("click", () => {
        if (this.selectedEntity) {
            this.toggleVisibility(this.selectedEntity);
        } else {
            console.warn("No entity selected to hide/show.");
        }
    });

    // Add event listener for the Reset button
    document.getElementById("reset").addEventListener("click", () => {
        this.resetScale();
    });
};

// Update the HTML with the selected entity name
Scale.prototype.updateEntityName = function (name) {
    document.getElementById("boxes").textContent = `Selected: ${name}`;
};

// Toggle visibility of the HTML box
Scale.prototype.toggleBoxVisibility = function () {
    const boxElement = document.getElementById("box-name");
    if (this.selectedEntity) {
        boxElement.style.display = "block"; // Show the box
        console.log("Box is now visible");
    } else {
        boxElement.style.display = "none"; // Hide the box if no entity is selected
    }
};

// Add input listeners for scaling
Scale.prototype.addInputListeners = function () {
    const inputs = {
        x: document.getElementById("x"),
        y: document.getElementById("y"),
        z: document.getElementById("z")
    };

    if (!inputs.x || !inputs.y || !inputs.z) {
        console.error("One or more input elements are missing. Check your HTML.");
        return;
    }

    // Scale inputs will work as soon as an entity is selected
    inputs.x.addEventListener("input", (e) => {
        if (this.selectedEntity) {
            this.updateScale(parseFloat(e.target.value), null, null);
        } else {
            console.warn("No entity selected for scaling.");
        }
    });
    inputs.y.addEventListener("input", (e) => {
        if (this.selectedEntity) {
            this.updateScale(null, parseFloat(e.target.value), null);
        } else {
            console.warn("No entity selected for scaling.");
        }
    });
    inputs.z.addEventListener("input", (e) => {
        if (this.selectedEntity) {
            this.updateScale(null, null, parseFloat(e.target.value));
        } else {
            console.warn("No entity selected for scaling.");
        }
    });
};

// Update the scale of the selected entity
Scale.prototype.updateScale = function (x, y, z) {
    if (!this.selectedEntity) {
        console.warn("No entity selected. Click an entity first.");
        return;
    }

    let currentScale = this.selectedEntity.getLocalScale();

    // Only update non-null components
    x = x !== null ? x : currentScale.x;
    y = y !== null ? y : currentScale.y;
    z = z !== null ? z : currentScale.z;

    this.selectedEntity.setLocalScale(x, y, z);
    console.log(`Updated scale: x=${x}, y=${y}, z=${z}`);

    // Store the scale in localStorage for the selected entity
    const entityName = this.selectedEntity.name;
    const scaleData = { x, y, z };
    localStorage.setItem(`scale-${entityName}`, JSON.stringify(scaleData));
};

// Apply the stored scale value from localStorage when selecting a new entity
Scale.prototype.applyStoredScale = function () {
    if (!this.selectedEntity) return;

    const entityName = this.selectedEntity.name;
    const storedScale = localStorage.getItem(`scale-${entityName}`);

    if (storedScale) {
        const scaleData = JSON.parse(storedScale);
        this.selectedEntity.setLocalScale(scaleData.x, scaleData.y, scaleData.z);
        console.log(`Applied stored scale to ${entityName}: x=${scaleData.x}, y=${scaleData.y}, z=${scaleData.z}`);
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Reset the scale of the selected entity
Scale.prototype.resetScale = function () {
      
    const entityName = this.selectedEntity.name;

    localStorage.removeItem(`scale-${entityName}`);

    this.selectedEntity.setLocalScale(1, 1, 1); 
    this.updateInputFields();
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Update input fields with the current scale of the selected entity
Scale.prototype.updateInputFields = function () {
    if (!this.selectedEntity) return;

    const currentScale = this.selectedEntity.getLocalScale();
    document.getElementById("x").value = currentScale.x;
    document.getElementById("y").value = currentScale.y;
    document.getElementById("z").value = currentScale.z;
};

// Toggle the visibility of the selected entity
Scale.prototype.toggleVisibility = function (entity) {
    if (entity.enabled) {
        entity.enabled = false; // Hide the entity by disabling it
        console.log(`${entity.name} is now hidden.`);
    } else {
        entity.enabled = true; // Show the entity by enabling it
        console.log(`${entity.name} is now visible.`);
    }
};
