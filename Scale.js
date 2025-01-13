// var Script = pc.createScript('script');

// // Initialize Function
// Script.prototype.initialize = function () {
//     this.selectedObject = "Capsule"; // Default object
//     this.objectsData = JSON.parse(localStorage.getItem('clonedObjects')) || { Capsule: [], Cube: [], Sphere: [] };

//     this.clonedEntities = []; // Array to store references to cloned entities

//     // Load saved entities
//     this.loadClonedObjects();

//     // Get the toast element from HTML
//     this.createToast();

//     // Raycast to create clones
//     document.addEventListener("click", (event) => {
//         this.camera = this.app.root.findByName("Camera");
//         event.preventDefault();

//         let mouseX = event.clientX;
//         let mouseY = event.clientY;
//         let from = this.camera.camera.screenToWorld(mouseX, mouseY, this.camera.camera.nearClip);
//         let to = this.camera.camera.screenToWorld(mouseX, mouseY, this.camera.camera.farClip);
//         let result = this.app.systems.rigidbody.raycastFirst(from, to);

//         if (result) {
//             let sceneEntity = this.app.root.findByName(this.selectedObject);
//             let newEntity = sceneEntity.clone();
//             newEntity.enabled = true;
//             newEntity.setPosition(result.point.x, result.point.y, result.point.z);
//             this.app.root.addChild(newEntity);

//             // Store cloned entity reference in the array
//             this.clonedEntities.push(newEntity);

//             // Save position to localStorage
//             this.objectsData[this.selectedObject].push([result.point.x, result.point.y, result.point.z]);
//             localStorage.setItem('clonedObjects', JSON.stringify(this.objectsData));
//             this.hideToast();
//         }
//     });

//     // Set up event listeners for object selection
//     document.getElementById("capsuleButton").addEventListener("click", () => {
//         this.selectedObject = "Capsule";
//         this.showToast("Select Point on Plane to show Capsule");
//     });
//     document.getElementById("cubeButton").addEventListener("click", () => {
//         this.selectedObject = "Cube";
//         this.showToast("Select Point on Plane to show Cube");
//     });
//     document.getElementById("sphereButton").addEventListener("click", () => {
//         this.selectedObject = "Sphere";
//         this.showToast("Select Point on Plane to show Sphere");
//     });
 
//     document.getElementById("Clear").addEventListener("click", () => { 
//         localStorage.removeItem('clonedObjects');
         
//         this.clearClonedObjects();
         
//         this.showToast("Cloned objects cleared.");
//     });
// };

// Script.prototype.createToast = function () {
//     this.toast = document.getElementById("toastMessage");  
// };

// Script.prototype.showToast = function (message) {
//     this.toast.textContent = message;
//     this.toast.style.display = "block";
// };

// Script.prototype.hideToast = function () {
//     this.toast.style.display = "none";
// };

// // Load cloned entities
// Script.prototype.loadClonedObjects = function () {
//     for (let type in this.objectsData) {
//         this.objectsData[type].forEach(position => {
//             let sceneEntity = this.app.root.findByName(type);
//             let newEntity = sceneEntity.clone();
//             newEntity.enabled = true;
//             newEntity.setPosition(new pc.Vec3(position[0], position[1], position[2]));
//             this.app.root.addChild(newEntity);
//             this.clonedEntities.push(newEntity);
//         });
//     }
// };


// Script.prototype.clearClonedObjects = function () {
//     this.clonedEntities.forEach(entity => {
//         entity.destroy();
//     });
//     this.clonedEntities = [];
//     this.objectsData = { Capsule: [], Cube: [], Sphere: [] };
// };

 